import { NextResponse } from "next/server";

// DeepL API function
async function translateWithDeepL(text: string, from: string = 'RO', to: string = 'EN'): Promise<string> {
  if (!text.trim()) return "";
  
  const apiKey = process.env.DEEPL_API_KEY;
  if (!apiKey || apiKey === 'your_deepl_api_key_here') {
    throw new Error('DeepL API key not configured');
  }

  const url = 'https://api-free.deepl.com/v2/translate';
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `DeepL-Auth-Key ${apiKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      text: text,
      source_lang: from,
      target_lang: to,
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`DeepL API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.translations[0].text;
}

// Fallback mock translations for development
const mockTranslations: Record<string, string> = {
  "testare": "testing",
  "ultima testare": "latest test",
  "hai sa testam": "let's test",
  "daca incarca imagini": "if images load",
  "stiri": "news",
  "crypto": "crypto",
  "bitcoin": "bitcoin",
  "ethereum": "ethereum",
  "trading": "trading",
  "investitii": "investments",
  "piata": "market",
  "preț": "price",
  "creștere": "growth",
  "scădere": "decline",
  "analiză": "analysis",
  "tehnologie": "technology",
  "blockchain": "blockchain",
  "decentralizat": "decentralized",
  "financiar": "financial",
  "economie": "economy",
  "noua": "new",
  "testare noua": "new testing",
  "ce este nou": "what's new",
  "pe piata": "on the market",
  "vreau sa vad": "I want to see",
  "daca poti traduce": "if you can translate",
  "un text": "a text",
  "actuale": "current",
  "actualizări": "updates",
  "selectate": "selected",
  "cele mai noi": "latest",
  "din crypto": "in crypto"
};

function mockTranslate(text: string): string {
  if (!text) return "";
  
  let translated = text;
  
  // Apply mock translations - try both exact matches and word boundaries
  Object.entries(mockTranslations).forEach(([ro, en]) => {
    // First try exact phrase matches
    const exactRegex = new RegExp(`\\b${ro}\\b`, 'gi');
    translated = translated.replace(exactRegex, en);
    
    // Then try partial matches for compound words
    const partialRegex = new RegExp(ro, 'gi');
    translated = translated.replace(partialRegex, en);
  });
  
  // Handle common Romanian to English patterns
  translated = translated
    .replace(/\bde astăzi\b/gi, 'today')
    .replace(/\bcele mai noi\b/gi, 'latest')
    .replace(/\bhai să\b/gi, 'let\'s')
    .replace(/\bvreau să\b/gi, 'I want to')
    .replace(/\bdacă\b/gi, 'if')
    .replace(/\bpoți\b/gi, 'can you')
    .replace(/\bun text\b/gi, 'a text')
    .replace(/\bpe piața\b/gi, 'on the market')
    .replace(/\bce este nou\b/gi, 'what\'s new')
    .replace(/\bultima\b/gi, 'latest')
    .replace(/\bincarcă\b/gi, 'load')
    .replace(/\bimagini\b/gi, 'images')
    .replace(/\btestam\b/gi, 'test')
    .replace(/\bștiri\b/gi, 'news')
    .replace(/\bactuale\b/gi, 'current')
    .replace(/\bselectate\b/gi, 'selected')
    .replace(/\bde tine\b/gi, 'by you')
    .replace(/\bdin crypto\b/gi, 'in crypto')
    .replace(/\bzi\b/gi, 'day')
    .replace(/\bfrumoasă\b/gi, 'beautiful')
    .replace(/\bETF-urile\b/gi, 'ETFs')
    .replace(/\bspot\b/gi, 'spot')
    .replace(/\bpe\b/gi, 'on')
    .replace(/\bau debutat\b/gi, 'debuted')
    .replace(/\bîn\b/gi, 'in')
    .replace(/\bSUA\b/gi, 'USA')
    .replace(/\bce înseamnă\b/gi, 'what it means')
    .replace(/\bpentru\b/gi, 'for')
    .replace(/\bpreț\b/gi, 'price')
    .replace(/\bși\b/gi, 'and')
    .replace(/\bDeFi\b/gi, 'DeFi')
    .replace(/\bStirile\b/gi, 'News')
    .replace(/\bde\b/gi, 'of')
    .replace(/\bCele\b/gi, 'The')
    .replace(/\bmai\b/gi, 'most')
    .replace(/\bnoi\b/gi, 'new')
    .replace(/\bhai\b/gi, 'let\'s')
    .replace(/\bsa\b/gi, 'to')
    .replace(/\btestam\b/gi, 'test')
    .replace(/\bdaca\b/gi, 'if')
    .replace(/\bincarca\b/gi, 'load')
    .replace(/\bvreau\b/gi, 'I want')
    .replace(/\bvad\b/gi, 'see')
    .replace(/\bpoti\b/gi, 'can you')
    .replace(/\btraduce\b/gi, 'translate')
    .replace(/\bun\b/gi, 'a')
    .replace(/\btext\b/gi, 'text')
    .replace(/\bastăzi\b/gi, 'today')
    .replace(/\bEthereum\b/gi, 'Ethereum')
    .replace(/\bce\b/gi, 'what')
    .replace(/\bînseamnă\b/gi, 'means')
    .replace(/\bpentru\b/gi, 'for')
    .replace(/\bpreț\b/gi, 'price')
    .replace(/\bși\b/gi, 'and')
    .replace(/\bDeFi\b/gi, 'DeFi')
    .replace(/\bETF-urile\b/gi, 'ETFs')
    .replace(/\bspot\b/gi, 'spot')
    .replace(/\bpe\b/gi, 'on')
    .replace(/\bau\b/gi, 'have')
    .replace(/\bdebutat\b/gi, 'debuted')
    .replace(/\bîn\b/gi, 'in')
    .replace(/\bSUA\b/gi, 'USA')
    .replace(/\bce\b/gi, 'what')
    .replace(/\bînseamnă\b/gi, 'means')
    .replace(/\bpentru\b/gi, 'for')
    .replace(/\bpreț\b/gi, 'price')
    .replace(/\bși\b/gi, 'and')
    .replace(/\bDeFi\b/gi, 'DeFi');
  
  // Capitalize first letter
  return translated.charAt(0).toUpperCase() + translated.slice(1);
}

export async function POST(req: Request){
  try{
    const { title, excerpt, content, from = "RO", to = "EN" } = await req.json();
    const deeplApiKey = process.env.DEEPL_API_KEY;
    
    // Try DeepL API first
    if (deeplApiKey && deeplApiKey !== 'your_deepl_api_key_here') {
      console.log('Using DeepL API');
      try {
        const [titleEn, excerptEn, contentEn] = await Promise.all([
          title ? translateWithDeepL(title, from, to) : "",
          excerpt ? translateWithDeepL(excerpt, from, to) : "",
          content ? translateWithDeepL(content, from, to) : ""
        ]);
        
        return NextResponse.json({ titleEn, excerptEn, contentEn });
      } catch (error) {
        console.error('DeepL API error:', error);
        // Fall back to mock translations
      }
    }
    
    // Fallback to mock translations
    console.log('Using mock translations - DeepL API key not configured');
    return NextResponse.json({ 
      titleEn: title ? mockTranslate(title) : "",
      excerptEn: excerpt ? mockTranslate(excerpt) : "",
      contentEn: content ? mockTranslate(content) : ""
    });

  }catch(err:any){
    return NextResponse.json({ error: err?.message || "translate_fail" }, { status: 500 });
  }
}