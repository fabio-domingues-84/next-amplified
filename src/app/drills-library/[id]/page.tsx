import { cookies } from 'next/headers'
import { getCurrentUser } from 'aws-amplify/auth/server'
import { runWithAmplifyServerContext } from '@/lib/amplifyServerUtils'
import { redirect } from 'next/navigation'

import { fetchDrillDetails } from '../actions/drills';

export default async function DrillDetails({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const user = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    async operation(ctx) {
      return getCurrentUser(ctx)
    }
  }).catch(() => null)

  if (!user) {
    redirect('/auth/login')
  }

  const { id } = await params;
  const { data } = await fetchDrillDetails(id);
  const drill = data.getDrill;

  return (
    <div className=" px-6">
      <div
        id="drill-info"
        className="mt-5 flex w-full items-center justify-between pr-8"
      >
        <div
          id="info"
          className="text-beige-500 flex h-full flex-col justify-between font-bold"
        >
          <div>
            <p className="text-2xl text-neutral-800 capitalize">
              {drill?.name}
            </p>
          </div>

          <div>
            <p className="mt-8 text-xl text-neutral-800">SKILL</p>
            <p className="text-2xl text-neutral-800">{drill?.skill?.name}</p>
          </div>

          <div>
            <p className="mt-8 text-xl text-neutral-800">GOAL</p>
            <p className="text-lg font-normal text-neutral-800">
              {drill?.goal}
            </p>
          </div>
        </div>

        <div id="video" className="border-primary border-2 w-86 h-58">
          {drill?.videoId && drill?.videoId !== "" && (
            <iframe
              className="aspect-video h-57 w-85"
              src={`https://www.youtube.com/embed/${drill.videoId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          )}
        </div>
      </div>

      <div id="description" className="mt-14 text-neutral-800 pr-8">
        <span className="text-xl font-bold">DESCRIPTION</span>
        <p className="mt-4">{drill?.description}</p>
      </div>
    </div>
  )
}