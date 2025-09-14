const { PrismaClient } = require('@prisma/client');

async function testDeleteNews() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Testing news deletion...');
    
    // List all news first
    const allNews = await prisma.news.findMany({
      select: { id: true, title: true, slug: true }
    });
    console.log('News before deletion:');
    allNews.forEach(n => {
      console.log(`- ID: ${n.id}, Title: ${n.title}, Slug: ${n.slug}`);
    });
    
    // Delete the test news (ID 9)
    if (allNews.length > 1) {
      const testNews = allNews.find(n => n.id === 9);
      if (testNews) {
        console.log(`Deleting news: ${testNews.title}`);
        await prisma.news.delete({ where: { id: testNews.id } });
        console.log('News deleted successfully');
      }
    }
    
    // List all news after deletion
    const remainingNews = await prisma.news.findMany({
      select: { id: true, title: true, slug: true }
    });
    console.log('News after deletion:');
    remainingNews.forEach(n => {
      console.log(`- ID: ${n.id}, Title: ${n.title}, Slug: ${n.slug}`);
    });
    
  } catch (error) {
    console.error('Error deleting news:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDeleteNews();
