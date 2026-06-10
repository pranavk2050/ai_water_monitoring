import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import HeroStats from '../components/dashboard/HeroStats'
import CountryWaterMap from '../components/dashboard/CountryWaterMap'
import WaterReservesChart from '../components/dashboard/WaterReservesChart'
import CompanyConsumptionChart from '../components/dashboard/CompanyConsumptionChart'
import TimelineChart from '../components/dashboard/TimelineChart'
import ComparisonCards from '../components/dashboard/ComparisonCards'
import CountryAIUsageChart from '../components/dashboard/CountryAIUsageChart'
import ProjectionChart from '../components/dashboard/ProjectionChart'
import WaterStressGauge from '../components/dashboard/WaterStressGauge'
import ImpactSection from '../components/dashboard/ImpactSection'
import SectionHeading from '../components/ui/SectionHeading'
import TabGroup from '../components/ui/TabGroup'
import Card from '../components/ui/Card'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <HeroStats />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 space-y-20 pb-12">
        {/* Section 2: World Water Reserves */}
        <section>
          <SectionHeading
            id="reserves"
            title="Global Water Reserves"
            subtitle="Renewable freshwater resources by country — the baseline under threat"
          />
          <Card>
            <CountryWaterMap />
          </Card>
          <div className="mt-6">
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4">Top 20 Countries by Water Reserves</h3>
              <WaterReservesChart />
            </Card>
          </div>
        </section>

        {/* Section 3: Big Tech Water Footprint */}
        <section>
          <SectionHeading
            id="bigtech"
            title="Big Tech Water Footprint"
            subtitle="How much water the largest AI companies consume"
          />
          <Card>
            <TabGroup tabs={['Company Comparison (2023)', 'Growth Trend (2019-2024)']}>
              <CompanyConsumptionChart />
              <TimelineChart />
            </TabGroup>
          </Card>
          <ComparisonCards />
        </section>

        {/* Section 4: Data Center Water by Country */}
        <section>
          <SectionHeading
            id="datacenters"
            title="Data Center Water by Country"
            subtitle="Direct cooling water vs. electricity-related water consumption"
          />
          <Card>
            <CountryAIUsageChart />
          </Card>
        </section>

        {/* Section 5: Future Projections */}
        <section>
          <SectionHeading
            id="projections"
            title="Future Projections"
            subtitle="Three scenarios for AI water demand through 2035"
          />
          <Card>
            <ProjectionChart />
          </Card>
        </section>

        {/* Section 6: Water Stress Gauges */}
        <section>
          <SectionHeading
            id="stress"
            title="Regional Water Stress"
            subtitle="Key regions where AI data centers intersect with water scarcity"
          />
          <WaterStressGauge />
        </section>

        {/* Section 7: Impact & Awareness */}
        <section>
          <SectionHeading
            id="impact"
            title="Real-Time Impact"
            subtitle="AI's water consumption is happening right now"
          />
          <ImpactSection />
        </section>
      </main>

      <Footer />
    </div>
  )
}
