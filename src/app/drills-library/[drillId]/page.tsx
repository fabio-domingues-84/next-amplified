import { fetchDrillDetails } from './actions/drill-details'
import { DrillViewModelProvider } from './components/view-model-provider'
import { DrillDetails } from './components/drill-details'

export default async function Page({
  params,
}: {
  params: Promise<{ drillId: string }>
}) {
  const { drillId } = await params
  const { data } = await fetchDrillDetails(drillId)
  const drill = data.getDrill

  if (!drill) return null

  return (
    <DrillViewModelProvider drill={drill}>
      <DrillDetails />
    </DrillViewModelProvider>
  )
}