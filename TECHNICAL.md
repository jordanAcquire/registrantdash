# Pre-Event Registrant Dashboard — Technical Architecture

**For:** Jim Parkinson (CTIO), Jeff (Data Engineering)
**From:** Jordan Greve (AI & Automation)
**Date:** February 2026
**Status:** Proof of concept — collecting feedback before productization

---

## Overview

The dashboard is a single self-contained HTML file. No build step, no server, no dependencies. It runs entirely client-side by embedding prospect data as JavaScript arrays and rendering everything with vanilla JS + CSS.

This document explains the data model, scoring logic, and integration points for when we build the production version.

---

## Data Model

### Prospect Record

Each matched registrant is a JavaScript object with the following fields. Fields marked with ★ are the ones most relevant to Jeff for DataAxel mapping.

```
{
  id:            Number     — Unique identifier
  name:          String     — Full name
  householdId:   String     — Optional. Shared key linking household members (e.g., "hm1")
  age:           Number     — ★ Age
  title:         String     — Job title or "Retired [Former Role]"
  company:       String     — Employer (empty string for retirees)
  city:          String     — City
  married:       Boolean    — ★ Marital/partnership status
  children:      Number     — ★ Number of children in household
  homeowner:     Boolean    — ★ Homeowner flag
  donor:         Boolean    — ★ Charitable donor flag
  wealthTier:    Number     — ★ 1-4 scale (1 = Under $250K, 2 = $250K-$500K, 3 = $500K-$1M, 4 = $1M+)
  wealth:        String     — Display label for wealth tier
  incomeTier:    Number     — ★ 1-4 scale (1 = Under $50K, 2 = $50K-$100K, 3 = $100K-$200K, 4 = $200K+)
  income:        String     — Display label for income tier
  homeValue:     String     — ★ Home value range as string (e.g., "$500K – $600K")
  investorTier:  Number     — ★ 1-4 scale (1 = Not Yet, 2 = Open to Advice, 3 = Active, 4 = High-Conviction)
  investorType:  String     — Display label for investor tier
  matchScore:    Number     — Raw match confidence (currently unused in scoring — legacy field)
  persona:       String     — ★ Consumer lifestyle segment (e.g., "Crème de la Crème", "Actively Retired")
  occupation:    String     — ★ Occupation category (Retired, Professional, Management, Sales, Business Owner)
  interests:     Object     — ★ Lifestyle flags: { finance: Bool, golf: Bool, travel: Bool, wine: Bool }
  phone:         String     — Phone number
  email:         String     — Email address
  address:       String     — Street address
}
```

### Unmatched Record

Registrants that couldn't be matched to consumer data records:

```
{
  id:    Number
  name:  String
  city:  String    — Optional, may be empty
}
```

### DataAxel Field Mapping (For Jeff)

The fields we're using in the demo vs. what we believe exists in DataAxel/Perspectix:

| Dashboard Field | Source | DataAxel Field(s) | Confidence | Notes |
|----------------|--------|-------------------|------------|-------|
| age | DataAxel | Exact age or DOB | High | Should be reliable |
| married | DataAxel | Marital status | High | Jim suggests using "household" language over "married" |
| children | DataAxel | Presence of children | Medium | May be stale for older prospects |
| homeowner | DataAxel | Homeowner/renter flag | High | |
| donor | DataAxel | Charitable donor flag | High | Key signal for estate planning |
| wealthTier | DataAxel | Net worth range/code | High | We bucket into 4 tiers |
| incomeTier | DataAxel | Household income range | High | We bucket into 4 tiers |
| homeValue | DataAxel | Home value estimate | High | County assessor data |
| investorTier | DataAxel | Investment indicators | Medium | **Need Jeff's input** — what fields map here? |
| persona | DataAxel | Lifestyle cluster/segment | Medium | Which segmentation model does DataAxel use? |
| occupation | DataAxel | Occupation code | Medium | May need mapping from SIC/SOC codes |
| interests | DataAxel | Lifestyle/hobby flags | Low | **Need Jeff's input** — what's available? |
| advisor status | **Derived** | See below | N/A | Not a DataAxel field — we compute it |

**Key questions for Jeff:**

1. Is there a direct field for "has financial advisor" or "RIA relationship" or "brokerage account"? That would replace our derived logic entirely.
2. What investor behavior fields exist? We're currently guessing at 4 tiers based on generic investment activity flags.
3. What lifestyle/interest fields exist beyond the basics? The more behavioral signals we have, the better the conversation starters get.
4. What's the match key strategy? Currently LeadJig matches against mailing lists. Alex mentioned Perspectix direct matching would improve hit rates, especially for performance-based campaigns where we only have name + zip.

---

## Scoring Systems

### Prospect Score (0–99)

