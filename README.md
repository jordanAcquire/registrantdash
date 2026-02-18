# Pre-Event Registrant Dashboard v5

Interactive intelligence briefing for financial advisors preparing for educational seminars. Combines registration data with consumer insights to help advisors understand who's in the room before they walk in.

![Dashboard Preview](https://img.shields.io/badge/status-internal_demo-blue) ![Version](https://img.shields.io/badge/version-5.1-green)

---

## What It Does

Advisors run dinner seminars and workshops to meet prospective clients. This dashboard takes the registration list, matches it against consumer data records, and surfaces actionable insights — who to talk to first, what to say, and how the room breaks down demographically.

**Two dashboard files:**

- **index.html** — Generic V5 demo (Philadelphia, retirement planning)
- **gwm_demo.html** — Client-specific demo for Global Wealth Management (Wilton Manors FL, estate planning)

**Two modes serve two products:**

- **Express** — Full drill-down access. Click any number, segment, or person to explore. Designed for advisors who've purchased the complete pre-event package.
- **Performance** — Aggregate-only view. See room composition and conversation starters without individual records. Designed to demonstrate value and drive upgrades.

## GWM Client Demo

The `gwm_demo.html` file is a tailored demo for a live client presentation. It features:

- **Event:** Estate Planning Workshop
- **Venue:** The Pride Center at Equality Park, 2040 N Dixie Hwy, Wilton Manors FL 33305
- **Firm:** Global Wealth Management Investment Advisory, Inc
- **Dates:** Wed Feb 18 (11:00 AM – 12:00 PM) and Mon Feb 23 (6:00 PM – 7:00 PM)
- **Data:** Morning event — 28 matched + 10 unmatched (38 total). Evening event — 24 matched + 8 unmatched (32 total).
- **Geography:** Wilton Manors, Fort Lauderdale, Oakland Park, Pompano Beach, Lighthouse Point, Coral Springs, Dania Beach

### Multi-Date Toggle

Date tabs sit below the event title. Clicking a date swaps the entire dataset and recalculates all stats, segments, starters, and quick stats in real time. Hero stat counters re-animate on each swap.

| Stat | Morning | Evening |
|------|---------|---------|
| Total Registrants | 38 | 32 |
| Households | 25 | 20 |
| Est. Wealth | ~$16.3M | ~$11.8M |
| Avg Match Score | ~8.4 | ~7.6 |
| Avg Drive Time | 14 min / 12 mi | 18 min / 15 mi |
| Top Targets | 13 | 9 |

### Advisor Status (New in v5.1)

Derived "Likely Advised" indicator estimates whether a prospect already has a financial advisor, based on:

- Wealth tier (strongest signal)
- Investor type and engagement level
- Age + wealth combination
- Donor status (indicates financial sophistication)
- Home value as a proxy for financial complexity

Three tiers: **Likely Advised** (gold), **Possibly Advised** (blue), **Likely Unadvised** (teal). Each tier includes a tactical approach tip — "Lead with plan review, not discovery" vs. "Education-first approach recommended."

Integrated as: segment filter card, person card badge, sortable table column, and a conversation starter ("X prospects likely without an advisor").

### Household Pairing (New in v5.1)

Registered couples are linked by `householdId`. The dashboard:

- Shows household count in hero stat subtitles ("28 matched · 25 households · 10 unmatched")
- Displays a gold "👫 Also Attending (Same Household)" banner on person cards when a spouse is registered, with a clickable link to the partner's card

Demo couples:
- Robert & Maria Delgado (morning)
- Thomas & Janet Beaumont (morning)
- Daniel & Suzanne Pratt (morning)
- Michael & Elena Santana (evening)
- Gregory & Judith Desmond (evening)

## Features

### Hero Stats
Five at-a-glance cards: total registrants (with household count), estimated wealth in room, average match score, average drive time, and top targets. All recalculate and re-animate on date toggle.

### Quick Stats Bar
Demographic snapshot below the hero: average age, % married, % with children, % homeowners, donor count, active investor count, and high-net-worth count.

### Conversation Starters
Six AI-ranked talking points combining demographic, financial, and behavioral signals. Each starter lists the people in the group (up to 3 names) plus a tactical advisor tip. Clicking a starter opens a results table with the tip pinned as a gold banner. Estate planning language throughout (trusts, beneficiary planning, wealth transfer, asset protection).

### Registrant Segments
Eight filterable segment cards ranked by advisor utility:

| Row 1 (Highest Priority) | Row 2 |
|---------------------------|-------|
| Est. Net Worth | Age Range |
| Advisor Status | Occupation |
| Investor Type | Household Income |
| Home Value | Lifestyle Interests |

**Cross-filtering:** Click multiple segments to combine filters. Incompatible segments dim automatically. Hit "See Results" to view the overlap in a sortable table.

### Person Cards (Express only)
Full profile modal for each matched registrant:
- Conversation starter narrative
- Also Attending household banner (if spouse registered)
- Contact info (phone, email, full street address)
- About section (age, marital status, children, homeowner)
- Wealth & income tiers with consumer persona
- Property details with home value range
- Prospect score and advisor status badge with approach tip
- Behavioral insights (charitable donor)
- Lifestyle interest tags
- **Similar Profiles** navigation
- **Print Card** button

### Sortable Tables
All result tables support column sorting including the new Advisor Status column. Sorts by underlying tier values for financial columns.

### Unmatched Registrants
The "All Registrants" modal shows matched records followed by unmatched registrants as greyed-out rows.

## Architecture

Single self-contained HTML file per demo. No build step, no dependencies, no server required.

```
gwm_demo.html
├── <style>        — All CSS including theme variables, date tabs, responsive grid, modals
├── <body>         — Static layout shell + segment cards
└── <script>
    ├── morningProspects[]   — 28 records with householdId links
    ├── eveningProspects[]   — 24 records with householdId links
    ├── morningUnmatched[]   — 10 name-only records
    ├── eveningUnmatched[]   — 8 name-only records
    ├── setEventDate()       — Toggle handler, swaps dataset + recalculates everything
    ├── advisorLikelihood()  — Derived advisor status from demographic signals
    ├── countHouseholds()    — Deduplicates by householdId
    ├── calculateScore()     — Composite score from wealth, income, investor, home value
    └── [all V5 functions]   — Filtering, modals, starters, rendering
```

## Version History

| Version | Changes |
|---------|---------|
| **v5.1** | Client-specific GWM demo, multi-date toggle, advisor status (full integration), household pairing with "Also Attending," estate planning language, reordered segments by priority, boosted match scores, all hero stats animate on date swap |
| **v5.0** | Conversation starters promoted above segments, Performance/Express dual-mode, segment cross-filtering with dimming, similar profiles navigation, sortable tables, print cards, quick stats bar, unmatched registrants, mode-aware subtitles |
| **v4.0** | Initial interactive dashboard with segments, person modals, conversation starters, scoring system |

## Internal Use Only

This dashboard contains synthetic demo data and is intended for internal review and client presentations. Not for distribution.

---

*Built by AI & Automation · AcquireUp*
