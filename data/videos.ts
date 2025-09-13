export type VideoItem = {
  platform: 'youtube' | 'tiktok'
  id: string
  title: string
  url?: string
}

export const videos: VideoItem[] = [
  { platform: 'youtube', id: 'dQw4w9WgXcQ', title: 'Demo YouTube (înlocuiește cu video-ul tău)' },
  { platform: 'tiktok', id: '7362268380107646213', title: 'Demo TikTok (înlocuiește cu video-ul tău)', url: 'https://www.tiktok.com/@user/video/7362268380107646213' },
]
