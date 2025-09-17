import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { news } from './sanity/schemas/news'
import { post } from './sanity/schemas/post'
import { video } from './sanity/schemas/video'

export default defineConfig({
  name: 'cryptohub-cms',
  title: 'CryptoHub CMS',
  projectId: 'uz2drfml',
  dataset: 'production',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: [news, post, video],
  },
})
