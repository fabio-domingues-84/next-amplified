import { Card, CardContent } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Separator } from "@/components/ui/separator"
import { EditDrillButton } from '@/components/drills-library/action-buttons';

import { fetchDrillDetails } from '../actions/drills';

export default async function DrillDetails({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const { data } = await fetchDrillDetails(id);
  const drill = data.getDrill;

  return (
    <div className="px-6 space-y-12">
      <div className="flex items-start justify-between w-full">
        <div className="flex justify-between items-start gap-10 pr-8">
          {/* Info */}
          <div className="space-y-6 text-neutral-800">
            <div>
              <h1 className="font-bold capitalize">{drill.name}</h1>
            </div>

            <div>
              <h2 className="font-semibold">Skill</h2>
              <p>{drill.skill?.name}</p>
            </div>

            <div>
              <h2 className="font-semibold">Goal</h2>
              <p>{drill.goal}</p>
            </div>

            {/* Description */}
            <div>
              <h2 className="font-semibold">Description</h2>
              <p>{drill.description}</p>
            </div>
          </div>

          {/* Video */}
          {drill.videoId && drill.videoId !== "" && (
            <Card className="w-[640px] p-4">
              <CardContent className="">
                <AspectRatio ratio={16 / 9}>
                  <iframe
                    className="rounded-b-md w-full h-full"
                    src={`https://www.youtube.com/embed/${drill.videoId}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </AspectRatio>
              </CardContent>
            </Card>
          )}
        </div>

        <EditDrillButton drillId={id} />
      </div>

      <Separator />
    </div>
  )
}