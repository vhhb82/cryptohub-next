import YouTubeEmbed from './YouTubeEmbed'
import TikTokEmbed from './TikTokEmbed'

export default function VideoCard({
  platform, id, title, url,
}: { platform: 'youtube' | 'tiktok'; id: string; title: string; url?: string }) {
  return (
    <div className="card space-y-3">
      {platform === 'youtube' ? <YouTubeEmbed id={id} /> : <TikTokEmbed id={id} />}
      <div className="flex items-center justify-between gap-3">
        <div className="font-medium">{title}</div>
        {url && <a className="btn" href={url} target="_blank">Deschide</a>}
      </div>
    </div>
  )
}
