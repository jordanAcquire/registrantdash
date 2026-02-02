# Pre-Event Registrant Summary

A visual dashboard that aggregates LeadJig/Prospectix registrant data to give financial advisors a snapshot of who's in the room before their seminar.

![Pre-Event Summary Screenshot](assets/screenshot.png)

## Overview

Financial advisors currently have to click through LeadJig contacts one-by-one to understand the value of their event. This dashboard solves that by aggregating registrant data into actionable insights:

- **Total estimated assets** in the room
- **Opportunity tiers** (Targets, Prospects, Nurture)
- **Demographic breakdowns** (age, industry, job titles, education)
- **AI-generated conversation starters** ranked by opportunity value
- **Drill-down filtering** to find the overlap (e.g., "$1M+ AND 60+")
- **Advisor-customizable scoring** with adjustable weights

## Features

### V1 (Current)
- Aggregate stats (registrants, households, est. assets, match score, drive time)
- Asset tier distribution
- Age distribution
- Industry & job title breakdowns
- Top 5 prospects to target
- Conversation starters
- Geographic breakdown (top zip codes)
- Education level summary

### V2 (Concept)
- Sample size transparency banner
- Advisor-driven scoring sliders (Net Worth, Age, Title, Match Score)
- 3-tier opportunity distribution (Targets → Prospects → Nurture)
- Clickable tiles with drill-down modal
- Cross-filtering (Venn diagram overlaps)
- Enhanced data fields (Married, Children, Retired status, Uses Advisor)
- Ranked conversation starters tied to opportunity value

## Tech Stack

- **HTML5** / **CSS3** (no frameworks, pure vanilla)
- **JavaScript** (vanilla, no dependencies)
- **Google Fonts** (DM Sans, Fraunces)

## File Structure

```
pre-event-summary/
├── README.md
├── index.html          # V1 - Production ready mockup
├── v2.html             # V2 - Full concept with all features
├── src/
│   ├── styles.css      # Shared styles
│   └── app.js          # Interactive functionality
└── assets/
    └── screenshot.png  # Preview image
```

## Getting Started

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/pre-event-summary.git
   ```

2. Open `index.html` in your browser (no build step required)

3. For V2 concept, open `v2.html`

## Data Integration (Future)

This is currently a static mockup. To make it functional, you'll need to:

1. **LeadJig API** - Pull registrant data for a campaign
2. **Prospectix API** - Enrich with wealth/demographic data
3. **DataAxel** (optional) - Additional fields like propensity scores

### Expected Data Schema

```javascript
{
  registrant: {
    id: string,
    name: string,
    email: string,
    phone: string,
    age: number,
    worth: string,           // "$1M+", "$500K-$1M", etc.
    industry: string,
    jobTitle: string,
    company: string,
    education: string,
    address: {
      street: string,
      city: string,
      state: string,
      zip: string
    },
    matchScore: number,      // 1-10
    married: boolean,
    hasChildren: boolean,
    hasGrandchildren: boolean,
    isRetired: boolean,
    usesAdvisor: boolean,
    emailOptIn: boolean,
    smsOptIn: boolean
  },
  event: {
    id: string,
    name: string,
    date: string,
    time: string,
    venue: string,
    address: string,
    campaign: string
  }
}
```

## Customization

### Brand Colors

Update CSS variables in `src/styles.css`:

```css
:root {
    --bg-primary: #0a1628;
    --bg-card: #0f2039;
    --accent-neon: #00e5cc;
    --accent-gold: #c9a227;
    --text-primary: #f5f0e6;
}
```

### Scoring Weights

Default scoring formula (adjustable by advisor):

| Factor | Default Weight |
|--------|----------------|
| Net Worth | 40% |
| Age (Retirement Ready) | 30% |
| Professional Title | 20% |
| Match Score | 10% |

## Roadmap

- [ ] Connect to LeadJig API
- [ ] Connect to Prospectix API
- [ ] Real-time data population
- [ ] PDF export
- [ ] Post-event version (attendance tracking)
- [ ] Mobile responsive design
- [ ] Integration with CRM follow-up workflows

## License

Proprietary - AcquireUp Internal Use

## Credits

Built by Jordan Greve @ AcquireUp / Unconquered Labs
