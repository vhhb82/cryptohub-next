import { defineType, defineField } from 'sanity'

export const video = defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'YouTube', value: 'youtube' },
          { title: 'TikTok', value: 'tiktok' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoId',
      title: 'Video ID',
      type: 'string',
      description: 'The ID of the video (e.g., for YouTube: dQw4w9WgXcQ)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title (RO)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleEn',
      title: 'Title (EN)',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'External URL',
      type: 'url',
      description: 'Optional external link to the video',
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      description: 'Where this video was found or who created it',
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      platform: 'platform',
      videoId: 'videoId',
    },
    prepare(selection) {
      const { title, platform, videoId } = selection
      return {
        title: title,
        subtitle: `${platform}: ${videoId}`,
      }
    },
  },
})
