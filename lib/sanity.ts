import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.SANITY_API_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_API_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Helper function to get all published content
export async function getPublishedContent(type: string) {
  return await client.fetch(`*[_type == "${type}" && !(_id in path("drafts.**"))] | order(_createdAt desc)`)
}

// Helper function to get content by slug
export async function getContentBySlug(type: string, slug: string) {
  const result = await client.fetch(`*[_type == "${type}" && slug.current == "${slug}" && !(_id in path("drafts.**"))][0]`)
  return result
}
