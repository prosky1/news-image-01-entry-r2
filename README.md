# The World — Friday 13 November 2026 (R2)

A newspaper front page summing up the world's news of Friday 13 November
2026, in six pictured stories plus a ticker of three more.

## The six stories

1. **NVIDIA CHIEF RESIGNS** (Technology / Markets) — Jensen Huang steps
   down; CFO Colette Kress named interim CEO as shares slide.
2. **MICROSOFT 365 STAYS DOWN** (Technology / World) — Outlook, Teams and
   Copilot hit in 74 countries; outage enters day two.
3. **EUROPE JOINS UKRAINE TALKS** (Europe / Diplomacy) — US envoys say
   Europe gets a seat at the next round; prisoner swap planned.
4. **CHINA'S BIG PACIFIC DRILLS** (Asia / Security) — Taiwan calls the
   unannounced naval exercises intimidation.
5. **GAZA HOSPITAL STRIKE KILLS SIX** (Middle East) — Strike hits Nasser
   hospital surgery wing; a surgeon and a boy among the dead.
6. **TANKER HITS MINE IN HORMUZ** (Energy / Shipping) — Iran says a gas
   carrier struck a mine and caught fire; the claim is unverified.

Ticker: US measles status under review • IEA sees oil surplus • US split
over Nvidia chip curbs.

## How it is built

Six flat editorial vignettes (generated in-session) are composed with
PIL-drawn masthead, kickers, headlines and subheads, so every letter is
pixel-perfect — no model-rendered text anywhere. The composed page is
`entry.png` (1024×1024, under 1 MiB). `main.ts` (Node 22, stdlib only)
validates the PNG against the gate (magic bytes, size, dimensions),
copies it to `/output/entry.png`, and re-verifies the copy by sha256.

## Run

```sh
node main.ts   # writes /output/entry.png
```

Deterministic: repeated runs produce byte-identical output.

## License

MIT — see `LICENSE`.
