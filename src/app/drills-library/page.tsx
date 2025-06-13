import { fetchDrills } from './actions/drills'
import { DrillsTable } from './components/drills-table'
import { DrillsViewModelProvider } from './components/view-model-provider'

export default async function Page() {
  const { data } = await fetchDrills()
  const drills = data.listDrills.items

  return (
    <div className="px-6">
      <DrillsViewModelProvider initialDrills={drills}>
        <DrillsTable />
      </DrillsViewModelProvider>
    </div>
  )
}