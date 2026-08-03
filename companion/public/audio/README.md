# EOS spatial ambient assets

This directory holds **optional** environmental loops for the Companion ambient engine.

Audio is **muted by default**. Nothing downloads until the visitor enables **Ambient**.

Do **not** invent, AI-generate, or scrape royalty-free substitutes.

---

## Required loops (P61)

Place these files here when ready. Then set `shipped: true` for each layer in:

`companion/modules/enhancement/audio/config.ts`

| File                     | Layer id     | Role                                          |
| ------------------------ | ------------ | --------------------------------------------- |
| `base-ambience.ogg`      | `base`       | Deep graphite room pressure / HVAC bed        |
| `low-air.ogg`            | `air`        | Soft air handling / near-silence airflow      |
| `mechanical-texture.ogg` | `mechanical` | Very distant machinery texture (non-rhythmic) |
| `distant-resonance.ogg`  | `resonance`  | Far room resonance / electrical ambience      |

Each layer is optional individually. At least **one** must be shipped before Ambient can enable.

---

## Format

- **Container:** Ogg Vorbis (`.ogg`) preferred; lossless WAV acceptable for masters.
- **Channels:** Mono or stereo (mono preferred for ambience).
- **Sample rate:** **48 kHz** (or 44.1 kHz if that is the only master).
- **Bit depth (master):** 24-bit WAV → encode Vorbis ~q5–q6.
- **Duration:** **60–180 s** seamless loop.
- **Loop:** Perfect loop points; no audible click or swell at the seam.
- **Content:** No melody, percussion, rhythm grid, voices, piano, strings, choir, drums, or synth lead. Air / pressure / distant machinery / museum HVAC only.

---

## Normalization

- **Integrated loudness:** approximately **−28 to −32 LUFS** (very quiet bed).
- **True peak:** ≤ **−3 dBTP**.
- Engine master volume targets ~**15–20%** perceived level after enable.

---

## Engine fade rules (already coded)

- **Entrance silence after enable:** **800 ms** before ambience rises.
- **Crossfade / mute / room weight change:** **4–6 s** (default **5000 ms**).
- **Reduced motion:** transitions are **instant** (0 ms).
- **Reduced data / Save-Data:** capability unavailable — no fetch.
- **No autoplay with sound.** Preference persists in `localStorage` (`eos-audio-preference`).

---

## Room weight intent (subtle)

| Room       | Character                    |
| ---------- | ---------------------------- |
| Arrival    | Slightly open                |
| Atlas      | Slightly denser              |
| Case study | Focused / quieter mechanical |
| Evidence   | Quiet                        |
| Journey    | Slightly wider               |
| Footer     | Almost silent                |

Weight deltas must remain nearly subconscious.

---

## Delivery status

All four loops are present in this folder and marked `shipped: true` in `config.ts`.

Source masters live under repo `assets/audio/`; runtime copies ship from `companion/public/audio/`.
