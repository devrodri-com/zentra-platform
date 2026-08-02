# Brand asset registry

## Canonical status

```text
BRAND_ASSET_SOURCE=approved external brand library; canonical masters not tracked
LOCAL_WORKSPACE_PATH=not part of repository canon
SOURCE_MODE=AUTHORIZED_WEB_DERIVATIVES_ONLY
ASSETS_COPIED_IN_ZP_01A=0
ASSETS_INTEGRATED_IN_ZP_02A=6
REAL_INTEGRATION_PHASE=ZP-02A
```

ZP-02A authorizes only the six web-ready PNG exports registered below. They
were transferred from an approved read-only web export set and verified for
exact byte identity before use. Canonical masters, source documents, archives,
font packages, and private-library filenames remain outside this repository.

This authorization grants use in the ZENTRA public shell. It does not create a
runtime or build-time dependency on any external repository and does not imply
broader reproduction, redistribution, sublicensing, or commercial rights.

## Approved web assets

| Repository asset                        | Approved source file       | Format | Dimensions | SHA-256                                                            | Intended use and accessibility                                                                                                     |
| --------------------------------------- | -------------------------- | ------ | ---------: | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `public/brand/zentra-isotipo-black.png` | `zentra-isotipo-black.png` | PNG    |  1086×1938 | `bc96623e35d86a3563a3260cdb999c46b1ff137c0bfbc49454e187bd27feecb7` | Compact or ambient brand mark; decorative instances use empty alternative text.                                                    |
| `public/brand/zentra-isotipo-gold.png`  | `zentra-isotipo-gold.png`  | PNG    |  1086×1939 | `9ccb8d8181fc2a6bf7eb74669929cf452f71abe70f827ccccea33611399434d8` | Compact or ambient brand mark and approved icon source; decorative instances use empty alternative text.                           |
| `public/brand/zentra-isotipo-white.png` | `zentra-isotipo-white.png` | PNG    |  1086×1938 | `c2db9ca4565be7a4c3abf68dd06c1697642e66f088a9ec771bd5d6e04321e5b4` | Compact or ambient brand mark; decorative instances use empty alternative text.                                                    |
| `public/brand/zentra-logo-black.png`    | `zentra-logo-black.png`    | PNG    |  2810×1842 | `2dc7aea3c5ab7f0dd552d2741ceeb847c906f7b78345655378685767c2969827` | Horizontal brand identification on light surfaces; meaningful instances identify ZENTRA in alternative text.                       |
| `public/brand/zentra-logo-gold.png`     | `zentra-logo-gold.png`     | PNG    |  2810×1841 | `b7fd1fbd6d691a66e65e4c57cb7bffae015e7cb4b90d9af79e48971433eb4d55` | Horizontal brand identification where the gold treatment is appropriate; meaningful instances identify ZENTRA in alternative text. |
| `public/brand/zentra-logo-white.png`    | `zentra-logo-white.png`    | PNG    |  2810×1841 | `ae2b551658da7cb1f591fa7f5ffa6f60d6005ada66d12c2e17120a4828ce1a3e` | Horizontal brand identification on dark surfaces; meaningful instances identify ZENTRA in alternative text.                        |

All six repository hashes match their approved source hashes in full. The
files remain unmodified: no crop, stretch, recoloring, or visual filter was
applied during transfer.

## Generated application icons

Both icons derive from `public/brand/zentra-isotipo-gold.png`, whose source
SHA-256 is
`9ccb8d8181fc2a6bf7eb74669929cf452f71abe70f827ccccea33611399434d8`.
The mark is proportionally resized, its visible footprint is centered, and it
is composited without recoloring onto an opaque `#1d1d1b` background.

| Output                   | Dimensions | Mark raster height | SHA-256                                                            | Verification result                                                                  |
| ------------------------ | ---------: | -----------------: | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `src/app/icon.png`       |    512×512 |             410 px | `6beca07a87caa9c12f69bc8967a80a659d272429ee25b41e5d4ed86d492c3112` | PNG, opaque, complete mark, centered, no clipping or stretching, sufficient padding. |
| `src/app/apple-icon.png` |    180×180 |             144 px | `70b873d61a7b5324ad99ab13944430ddd8146a961b3f1d2ce8b1b028cdf88cf8` | PNG, opaque, complete mark, centered, no clipping or stretching, sufficient padding. |

The following repository-relative command is the reproducible generation
procedure. The recorded outputs were produced with FFmpeg 8.1.1, one encoder
thread, Lanczos proportional resampling, and PNG compression level 9.

```bash
render_icon() {
  canvas_size="$1"
  mark_height="$2"
  x_adjust="$3"
  y_adjust="$4"
  output_file="$5"

  ffmpeg -hide_banner -loglevel error -y \
    -f lavfi \
    -i "color=c=black:s=${canvas_size}x${canvas_size}:d=1,format=rgb24,lutrgb=r=29:g=29:b=27" \
    -i public/brand/zentra-isotipo-gold.png \
    -filter_complex "[1:v]scale=w=-1:h=${mark_height}:flags=lanczos[mark];[0:v][mark]overlay=x=(W-w)/2${x_adjust}:y=(H-h)/2${y_adjust}:format=rgb,format=rgb24[out]" \
    -map '[out]' \
    -frames:v 1 \
    -threads 1 \
    -compression_level 9 \
    "$output_file"
}

render_icon 512 410 -12 -1 src/app/icon.png
render_icon 180 144 -4 +0 src/app/apple-icon.png
```

Repeated generation produced byte-identical files and the hashes registered
above. Pixel inspection confirmed an RGB corner value of `(29, 29, 27)` for
both outputs, exactly matching `#1d1d1b`. Visual inspection confirmed that the
full isotipo remains centered, undistorted, uncropped, and surrounded by safe
padding at both sizes. The visible non-background bounds are `x=163..348,
y=78..433` at 512 px and `x=56..122, y=27..152` at 180 px, confirming balanced
opposite margins.

## Continuing boundary

- Do not copy the complete private brand library.
- Do not create a public originals directory.
- Do not publish source documents, archives, master files, or unreviewed fonts.
- Do not add further brand assets without explicit authorization and registry
  coverage for provenance, rights, checksum, format, intended use, and
  accessibility.
- Do not recolor, crop, stretch, filter, or recreate the registered logo assets.
- Keep canonical masters and all external locations outside repository canon.
- Do not read brand assets at runtime or build time from an external location.
