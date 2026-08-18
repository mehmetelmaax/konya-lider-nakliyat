import { SITE } from '@/lib/site-config';

export function GET() {
  const content = `# ROBOTS.TXT YAPILANDIRMASI
# 
# KRİTİK KARAR GEREKÇELERİ:
# 1. Google-Extended: AI cevaplarında kaynak gösterilmek için izin verilmiştir.
# 2. ClaudeBot: Anthropic yapay zeka entegrasyonu için izin verilmiştir.
# 3. CCBot (Common Crawl): Ticari değeri olmayan kazıma işlemlerini engellemek için engellenmiştir.
# 4. Ahrefs/Semrush/MJ12bot: Aşırı kaynak tüketimini önlemek için tarama gecikmesi (Crawl-delay) eklenmiştir.

User-agent: *
Allow: /
Disallow: /api/
Allow: /_next/static/
Disallow: /_next/
Disallow: /*.json$
Disallow: /admin/

User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: YandexBot
Allow: /

User-agent: CCBot
Disallow: /

User-agent: AhrefsBot
Crawl-delay: 10

User-agent: SemrushBot
Crawl-delay: 10

User-agent: MJ12bot
Crawl-delay: 10

Host: ${SITE.url}
Sitemap: ${SITE.url}/sitemap.xml

# AI Agent Context Reference
# llms.txt: ${SITE.url}/llms.txt
# llms-full.txt: ${SITE.url}/llms-full.txt
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
