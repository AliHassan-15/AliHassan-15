import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";
export const dynamic = "force-static";

/**
 * Minimal production mark — monochrome, not marketing art.
 */
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#060605",
        color: "#e8e7e4",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.04em",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
      }}
    >
      EOS
    </div>,
    { ...size },
  );
}
