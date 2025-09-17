/**
 * Script de test pentru configurația Sanity
 * Rulează cu: node test-sanity-config.js
 */

require('dotenv').config({ path: '.env.local' })

const { createClient } = require('@sanity/client')

async function testSanityConfig() {
  console.log('🧪 Testez configurația Sanity...')
  
  // Verifică variabilele de mediu
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  const token = process.env.SANITY_API_TOKEN
  
  console.log('📋 Variabile de mediu:')
  console.log(`  Project ID: ${projectId && projectId !== 'your_project_id_here' ? '✅ Setat' : '❌ Lipsă sau placeholder'}`)
  console.log(`  Dataset: ${dataset && dataset !== 'production' ? '✅ Setat' : '❌ Lipsă sau placeholder'}`)
  console.log(`  API Token: ${token && token !== 'your_api_token_here' ? '✅ Setat' : '❌ Lipsă sau placeholder'}`)
  
  if (!projectId || !dataset || !token || 
      projectId === 'your_project_id_here' || 
      token === 'your_api_token_here') {
    console.log('\n❌ Configurarea este incompletă!')
    console.log('📝 Completează variabilele în .env.local cu valorile reale:')
    console.log('   NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id')
    console.log('   NEXT_PUBLIC_SANITY_DATASET=production')
    console.log('   SANITY_API_TOKEN=your_actual_api_token')
    console.log('\n💡 Pentru a obține aceste valori:')
    console.log('   1. Mergi la https://sanity.io și creează un cont')
    console.log('   2. Creează un proiect nou')
    console.log('   3. Copiază Project ID din Settings → API')
    console.log('   4. Creează API Token din API → Tokens')
    return
  }
  
  try {
    // Creează client Sanity
    const client = createClient({
      projectId,
      dataset,
      useCdn: false,
      apiVersion: '2024-01-01',
      token,
    })
    
    console.log('\n🔗 Testez conexiunea la Sanity...')
    
    // Testează conexiunea
    const result = await client.fetch('*[_type == "news"][0...1]')
    console.log('✅ Conexiunea la Sanity funcționează!')
    console.log(`📊 Găsite ${result.length} știri în baza de date`)
    
    // Testează schema-urile
    console.log('\n📋 Testez schema-urile...')
    
    const newsCount = await client.fetch('count(*[_type == "news"])')
    const postsCount = await client.fetch('count(*[_type == "post"])')
    const videosCount = await client.fetch('count(*[_type == "video"])')
    
    console.log(`  📰 News: ${newsCount} documente`)
    console.log(`  📝 Posts: ${postsCount} documente`)
    console.log(`  🎥 Videos: ${videosCount} documente`)
    
    console.log('\n🎉 Configurația Sanity este completă și funcțională!')
    console.log('\n📝 Următorii pași:')
    console.log('   1. Rulează: npm run sanity:dev (pentru Sanity Studio)')
    console.log('   2. Rulează: npm run dev (pentru aplicația Next.js)')
    console.log('   3. Deschide: http://localhost:3333 (Sanity Studio)')
    console.log('   4. Deschide: http://localhost:3000 (Aplicația)')
    
  } catch (error) {
    console.log('\n❌ Eroare la conectarea la Sanity:')
    console.log(`   ${error.message}`)
    
    if (error.message.includes('Project not found')) {
      console.log('\n💡 Soluții:')
      console.log('   1. Verifică că NEXT_PUBLIC_SANITY_PROJECT_ID este corect')
      console.log('   2. Verifică că proiectul există în dashboard-ul Sanity')
    } else if (error.message.includes('Unauthorized')) {
      console.log('\n💡 Soluții:')
      console.log('   1. Verifică că SANITY_API_TOKEN este corect')
      console.log('   2. Verifică că token-ul are permisiuni Editor')
    }
  }
}

testSanityConfig()
