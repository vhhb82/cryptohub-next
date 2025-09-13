export default function TikTokEmbed({ id }: { id: string }) {
  return (
    <div className="relative w-full" style={{ paddingTop: '177%' }}>
      <iframe
        className="absolute inset-0 w-full h-full rounded-2xl"
        src={`https://www.tiktok.com/embed/v2/video/${id}`}
        title="TikTok video"
        loading="lazy"
        allow="encrypted-media; fullscreen; picture-in-picture"
      />
    </div>
  )
}
