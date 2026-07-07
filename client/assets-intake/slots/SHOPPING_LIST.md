# Media Shopping List — Sina's Roofing & Repair

v2 (2026-07-07): supersedes the original before/after-pairs + static-hero
plan below. The operator supplied real photos/video directly instead of
filling those slots — this list now reflects what was actually
delivered, all operator-provided (model=operator, credits=0, no
generation involved). See state/DECISIONS.md for the full reasoning.

---

## hero-intro.mp4        [x] filled
folder: Home - Hero/
treatment: intro-loop - real footage, wide shot (was hero1.mp4, 1916x1080)
Primary clip in the alternating two-clip hero (site/shared/main.js custom
player, see state/DECISIONS.md). Poster = first frame (LCP candidate).
PROMPT -> N/A (operator-provided real footage)

## hero-loop.mp4        [x] filled
folder: Home - Hero/
treatment: loop - real footage, squarer shot (was hero2.mp4, 1660x1244)
Secondary clip in the alternating rotation, object-fit:cover crops to
the hero band.
PROMPT -> N/A (operator-provided real footage)

## gallery1.webp        [x] filled
folder: Gallery - Portfolio/
treatment: image - finished shingle roof, low angle
General work-portfolio shot (operator: "forget before/after, just make a
gallery of work done" - no pairing).
PROMPT -> N/A (operator-provided real photo)

## gallery2.webp        [x] filled
folder: Gallery - Portfolio/
treatment: image - mid-installation, nail gun/underlayment
PROMPT -> N/A (operator-provided real photo)

## gallery3.webp        [x] filled
folder: Gallery - Portfolio/
treatment: image - branded company truck
PROMPT -> N/A (operator-provided real photo)

## gallery4.webp        [x] filled
folder: Gallery - Portfolio/
treatment: image - house exterior, truck in driveway
PROMPT -> N/A (operator-provided real photo)

## gallery5.webp        [x] filled
folder: Gallery - Portfolio/
treatment: image - crew on rooftop
PROMPT -> N/A (operator-provided real photo)

## gallery6.webp        [x] filled
folder: Gallery - Portfolio/
treatment: image - soffit/fascia before+after composite
PROMPT -> N/A (operator-provided real photo)

## logo.png        [x] filled
folder: (slots root)
treatment: alpha-or-image - real logo, RGBA 1254x1254, has transparency
Passthrough per image-optimization rule 1a - never flattened.
PROMPT -> N/A (operator-provided real asset)
