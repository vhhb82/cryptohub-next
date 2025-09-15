// Script pentru testarea autentificării
// Rulează în browser console pe localhost:3000

async function testAuth() {
  console.log('🧪 Testare autentificare...');
  
  // Test 1: Login
  try {
    const loginResponse = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: 'admin123' })
    });
    
    const loginResult = await loginResponse.json();
    console.log('✅ Login:', loginResult);
    
    if (loginResult.success) {
      // Test 2: Verificare autentificare
      const authResponse = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ test: true })
      });
      
      console.log('🔐 Auth test status:', authResponse.status);
      
      if (authResponse.status === 401) {
        console.log('❌ Nu ești autentificat');
      } else {
        console.log('✅ Ești autentificat');
      }
    }
  } catch (error) {
    console.error('❌ Eroare:', error);
  }
}

// Test traducere
async function testTranslate() {
  console.log('🌐 Testare traducere...');
  
  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Test știre',
        excerpt: 'Aceasta este o știre de test',
        content: 'Conținutul complet al știrii de test'
      })
    });
    
    const result = await response.json();
    console.log('✅ Traducere:', result);
  } catch (error) {
    console.error('❌ Eroare traducere:', error);
  }
}

// Rulează testele
console.log('🚀 Pornire teste...');
testAuth();
testTranslate();
