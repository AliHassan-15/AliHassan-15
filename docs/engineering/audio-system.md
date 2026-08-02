# Audio System (Construction)

**Status:** Construction document (M11)  
**Authority:** Engineering implementation — not Product Bible  
**Applies:** Documents 00 (Audio Constitution), 33 (Audio System Constitution), 02 / 10 / 12 (silence & sound quality — apply only), 27, 28  
**Surface:** `modules/enhancement/audio`

---

## Justification (Document 33 §17)

| Question | Answer |
|----------|--------|
| Deepens atmosphere without distraction? | Only when visitor opts in; extremely low ambient loop |
| Silence clearer? | Yes by default — mute is the product |
| Removable? | Yes — delete module; Companion remains complete |
| Mute default + opt-in + mute available? | Preference `off` default; `Sound · On/Off` toggle |
| Refuses informing / entertaining / branding? | Ambient path only; no UI SFX, narration, or player |
| Deferred still Deferred? | AU-01–AU-10 inventories remain Deferred |

---

## Ownership

| Path | Owns |
|------|------|
| `modules/enhancement/audio/` | Capability, preference, ambient engine, Sound toggle |
| `config.ts` / `AMBIENT_TRACK` | Replaceable track registry (`src` swap without app rewires) |
| `public/audio/` | Future ambient asset slot (`ambient.ogg` placeholder path) |
| Pages / content | No audio ownership — never required for meaning |

---

## Behaviour

1. Silence default — no network, no `Audio` element, no timers while `off`.
2. Opt-in (`Sound · On`) → settle delay → `play()` → gentle fade-in → seamless loop.
3. Opt-out → fade-out → dispose element and release resources.
4. Hidden tab → pause; visible again → resume only if still `on`.
5. Autoplay / missing asset / decode failure → fail silently; experience uninterrupted.

---

## Fail-closed capability

Unavailable when:

- `prefers-reduced-data: reduce`
- `navigator.connection.saveData`
- `Audio` constructor missing
- Server render

Toggle remains honest (`Sound unavailable` when gated).

---

## Construction provisional values (not Product Bible locks)

`settleDelayMs`, `fadeMs`, and `targetVolume` live in `AMBIENT_TRACK` as construction provisories under AU-10. Replace the file at `/audio/ambient.ogg` without changing architecture.

---

## Refused

Soundtrack character, click/hover/typing SFX, startup chime, narration, music player UI, waveforms, equalizer animation, audio-only styling dependencies.

---

## Deferred (still Deferred)

AU-01–AU-10 — exact inventories, codecs, production recipes, and constitutional volume locks remain Deferred.
