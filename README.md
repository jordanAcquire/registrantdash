# Pre-Event Registrant Dashboard v5

Interactive intelligence briefing for financial advisors preparing for educational seminars. Combines registration data with consumer insights to help advisors understand who's in the room before they walk in.

![Dashboard Preview](https://img.shields.io/badge/status-internal_demo-blue) ![Version](https://img.shields.io/badge/version-5.0-green)

---

## What It Does

Advisors run dinner seminars to meet prospective clients. This dashboard takes the registration list, matches it against consumer data records, and surfaces actionable insights — who to talk to first, what to say, and how the room breaks down demographically.

**Two modes serve two products:**

- **Express** — Full drill-down access. Click any number, segment, or person to explore. Designed for advisors who've purchased the complete pre-event package.
- **Performance** — Aggregate-only view. See room composition and conversation starters without individual records. Designed to demonstrate value and drive upgrades.

## Features

### Hero Stats
Five at-a-glance cards: total registrants, estimated wealth in room, average match score, average drive time, and top targets. Subtitles adapt per mode — Express shows match/unmatch breakdown, Performance shows neutral context.

### Quick Stats Bar
Demographic snapshot positioned right below the hero: average age, % married, % with children, % homeowners, donor count, active investor count, and high-net-worth count. Gives advisors presentation calibration at a glance.

### Conversation Starters
Six AI-ranked talking points combining demographic, financial, and behavioral signals. Each starter lists the people in the group (up to 3 names + overflow) and includes a tactical advisor tip. Clicking a starter in Express mode opens a results table with the tip pinned at the top as a gold banner.

### Registrant Segments
Eight filterable segment cards across four categories:

| Financial | Demographic | Behavioral | Lifestyle |
|-----------|-------------|------------|-----------|
| Est. Net Worth | Age Range | Investor Type | Consumer Profile |
| Household Income | Occupation | Lifestyle Interests | — |
| Home Value | — | — | — |

**Cross-filtering:** Click multiple segments to combine filters. Incompatible segments dim automatically. Hit "See Results" to view the overlap in a sortable table.

### Person Cards (Express only)
Full profile modal for each matched registrant:
- Conversation starter narrative
- About section (age, marital status, children, homeowner)
- Wealth & income tiers
- Property details with home value range
- Behavioral signals (investor type, donor status)
- Lifestyle interests with persona description
- Contact info (phone, email, full street address)
- **Similar Profiles** navigation — browse other registrants in the same persona segment without closing the modal
- **Print Card** button — opens a clean, print-friendly popup for physical prep

### Sortable Tables
All result tables support column sorting. Click any header (Name, Age, Title, Net Worth, Income, Investor Type, Score) to sort ascending/descending. Sorts by underlying tier values for financial columns.

### Unmatched Registrants
The "All Registrants" modal shows all 33 matched records followed by 14 unmatched registrants as greyed-out rows with "No data available." Advisors can at least see who else is coming.

### Dark/Light Mode
Full theme toggle. Dark mode is default for on-screen review; light mode available for printing.

## Architecture

Single self-contained HTML file. No build step, no dependencies, no server required. Open in any browser.

```
index.html
├── <style>        — All CSS including theme variables, responsive grid, modals
├── <body>         — Static layout shell + segment cards
└── <script>       — Prospect data array, filtering engine, modal system, rendering
```

### Data Structure

Each matched prospect record contains:

```javascript
{
  id, name, age, title, company, city,
  wealthTier (1-4), wealth (display string),
  incomeTier (1-4), income (display string),
  homeValue (range string, e.g. "$500K – $600K"),
  investorTier (1-4), investorType (display string),
  married, children, homeowner, donor,
  interests: { finance, golf, travel, wine },
  persona, occupation,
  phone, email, address,
  matchScore
}
```

### Key Functions

| Function | Purpose |
|----------|---------|
| `setMode(mode)` | Toggle Express/Performance, swap subtitles via data attributes |
| `renderStarters()` | Score and rank conversation starters, deduplicate lead names |
| `renderQuickStats()` | Compute demographic stats from prospect data |
| `segClick(label, type)` | Add/remove segment filters, trigger dimming |
| `updateSegmentDimming()` | Grey out segments with zero cross-filter overlap |
| `getFilteredProspects()` | Apply all active filters, return matching records |
| `matchesFilter(p, f)` | Test a single prospect against a single filter |
| `openPersonModal(id)` | Build and display full prospect profile card |
| `renderSimilarProfiles(p)` | List same-persona registrants for in-modal navigation |
| `generateTable(data, tip, unmatched)` | Render sortable table with optional tip banner and unmatched rows |
| `sortTable(col)` | Re-sort current table by column, toggle asc/desc |
| `printPersonCard()` | Open print-friendly popup with CSS variable replacement |
| `calculateScore(p)` | Composite score from wealth, income, investor, and interest signals |

## Demo Mode

The dashboard ships with a demo banner and synthetic data for a fictional event:

- **Event:** Social Security & Retirement Planning
- **Date:** January 28th, 2026
- **Venue:** Panache Woodfire Grill, Philadelphia PA
- **Advisor:** Preservation Wealth Management
- **Data:** 33 matched + 14 unmatched registrants

Toggle between Express and Performance in the top-right corner to see both product experiences.

## Version History

| Version | Changes |
|---------|---------|
| **v5.0** | Conversation starters promoted above segments, Performance/Express dual-mode, segment cross-filtering with dimming, similar profiles navigation, sortable tables, print cards, quick stats bar, unmatched registrants, mode-aware subtitles |
| **v4.0** | Initial interactive dashboard with segments, person modals, conversation starters, scoring system |

## Internal Use Only

This dashboard contains synthetic demo data and is intended for internal review and customer advisory board presentations. Not for distribution.

---

*Built by AI & Automation · AcquireUp*
