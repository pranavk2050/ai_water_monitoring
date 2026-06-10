# Data Sources

All data in this dashboard is manually curated from publicly available reports and research papers.

## Water Reserves Data (`waterReserves.json`)
- **FAO AQUASTAT** — UN Food and Agriculture Organization's global water information system
- Renewable internal freshwater resources (billion cubic meters/year)
- Per capita figures calculated using World Bank population data (2023)
- Water stress = total withdrawal as % of renewable resources

## AI Water Usage (`aiWaterUsage.json`)
- **Google Environmental Report 2024** — Total water consumption: 6.4B gallons (24.2B liters) in 2023
- **Microsoft Environmental Sustainability Report 2024** — 1.7B gallons (6.4B liters), +34% YoY
- **Meta Sustainability Report 2024** — 2.3B gallons (8.7B liters)
- **Amazon Sustainability Report 2024** — 1.9B gallons (7.1B liters)
- Country-level breakdown estimated from known data center locations and capacity

## Company Timeline (`companyTimeline.json`)
- Historical water consumption from annual sustainability/environmental reports (2019-2024)
- 2024 figures are estimates based on published partial-year data and growth trends

## Projections (`projections.json`)
- **IEA World Energy Outlook 2024** — Data center energy and water projections
- CAGR scenarios computed from historical growth rates:
  - 20% CAGR: matches Google's 2022-2023 growth rate
  - 30% CAGR: reflects accelerated AI adoption scenario
  - 10% CAGR: assumes efficiency improvements (liquid cooling, water recycling)

## Comparisons (`comparisons.json`)
- **University of California, Riverside (2023)** — "Making AI Less Thirsty" research paper
  - ChatGPT conversation water cost: ~500mL per 10-50 queries
  - GPT-4 training water: ~700,000 cubic meters (700M liters)
- **IEA (2024)** — Per-query energy and water estimates
- AI image generation estimates from Luccioni et al. (2023)

## Country Metadata (`countryMetadata.json`)
- ISO 3166-1 alpha-3 country codes
- Population data from World Bank (2023 estimates, millions)

---

*Last updated: June 2026*
*Data is approximate and intended for awareness purposes.*
