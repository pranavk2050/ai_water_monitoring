import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const DATA_DIR = join(__dirname, '..', 'src', 'data')
const RESERVES_PATH = join(DATA_DIR, 'waterReserves.json')
const UPDATED_PATH = join(DATA_DIR, 'lastUpdated.json')

// World Bank API indicators
const INDICATORS = {
  'ER.H2O.INTR.K3': 'renewableWater',
  'ER.H2O.INTR.PC': 'perCapita',
  'ER.H2O.FWTL.ZS': 'withdrawal',
}

// ISO2 -> ISO3 mapping for our 35 countries
const ISO2_TO_ISO3 = {
  BR: 'BRA', RU: 'RUS', CA: 'CAN', US: 'USA', CN: 'CHN',
  CO: 'COL', ID: 'IDN', PE: 'PER', IN: 'IND', CD: 'COD',
  VE: 'VEN', BD: 'BGD', MM: 'MMR', NO: 'NOR', AR: 'ARG',
  JP: 'JPN', AU: 'AUS', MX: 'MEX', DE: 'DEU', FR: 'FRA',
  GB: 'GBR', TR: 'TUR', TH: 'THA', NG: 'NGA', EG: 'EGY',
  ZA: 'ZAF', SA: 'SAU', IL: 'ISR', SG: 'SGP', IE: 'IRL',
  NL: 'NLD', KR: 'KOR', ES: 'ESP', IT: 'ITA', PK: 'PAK',
}

// ISO3 -> country name (from existing data)
const ISO3_TO_NAME = {
  BRA: 'Brazil', RUS: 'Russia', CAN: 'Canada', USA: 'United States',
  CHN: 'China', COL: 'Colombia', IDN: 'Indonesia', PER: 'Peru',
  IND: 'India', COD: 'DR Congo', VEN: 'Venezuela', BGD: 'Bangladesh',
  MMR: 'Myanmar', NOR: 'Norway', ARG: 'Argentina', JPN: 'Japan',
  AUS: 'Australia', MEX: 'Mexico', DEU: 'Germany', FRA: 'France',
  GBR: 'United Kingdom', TUR: 'Turkey', THA: 'Thailand', NGA: 'Nigeria',
  EGY: 'Egypt', ZAF: 'South Africa', SAU: 'Saudi Arabia', ISR: 'Israel',
  SGP: 'Singapore', IRL: 'Ireland', NLD: 'Netherlands', KOR: 'South Korea',
  ESP: 'Spain', ITA: 'Italy', PAK: 'Pakistan',
}

const VALID_ISO3 = new Set(Object.values(ISO2_TO_ISO3))

function computeStressLevel(withdrawal) {
  if (withdrawal == null) return 'medium'
  if (withdrawal < 10) return 'low'
  if (withdrawal <= 25) return 'medium'
  if (withdrawal <= 70) return 'high'
  return 'critical'
}

async function fetchIndicator(code) {
  const url = `https://api.worldbank.org/v2/country/all/indicator/${code}?format=json&per_page=300&date=2018:2022`
  console.log(`Fetching ${code}...`)

  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${code}`)

  const json = await res.json()
  if (!json[1]) throw new Error(`No data returned for ${code}`)

  // Pick most recent non-null value per country
  const byCountry = {}
  for (const entry of json[1]) {
    const iso3 = entry.countryiso3code || ISO2_TO_ISO3[entry.country?.id]
    if (!iso3 || !VALID_ISO3.has(iso3) || entry.value == null) continue

    const year = parseInt(entry.date, 10)
    if (!byCountry[iso3] || year > byCountry[iso3].year) {
      byCountry[iso3] = { value: entry.value, year }
    }
  }

  return byCountry
}

async function main() {
  console.log('Fetching water data from World Bank API...\n')

  // Load existing data as fallback
  let existing
  try {
    existing = JSON.parse(readFileSync(RESERVES_PATH, 'utf-8'))
  } catch {
    console.warn('Could not read existing waterReserves.json, starting fresh')
    existing = []
  }
  const existingMap = {}
  for (const c of existing) existingMap[c.iso] = c

  // Fetch all 3 indicators
  const results = {}
  let fetchFailed = false

  for (const [code, field] of Object.entries(INDICATORS)) {
    try {
      results[field] = await fetchIndicator(code)
    } catch (err) {
      console.error(`Failed to fetch ${code}: ${err.message}`)
      fetchFailed = true
      results[field] = {}
    }
  }

  // If all fetches failed, keep existing data
  if (Object.values(results).every((r) => Object.keys(r).length === 0)) {
    console.error('\nAll API fetches failed. Keeping existing data.')
    process.exit(1)
  }

  // Merge data into country objects
  const countries = []
  for (const iso3 of VALID_ISO3) {
    const fallback = existingMap[iso3] || {}
    const renewableWater =
      results.renewableWater[iso3]?.value ?? fallback.renewableWater ?? null
    const perCapita =
      results.perCapita[iso3]?.value ?? fallback.perCapita ?? null
    const withdrawal =
      results.withdrawal[iso3]?.value ?? fallback.withdrawal ?? null

    if (renewableWater == null && perCapita == null && withdrawal == null) {
      // Keep existing entry if API returned nothing
      if (fallback.country) countries.push(fallback)
      continue
    }

    countries.push({
      country: ISO3_TO_NAME[iso3] || fallback.country || iso3,
      iso: iso3,
      renewableWater: round(renewableWater),
      perCapita: round(perCapita),
      stressLevel: computeStressLevel(withdrawal),
      withdrawal: round(withdrawal, 1),
    })
  }

  // Sort by renewableWater descending (same as original)
  countries.sort((a, b) => (b.renewableWater || 0) - (a.renewableWater || 0))

  // Write files
  writeFileSync(RESERVES_PATH, JSON.stringify(countries, null, 2) + '\n')
  console.log(`\nWrote ${countries.length} countries to waterReserves.json`)

  const updated = {
    waterReserves: new Date().toISOString(),
    source: 'World Bank API',
  }
  writeFileSync(UPDATED_PATH, JSON.stringify(updated, null, 2) + '\n')
  console.log(`Wrote lastUpdated.json: ${updated.waterReserves}`)

  // Summary
  const stressCounts = { low: 0, medium: 0, high: 0, critical: 0 }
  for (const c of countries) stressCounts[c.stressLevel]++
  console.log(`\nStress levels: ${JSON.stringify(stressCounts)}`)
  if (fetchFailed) {
    console.log('Note: Some indicators failed to fetch; fallback data was used.')
  }
}

function round(val, decimals = 0) {
  if (val == null) return 0
  const factor = 10 ** decimals
  return Math.round(val * factor) / factor
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