Composite quality ranking used to sort and surface top targets.

```
Weights (configurable):
  Net worth:      35%   — wealthTier × 25, scaled by weight
  Income:         25%   — incomeTier × 25, scaled by weight
  Investor type:  25%   — investorTier × 25, scaled by weight
  Home value:     15%   — derived from homeValue string (0–95 scale)

Home value scoring:
  $1M+     → 95
  $700K+   → 80
  $500K+   → 65
  $300K+   → 50
  $200K+   → 35
  < $200K  → 20

Final = raw weighted sum × 1.15 (boost), capped at 99
```

The weights live in a `const weights` object and can be adjusted. In the production version, these could be advisor-configurable or event-type-specific (estate planning weights wealth heavier, retirement planning weights age heavier, etc.).

### Advisor Status (Derived)

Estimates whether a prospect likely already has a financial advisor. **This is the field Jim and Jeff should focus on** — if DataAxel has a direct signal, we should use it instead of this heuristic.

```
Scoring (max ~93 points):

  Wealth tier:                    up to 35 pts
    $1M+       → 35
    $500K-$1M  → 22
    $250K-$500K → 10
    Under $250K → 3

  Investor type:                  up to 25 pts
    High-Conviction → 25
    Active          → 15
    Open to Advice  → 5
    Not Yet         → 0

  Age + wealth combo:             up to 15 pts
    Age 65+ AND wealth $500K+  → 15
    Age 55+ AND wealth $500K+  → 10
    Age < 45                   → -5

  Donor + wealth:                 up to 10 pts
    Donor AND wealth $500K+    → 10
    Donor only                 → 5

  Home value:                     up to 8 pts
    $700K+  → 8
    $500K+  → 4

Classification:
  >= 55 pts → "Likely Advised"     (gold badge)
  >= 30 pts → "Possibly Advised"   (blue badge)
  <  30 pts → "Likely Unadvised"   (teal badge)
```

**Rationale:** A 72-year-old retired attorney with $1M+ net worth who makes charitable donations almost certainly has an advisor already. A 48-year-old with $250K who isn't actively investing probably doesn't. The approach tip changes accordingly — "review their existing plan" vs. "education-first."

### Conversation Starters

Currently 16 starter templates, each with:
- A **test function** that checks prospect attributes
- A **weight** that ties to scoring categories
- A **priority** for ranking (1–10)
- A **label** template that interpolates the count
- A **tip** with tactical advisor guidance

The top 6 matching starters are displayed. They re-rank when segment filters are applied (starters matching the active filters get boosted).

In production, Jim mentioned an AI agent could generate these dynamically per-person. The current template system is a reasonable MVP but doesn't personalize beyond demographic matching.

---

## Household Pairing

Prospects in the same household share a `householdId` string (e.g., `"hm1"`, `"he2"`). The system:

1. **Counts households** — deduplicates by `householdId`, unlinked prospects count as 1 each
2. **Displays in hero stats** — "28 matched · 25 households · 10 unmatched"
3. **Shows on person cards** — "Also Attending (Same Household)" gold banner with clickable link to the partner's card

**Production consideration:** How do we detect households? Options:
- Same last name + same address → high confidence
- Same address, different last name → medium confidence (domestic partners, etc.)
- Same registration submission → explicit link
- Manual advisor override

---

## Dual-Mode Architecture

### Express Mode
Full drill-down access. All segments clickable, person cards accessible, tables show individual records. This is the paid product.

### Performance Mode
Aggregate-only view. Individual records are hidden behind `[data-mode="performance"]` CSS rules that set `display: none` or `pointer-events: none`. The data is still in the DOM (this is a demo) — production version should not send individual records to the client in Performance mode.

**Security note:** In the demo, switching to Performance mode is CSS-only. A motivated user could inspect the DOM and see individual data. The production version needs server-side gating.

---

## Multi-Date Toggle

The `swapEventData(date)` function:

1. Swaps the `prospects` pointer to the selected date's array
2. Swaps the `currentUnmatched` pointer
3. Recalculates all hero stats from scratch (total, wealth, score, drive time, top targets, households)
4. Updates all 32 segment count labels via DOM manipulation
5. Re-renders conversation starters, quick stats
6. Updates the data coverage banner
7. Re-triggers counter animations

Each date has its own independent dataset. No shared state between dates.

---

## File Structure

