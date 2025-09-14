const { PrismaClient } = require('@prisma/client');

async function checkDatabase() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Checking database...');
    
    // Check News
    const news = await prisma.news.findMany({
      select: { id: true, title: true, slug: true, image: true }
    });
    console.log('News count:', news.length);
    news.forEach(n => {
      console.log(`- ID: ${n.id}, Title: ${n.title}, Slug: ${n.slug}, Image: ${n.image ? 'YES' : 'NO'}`);
    });
    
    // Check Posts
    const posts = await prisma.post.findMany({
      select: { id: true, title: true, slug: true, image: true }
    });
    console.log('Posts count:', posts.length);
    posts.forEach(p => {
      console.log(`- ID: ${p.id}, Title: ${p.title}, Slug: ${p.slug}, Image: ${p.image ? 'YES' : 'NO'}`);
    });
    
  } catch (error) {
    console.error('Database error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();
