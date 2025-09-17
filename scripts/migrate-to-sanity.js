/**
 * Script pentru migrarea datelor din Prisma către Sanity
 * Rulează cu: node scripts/migrate-to-sanity.js
 */

const { PrismaClient } = require('@prisma/client')
const { createClient } = require('@sanity/client')

const prisma = new PrismaClient()
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

async function migrateNews() {
  console.log('🔄 Migrând știrile...')
  
  const news = await prisma.news.findMany({
    where: { published: true }
  })
  
  for (const item of news) {
    try {
      // Verifică dacă știrea există deja în Sanity
      const existing = await sanityClient.fetch(
        `*[_type == "news" && slug.current == "${item.slug}"][0]`
      )
      
      if (existing) {
        console.log(`⏭️  Știrea "${item.title}" există deja, sări...`)
        continue
      }
      
      // Convertește conținutul la format Sanity blocks
      const contentBlocks = [
        {
          _type: 'block',
          _key: 'content-block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'content-span',
              text: item.content,
              marks: []
            }
          ],
          markDefs: []
        }
      ]
      
      const contentEnBlocks = item.contentEn ? [
        {
          _type: 'block',
          _key: 'content-en-block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'content-en-span',
              text: item.contentEn,
              marks: []
            }
          ],
          markDefs: []
        }
      ] : undefined
      
      // Creează știrea în Sanity
      await sanityClient.create({
        _type: 'news',
        title: item.title,
        excerpt: item.excerpt,
        content: contentBlocks,
        titleEn: item.titleEn,
        excerptEn: item.excerptEn,
        contentEn: contentEnBlocks,
        slug: {
          _type: 'slug',
          current: item.slug
        },
        published: item.published,
        _createdAt: item.createdAt.toISOString(),
        _updatedAt: item.updatedAt.toISOString(),
      })
      
      console.log(`✅ Migrată știrea: "${item.title}"`)
    } catch (error) {
      console.error(`❌ Eroare la migrarea știrii "${item.title}":`, error.message)
    }
  }
  
  console.log(`✅ Migrate ${news.length} știri`)
}

async function migratePosts() {
  console.log('🔄 Migrând postările...')
  
  const posts = await prisma.post.findMany({
    where: { published: true }
  })
  
  for (const post of posts) {
    try {
      // Verifică dacă postarea există deja în Sanity
      const existing = await sanityClient.fetch(
        `*[_type == "post" && slug.current == "${post.slug}"][0]`
      )
      
      if (existing) {
        console.log(`⏭️  Postarea "${post.title}" există deja, sări...`)
        continue
      }
      
      // Convertește conținutul la format Sanity blocks
      const contentBlocks = [
        {
          _type: 'block',
          _key: 'content-block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'content-span',
              text: post.content,
              marks: []
            }
          ],
          markDefs: []
        }
      ]
      
      const contentEnBlocks = post.contentEn ? [
        {
          _type: 'block',
          _key: 'content-en-block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'content-en-span',
              text: post.contentEn,
              marks: []
            }
          ],
          markDefs: []
        }
      ] : undefined
      
      // Creează postarea în Sanity
      await sanityClient.create({
        _type: 'post',
        title: post.title,
        excerpt: post.excerpt,
        content: contentBlocks,
        titleEn: post.titleEn,
        excerptEn: post.excerptEn,
        contentEn: contentEnBlocks,
        slug: {
          _type: 'slug',
          current: post.slug
        },
        published: post.published,
        _createdAt: post.createdAt.toISOString(),
        _updatedAt: post.updatedAt.toISOString(),
      })
      
      console.log(`✅ Migrată postarea: "${post.title}"`)
    } catch (error) {
      console.error(`❌ Eroare la migrarea postării "${post.title}":`, error.message)
    }
  }
  
  console.log(`✅ Migrate ${posts.length} postări`)
}

async function migrateVideos() {
  console.log('🔄 Migrând videoclipurile...')
  
  const videos = await prisma.video.findMany({
    where: { published: true }
  })
  
  for (const video of videos) {
    try {
      // Verifică dacă videoclipul există deja în Sanity
      const existing = await sanityClient.fetch(
        `*[_type == "video" && videoId == "${video.videoId}" && platform == "${video.platform}"][0]`
      )
      
      if (existing) {
        console.log(`⏭️  Videoclipul "${video.title}" există deja, sări...`)
        continue
      }
      
      // Creează videoclipul în Sanity
      await sanityClient.create({
        _type: 'video',
        platform: video.platform,
        videoId: video.videoId,
        title: video.title,
        titleEn: video.titleEn,
        url: video.url,
        source: video.source,
        published: video.published,
        _createdAt: video.createdAt.toISOString(),
      })
      
      console.log(`✅ Migrat videoclipul: "${video.title}"`)
    } catch (error) {
      console.error(`❌ Eroare la migrarea videoclipului "${video.title}":`, error.message)
    }
  }
  
  console.log(`✅ Migrate ${videos.length} videoclipuri`)
}

async function main() {
  console.log('🚀 Începe migrarea către Sanity...')
  
  try {
    await migrateNews()
    await migratePosts()
    await migrateVideos()
    
    console.log('🎉 Migrarea completă!')
  } catch (error) {
    console.error('❌ Eroare la migrare:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Verifică variabilele de mediu
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
  console.error('❌ Variabilele de mediu Sanity nu sunt configurate!')
  console.error('Adaugă NEXT_PUBLIC_SANITY_PROJECT_ID și SANITY_API_TOKEN în .env.local')
  process.exit(1)
}

main()
