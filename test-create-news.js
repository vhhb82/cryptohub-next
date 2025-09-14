const { PrismaClient } = require('@prisma/client');

async function testCreateNews() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Testing news creation...');
    
    // Test data
    const testData = {
      title: "Test Știre " + Date.now(),
      slug: "test-stire-" + Date.now(),
      excerpt: "Aceasta este o știre de test",
      content: "Conținutul știrii de test pentru a verifica funcționalitatea.",
      image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDUyMCI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjRUZGNkZGIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0RCRUFGRSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNTIwIiByeD0iMjgiIGZpbGw9InVybCgjZykiLz4KICA8ZyBmb250LWZhbWlseT0iSW50ZXIsIEFyaWFsLCBzYW5zLXNlcmlmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj4KICAgIDx0ZXh0IHg9IjYwMCIgeT0iMjQwIiBmb250LXNpemU9IjQ2IiBmaWxsPSIjMUUzQThBIiBmb250LXdlaWdodD0iNzAwIj5DcnlwdG9IdWIg4oCiIMiYdGlyZSBkZW1vPC90ZXh0PgogICAgPHRleHQgeD0iNjAwIiB5PSIzMDAiIGZvbnQtc2l6ZT0iMjIiIGZpbGw9IiMzMzQxNTUiPkltYWdpbmUgZGUgdGVzdCBkaW4gL3B1YmxpYy91cGxvYWRzL2RlbW8tbmV3cy1jb3Zlci5zdmc8L3RleHQ+CiAgPC9nPgo8L3N2Zz4K",
      titleEn: "Test News " + Date.now(),
      excerptEn: "This is a test news",
      contentEn: "Test news content to verify functionality.",
      published: true,
    };
    
    console.log('Creating news with data:', {
      title: testData.title,
      slug: testData.slug,
      hasImage: !!testData.image
    });
    
    const result = await prisma.news.create({ data: testData });
    console.log('News created successfully:', {
      id: result.id,
      title: result.title,
      slug: result.slug,
      hasImage: !!result.image
    });
    
  } catch (error) {
    console.error('Error creating news:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testCreateNews();
