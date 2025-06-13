'use client'

import { useDrillViewModel } from '../view-model/view-model'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent } from '@/components/ui/card'

export function DrillDetails() {
  const drill = useDrillViewModel((s) => s.drill)

  if (!drill) return null

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

            <div>
              <h2 className="font-semibold">Description</h2>
              <p>{drill.description}</p>
            </div>
          </div>

          {drill.videoId && drill.videoId !== "" && (
            <Card className="w-[640px] p-4">
              <CardContent>
                <AspectRatio ratio={16 / 9}>
                  <iframe
                    className="rounded-b-md w-full h-full"
                    src={`https://www.youtube.com/embed/${drill.videoId}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </AspectRatio>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Separator />
    </div>
  )
}