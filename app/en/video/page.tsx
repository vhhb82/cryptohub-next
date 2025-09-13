import { prisma } from '@/lib/prisma'
import VideoCard from '@/components/VideoCard'

export const metadata = { title: 'Video • CryptoHub' }

export default async function VideoEn() {
  const videos = await prisma.video.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' } })
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Video</h1>
      {videos.length === 0 && <p className="opacity-70">No videos yet.</p>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((v) => (
          <VideoCard key={v.id} platform={v.platform as any} id={v.videoId} title={v.title} url={v.url || undefined} />
        ))}
      </div>
    </div>
  )
}
