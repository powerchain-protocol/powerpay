# Program Manifest

`programs/manifest/programs.json` is the compatibility source for generated clients. Production program IDs are never inferred or fabricated.

A program is usable only when its manifest entry is `ACTIVE`, has a real program ID, satisfies the minimum semantic version and advertises the required feature. Devnet/mainnet deployment JSON files must match generated clients and IDLs before release.
