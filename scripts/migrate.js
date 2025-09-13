const { PrismaClient } = require('@prisma/client')

async function main() {
  const prisma = new PrismaClient()
  
  try {
    // Test connection
    await prisma.$connect()
    console.log('✅ Supabase database connected successfully')
    
    // Check if tables exist, if not create them
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('News', 'Post', 'ContactMessage', 'Video')
    `
    
    console.log('📋 Existing tables:', tables.map(t => t.table_name))
    
    // Create tables if they don't exist
    if (!tables.find(t => t.table_name === 'News')) {
      await prisma.$executeRaw`
        CREATE TABLE "News" (
          "id" SERIAL PRIMARY KEY,
          "title" TEXT NOT NULL,
          "excerpt" TEXT,
          "content" TEXT NOT NULL,
          "titleEn" TEXT,
          "excerptEn" TEXT,
          "contentEn" TEXT,
          "slug" TEXT UNIQUE NOT NULL,
          "image" TEXT,
          "published" BOOLEAN NOT NULL DEFAULT true,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL
        );
      `
      console.log('✅ News table created')
    }
    
    if (!tables.find(t => t.table_name === 'Post')) {
      await prisma.$executeRaw`
        CREATE TABLE "Post" (
          "id" SERIAL PRIMARY KEY,
          "title" TEXT NOT NULL,
          "excerpt" TEXT,
          "content" TEXT NOT NULL,
          "titleEn" TEXT,
          "excerptEn" TEXT,
          "contentEn" TEXT,
          "slug" TEXT UNIQUE NOT NULL,
          "image" TEXT,
          "published" BOOLEAN NOT NULL DEFAULT true,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL
        );
      `
      console.log('✅ Post table created')
    }
    
    if (!tables.find(t => t.table_name === 'ContactMessage')) {
      await prisma.$executeRaw`
        CREATE TABLE "ContactMessage" (
          "id" SERIAL PRIMARY KEY,
          "name" TEXT NOT NULL,
          "email" TEXT NOT NULL,
          "subject" TEXT,
          "message" TEXT NOT NULL,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `
      console.log('✅ ContactMessage table created')
    }
    
    if (!tables.find(t => t.table_name === 'Video')) {
      await prisma.$executeRaw`
        CREATE TABLE "Video" (
          "id" SERIAL PRIMARY KEY,
          "platform" TEXT NOT NULL,
          "videoId" TEXT NOT NULL,
          "title" TEXT NOT NULL,
          "url" TEXT,
          "published" BOOLEAN NOT NULL DEFAULT true,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `
      console.log('✅ Video table created')
    }
    
    console.log('🎉 Supabase database setup completed successfully')
    
  } catch (error) {
    console.error('❌ Supabase migration failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