```
index.html          — Generic demo (Philly, retirement planning)
gwm_demo.html       — Client demo (Wilton Manors FL, estate planning)

Both files are structurally identical:
├── <style>
│   ├── CSS custom properties (:root variables)
│   ├── Dark theme (default) + light theme override
│   ├── Layout: banner, header, hero stats, segments grid, modals
│   ├── Date tab styles
│   └── Print styles
├── <body>
│   ├── Demo banner (mode toggle)
│   ├── Event header (title, date tabs, venue, firm)
│   ├── Hero stats (5 cards)
│   ├── Quick stats bar (7 items)
│   ├── Conversation starters (6 slots)
│   ├── Segment cards (8 cards, 2 rows of 4)
│   ├── Data coverage banner
│   ├── Footer
│   └── Modal overlay
└── <script>
    ├── Data arrays (morning/evening prospects + unmatched)
    ├── Configuration (weights, persona descriptions, hero/QS metadata)
    ├── Core functions
    │   ├── swapEventData()      — Date toggle + full recalculation
    │   ├── advisorLikelihood()  — Derived advisor status
    │   ├── countHouseholds()    — Household deduplication
    │   ├── calculateScore()     — Composite prospect score
    │   ├── renderStarters()     — Conversation starter generation
    │   ├── renderQuickStats()   — Demographic snapshot bar
    │   └── updateSegmentCounts() — Segment count recalculation
    ├── Interaction functions
    │   ├── segClick()           — Segment filter toggle
    │   ├── openModal()          — Modal with sortable table
    │   ├── openPersonModal()    — Individual prospect card
    │   ├── heroClick() / qsClick() — Hero/QS card click handlers
    │   └── openFilteredModal()  — Cross-filter results
    └── UI functions
        ├── animateCounters()    — Number roll-up animation
        ├── generateTable()      — Sortable table renderer
        ├── printPersonCard()    — Print-friendly prospect card
        └── setMode()            — Express/Performance toggle
```

---

## Production Considerations

### What stays
- Single-page architecture (fast, no dependencies)
- Segment cross-filtering with dimming
- Advisor status as a derived field (unless DataAxel has something better)
- Household pairing
- Conversation starters
- Print cards

### What changes
- **Data source:** Replace hardcoded arrays with API calls to LeadJig/Perspectix
- **Performance mode:** Server-side gating, not CSS-only
- **Authentication:** Tied to advisor's LeadJig account, not a public URL
- **Delivery:** Email/SMS notification 24–48 hours before event → link to dashboard
- **Mobile:** Jim wants a phone app version — the CSS grid layout is responsive but a native wrapper would improve the experience
- **Conversation starters:** Consider AI agent (Jim's suggestion) for per-person dynamic generation vs. current template system
- **Privacy:** LLM selection for any AI features needs to account for PII handling (Jim flagged this)

### Timeline reference (from Feb 18 meeting)
- **Q2 2026** target for web version (~1 month build)
- **+1 month** for Android/iOS wrapper
- Word "plan" used intentionally as caveat

---

## Data Completeness Handling

In the demo, every matched prospect has every field populated. In production, this won't be the case — some registrants will match with full DataAxel profiles, some will have partial data, and some won't match at all.

### Rules for aggregation

When calculating aggregate stats (hero cards, quick stats, segment counts), the dashboard should only include registrants who have the relevant data field. If fewer than 30% of matched registrants have a given field, the stat should either be hidden or shown with a clear disclaimer (e.g., "Based on 8 of 52 matched records").

| Scenario | Handling |
|----------|----------|
| 70%+ have the field | Show the aggregate normally |
| 30–70% have the field | Show with footnote: "Based on X of Y matched records" |
| < 30% have the field | Hide the stat or gray it out with "Insufficient data" |

### Per-registrant cards

Person cards should display only the fields that exist for that individual. Empty fields should be omitted entirely rather than showing "Unknown" or "N/A" — a shorter card with real data is better than a full card with filler.

### Conversation starters

Starters that reference a data field should only count registrants who actually have that field. For example, "11 homeowners with $500K+ home values" should not count registrants where home value is null — even if they are homeowners. The threshold for surfacing a starter should be a minimum of 3 qualifying registrants.

### Advisor Status (derived field)

Since advisor status is computed from multiple inputs, it degrades gracefully when data is partial. If a prospect only has wealth tier and age (no investor type, no donor flag, no home value), the score still produces a reasonable classification — just with less confidence. In production, we may want to add a confidence indicator (e.g., "Likely Advised — based on 3 of 5 signals") so the advisor knows how much to trust it.

---

1. Can we get a direct "has financial advisor" or "brokerage account" signal from DataAxel?
2. What investor behavior fields exist in the Perspectix/DataAxel dataset?
3. What lifestyle and interest flags are available beyond basic demographics?
4. What's the realistic match rate if we query Perspectix directly (vs. mailing list matching)?
5. For performance-based campaigns (name + zip only), what's the best we can achieve?
6. Are there fields for trust ownership, estate plan indicators, or fiduciary relationship flags?

---

*This document accompanies the dashboard source files. For a feature-level overview, see README.md.*
