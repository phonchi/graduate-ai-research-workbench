# Guarded failure record

This fixture records failures that must stop before `index.json` or any source is changed.

| Scenario | Expected result | Evidence |
|---|---|---|
| A manifest source hash does not match its bytes | Reject with `Source hash mismatch` before writing; keep the previous index and all sources unchanged | `document-cache-reproducibility.test.ts` calls `buildEntries` with a deliberately invalid hash and compares the bytes afterward |
| A source path escapes the corpus | Reject with `outside the corpus` before reading the target | The focused test calls `resolveSourcePath('../outside.md')` |
| A caller supplies an alternate output argument | Print `Usage: node build-index.mjs`, exit non-zero, and leave `index.json` unchanged | The focused test runs `node build-index.mjs ../outside.json` |
| Replacement is interrupted after the temp file is written | Keep the previous `index.json` byte-for-byte and remove the unique temp file | The focused test throws immediately before rename inside a copied corpus sandbox |

These are synthetic safety checks, not records from a real research participant or manuscript.
