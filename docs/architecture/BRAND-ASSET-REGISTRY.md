# Brand asset boundary

## Canonical status

```text
BRAND_ASSET_SOURCE=private external brand asset library; not tracked
LOCAL_WORKSPACE_PATH=not part of repository canon
SOURCE_MODE=REFERENCE_ONLY
ASSETS_COPIED_IN_ZP_01A=0
REAL_INTEGRATION_PHASE=ZP-02
```

No canonical brand asset, source document, font package, archive, or master file is tracked in this repository.

## Rules

- Do not copy the complete private brand library.
- Do not create a public originals directory.
- Do not publish source documents, archives, master files, or unreviewed fonts.
- Do not copy assets or fonts from the production landing.
- Do not infer authorization from local availability.
- Do not add an asset without approved provenance, rights, checksum, format, intended use, and accessibility review.

## Future integration

A future authorized phase may introduce only the derived web assets required by the product. That phase must:

1. confirm the canonical private source and authorization;
2. select only the required variants;
3. review asset and font rights;
4. export and optimize derivatives for the web;
5. record provenance, checksum, dimensions, format, and use;
6. test accessibility, performance, and visual behavior;
7. keep all source material outside the repository.

This boundary creates no runtime, build-time, or local-path dependency on the private library or the production landing.
