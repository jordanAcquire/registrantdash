# Pre-Event Registrant Summary Dashboard — V4

**An interactive intelligence briefing for financial advisors preparing for client events.**

Built by AcquireUp · Demo with sample data · Single HTML file, no dependencies

---

## What This Is

A self-contained dashboard that transforms a raw event registrant list into an actionable pre-event intelligence report. Advisors open one file and instantly see who's coming, what they're worth, how to prioritize them, and what to say when they walk up to each person.

This is a demo using sample data for a fictional Philadelphia-area retirement planning seminar with 47 registrants (33 matched with consumer data records).

---

## What's New in V4

### Consumer Data Integration
Every matched registrant is enriched with 30+ consumer data attributes including estimated net worth, household income, home value, home equity, investor classification, consumer profile segment, occupation, charitable donor status, and lifestyle interests.

### Personalized Conversation Starters
Each individual profile card now generates a custom conversation starter based on that person's unique combination of wealth, age, investor type, family situation, home equity, lifestyle interests, and donor history. No two are alike.

### Dynamic Group Conversation Starters
The main dashboard features 15 pooled conversation starters that automatically rank and rotate based on the advisor's current scoring weights and active segment filters. Adjust the sliders or click different segments, and the talking points update in real-time.

### Plain English Throughout
All technical data vendor codes, field names, and classification systems have been replaced with human-readable labels. No "Code F" or "InfoPersona Cluster" — just "Est. Net Worth" and "Consumer Profile."

### Interactive Segment Filtering
Eight segment cards across wealth, income, home value, investor type, age range, consumer profile, occupation, and lifestyle interests. Click to select segments, combine multiple for cross-filtering, and hit "See Results" to drill into the overlap.

### Adjustable Prospect Scoring
Four weighted sliders (Net Worth, Income, Investor Type, Home Equity) that dynamically rescore and rerank all 33 prospects in real-time. The opportunity tiers, conversation starters, and all drill-down modals respond to slider changes.

### Individual Profile Cards
Click any name in any list to open a full profile with six sections:
- **Conversation Starter** — personalized talking points
- **About** — age, gender, married, children, homeowner, years in home, location
- **Wealth & Income** — net worth range, household income, investor type, consumer profile
- **Property** — home value, home equity, occupation, prospect score
- **Behavioral Insights** — charitable donor, health causes, political donor, email opt-in
- **Lifestyle Interests** — tagged interests for rapport-building

---

## Dashboard Sections

| Section | Description |
|---|---|
| **Hero Stats** | Registrant count, total estimated wealth, avg age, drive time, top targets |
| **Data Coverage Banner** | Match rate transparency (33 of 47 matched) |
| **Prospect Scoring** | Four adjustable weight sliders with live recalculation |
| **Opportunity Distribution** | Three tiers — Targets, Prospects, Nurture — with click-to-drill |
| **Conversation Starters** | Dynamic talking points ranked by scoring weights and filters |
| **Registrant Segments** | Eight filterable segment cards with cross-filter support |
| **Quick Stats** | Age, Married, Children, Homeowners, Donors, Active Investors, Net Worth $1M+, Match Rate |

---

## Features

- **Single HTML file** — no build step, no server, no dependencies
- **Dark/Light mode** — theme toggle in header
- **Fully interactive** — every stat, card, and name is clickable
- **Real-time scoring** — sliders dynamically rerank all prospects
- **Cross-segment filtering** — combine any segments, hit See Results
- **Personal conversation starters** — AI-style briefing per individual
- **Dynamic group starters** — 15 pooled starters that respond to context
- **Location data** — city/state for every matched registrant
- **Mobile responsive** — works on tablet for on-site use
- **Print-ready export** — browser print dialog via Export button

---

## How to Use

1. Open `index.html` in any modern browser
2. Review hero stats for room-level overview
3. Adjust scoring sliders to match your priorities
4. Watch conversation starters and opportunity tiers update
5. Click segment cards to filter by criteria
6. Combine segments and hit "See Results" for overlaps
7. Click any name to open their full profile and personal conversation starter
8. Review your top targets before the event

---

## Data Sources (Production)

In production, this dashboard would be powered by:
- **Registration form data** — name, title, company, email, address
- **DataAxel consumer data append** — 490+ available fields including wealth, income, home data, lifestyle interests, donor history, and consumer profile segments
- **AcquireUp event platform** — registrant management and advisor matching

This demo uses realistic sample data to demonstrate the dashboard's capabilities.

---

## Version History

| Version | Description |
|---|---|
| V1 | Static summary with basic registrant stats |
| V2 | Added interactive modals and drill-down tables |
| V3 | Enhanced with opportunity tiers, scoring sliders, segment cards |
| V4 | Consumer data integration, personalized conversation starters, dynamic starters, plain English rewrite, location data, cross-segment filtering |

---

## Tech

- Pure HTML/CSS/JavaScript
- Zero external dependencies
- ~470 lines, single file
- Works offline once loaded

---

*Built for AcquireUp — helping financial advisors turn event registrants into clients.*
