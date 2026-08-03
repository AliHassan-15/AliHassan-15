"""
EOS P55 — portrait asset processing.

Reads companion/portrait/raw/ only.
Writes companion/portrait/processed/ and companion/portrait/exports/.
Also copies web exports to companion/public/identity/.
Never overwrites raw originals.
"""

from __future__ import annotations

import shutil
from pathlib import Path

from PIL import Image, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "portrait" / "raw"
PROCESSED = ROOT / "portrait" / "processed"
EXPORTS = ROOT / "portrait" / "exports"
PUBLIC = ROOT / "public" / "identity"


def ensure_dirs() -> None:
    for path in (PROCESSED, EXPORTS, PUBLIC):
        path.mkdir(parents=True, exist_ok=True)


def save_png(image: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, format="PNG", optimize=True)


def process_primary() -> None:
    """Head/shoulder specimen crop — reduces shirt graphic dominance."""
    src = Image.open(RAW / "primary-portrait.png").convert("RGBA")
    w, h = src.size
    # Crop upper ~68% height, slight horizontal inset for specimen framing
    top = int(h * 0.02)
    bottom = int(h * 0.68)
    left = int(w * 0.06)
    right = int(w * 0.98)
    crop = src.crop((left, top, right, bottom))
    save_png(crop, PROCESSED / "primary-specimen.png")

    # Full cutout retained for archive
    save_png(src, PROCESSED / "primary-full.png")

    # Web export — specimen at native resolution (source is 1024 longest edge)
    save_png(crop, EXPORTS / "portrait-primary.png")
    shutil.copy2(EXPORTS / "portrait-primary.png", PUBLIC / "portrait-primary.png")

    # Compact export for mobile editorial plate
    mobile = crop.copy()
    mobile.thumbnail((720, 1080), Image.Resampling.LANCZOS)
    save_png(mobile, EXPORTS / "portrait-primary-md.png")
    shutil.copy2(EXPORTS / "portrait-primary-md.png", PUBLIC / "portrait-primary-md.png")


def white_to_alpha(src: Image.Image, threshold: int = 238) -> Image.Image:
    """Convert near-white studio backdrop to transparency."""
    rgba = src.convert("RGBA")
    pixels = rgba.load()
    w, h = rgba.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if r >= threshold and g >= threshold and b >= threshold:
                pixels[x, y] = (r, g, b, 0)
            elif r >= threshold - 18 and g >= threshold - 18 and b >= threshold - 18:
                # Soft edge
                softness = max(r, g, b)
                alpha = max(0, min(255, int((threshold + 10 - softness) * 12)))
                pixels[x, y] = (r, g, b, alpha)
    return rgba


def process_secondaries() -> None:
    for name, out in (
        ("left-secondary.png", "portrait-left.png"),
        ("right-secondary.png", "portrait-right.png"),
    ):
        src = Image.open(RAW / name)
        cut = white_to_alpha(src)
        # Specimen crop similar to primary
        w, h = cut.size
        crop = cut.crop((int(w * 0.06), int(h * 0.02), int(w * 0.98), int(h * 0.68)))
        save_png(crop, PROCESSED / out)
        save_png(crop, EXPORTS / out)
        shutil.copy2(EXPORTS / out, PUBLIC / out)


def process_signature() -> None:
    """White/light strokes on transparent → dark ink mask for theme-adaptive CSS."""
    src = Image.open(RAW / "signature.png").convert("RGBA")
    pixels = src.load()
    w, h = src.size
    out = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    out_px = out.load()
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if a < 12:
                continue
            # Treat bright strokes as ink density
            luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255.0
            density = min(1.0, max(0.0, (luminance * (a / 255.0)) * 1.15))
            ink_alpha = int(255 * density)
            if ink_alpha < 8:
                continue
            out_px[x, y] = (18, 18, 17, ink_alpha)

    bbox = out.split()[-1].getbbox()
    if bbox:
        pad = 24
        x0 = max(0, bbox[0] - pad)
        y0 = max(0, bbox[1] - pad)
        x1 = min(w, bbox[2] + pad)
        y1 = min(h, bbox[3] + pad)
        out = out.crop((x0, y0, x1, y1))

    save_png(out, PROCESSED / "signature-ink.png")
    # Web size
    web = out.copy()
    web.thumbnail((640, 240), Image.Resampling.LANCZOS)
    save_png(web, EXPORTS / "signature.png")
    shutil.copy2(EXPORTS / "signature.png", PUBLIC / "signature.png")


def process_grain() -> None:
    grain = Image.open(RAW / "grain.png").convert("RGB")
    # Mild desaturation / normalize for overlay use
    gray = ImageOps.grayscale(grain)
    soft = gray.filter(ImageFilter.GaussianBlur(radius=0.4))
    rgb = Image.merge("RGB", (soft, soft, soft))
    save_png(rgb, PROCESSED / "grain.png")
    save_png(rgb, EXPORTS / "grain.png")
    shutil.copy2(EXPORTS / "grain.png", PUBLIC / "grain.png")
    shutil.copy2(RAW / "grain.svg", EXPORTS / "grain.svg")
    shutil.copy2(RAW / "grain.svg", PUBLIC / "grain.svg")


def main() -> None:
    ensure_dirs()
    process_primary()
    process_secondaries()
    process_signature()
    process_grain()
    print("P55 portrait processing complete.")
    for path in sorted(PUBLIC.iterdir()):
        print(f"  public/identity/{path.name} ({path.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
