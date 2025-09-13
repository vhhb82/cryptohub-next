const { PrismaClient } = require('@prisma/client')

async function main() {
  const prisma = new PrismaClient()
  
  try {
    // Test connection
    await prisma.$connect()
    console.log('✅ Database connected successfully')
    
    // Create tables if they don't exist
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "News" (
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
    
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "Post" (
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
    
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "ContactMessage" (
        "id" SERIAL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "subject" TEXT,
        "message" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `
    
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "Video" (
        "id" SERIAL PRIMARY KEY,
        "platform" TEXT NOT NULL,
        "videoId" TEXT NOT NULL,
        "title" TEXT NOT NULL,
        "url" TEXT,
        "published" BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `
    
    console.log('✅ Database tables created successfully')
    
  } catch (error) {
    console.error('❌ Database migration failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
