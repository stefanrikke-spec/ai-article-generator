export function buildPrompt(companyName: string, city: string, language: 'da' | 'en'): string {
  const isEnglish = language === 'en';
  
  if (isEnglish) {
    return buildEnglishPrompt(companyName, city);
  }
  return buildDanishPrompt(companyName, city);
}

function buildDanishPrompt(companyName: string, city: string): string {
  return `Du er en erfaren SEO-strateg og AI-konsulent.

Opret en differentiel SEO og GEO-optimeret blogartikel for en AI-rådgivningsvirksomhed, der målretter små danske virksomheder.

**Virksomhed:** ${companyName}
**Lokation:** ${city}

## Artikel krav:

**Struktur:**
- Stærk indledning, der adresserer smerter (mangel på tid, manglende viden, usikkerhed om lovlighed)
- Klare H2 og H3 overskrifter
- Definitionsektion tidligt i artiklen
- Praktisk trin-for-trin implementeringsvejledning
- Realistiske små virksomheds-eksempler
- Kort FAQ-sektion (3-5 spørgsmål)
- Konklusion med strategisk positionering

**Tone:**
- Professionel men tilgængelig
- Tillidsopbyggende (etos)
- Logisk og data-informeret (logos)
- Let emotionel tryghed (patos)
- Ikke hype-drevet

**Strategisk differentiering:**
- Betonning af tillid, etik og AI-ansvar
- Reference til reguleringsmæssig bevidsthed (AI Act tankegang)
- Fremhæv AI som værktøj, ikke erstatning
- Fokus på kompetenceudvikling

**Metadata (vigtig for SEO):**
- Foreslået meta-titel (maks 60 tegn)
- Foreslået meta-description (maks 155 tegn)
- Primært nøgleord
- Sekundære nøgleord
- Interne linkforslag
- CTA tilpasset rådgivning

**Format:**
- Markdown-struktur, som AI-modeller let kan citere
- Bruger ## for H2 og ### for H3
- Kod blokke hvor relevant
- Bold for vigtige begreber

**Output skal:**
1. Være søgemaskine-venligt
2. Være læsbart for generative modeller
3. Være direkte brugbart til CMS (WordPress, etc.)
4. Være 1500-2000 ord
5. Være lavet til danske SME'er, der mangler AI-viden`;
}

function buildEnglishPrompt(companyName: string, city: string): string {
  return `You are a senior SEO strategist and AI consultant.

Create a differentiated SEO and GEO optimized blog article for an AI consultancy targeting small Danish businesses.

**Company:** ${companyName}
**Location:** ${city}

## Article Requirements:

**Structure:**
- Strong hook addressing pain points (lack of time, lack of knowledge, uncertainty about legality)
- Clear H2 and H3 headings
- Definition section early in the article
- Practical step-by-step implementation guide
- Realistic small business examples
- Short FAQ section (3-5 questions)
- Conclusion with strategic positioning

**Tone:**
- Professional but accessible
- Trust-building (ethos)
- Logical and data-informed (logos)
- Light emotional reassurance (pathos)
- Not hype-driven

**Strategic Differentiation:**
- Emphasize trust, ethics and AI responsibility
- Reference regulatory awareness (AI Act mindset)
- Highlight AI as a tool, not replacement
- Focus on competence development

**Metadata (critical for SEO):**
- Suggested meta title (max 60 characters)
- Suggested meta description (max 155 characters)
- Primary keyword
- Secondary keywords
- Internal linking suggestions
- CTA tailored for consultancy

**Format:**
- Markdown structure that AI models can easily cite
- Use ## for H2 and ### for H3
- Code blocks where relevant
- Bold for important concepts

**Output should:**
1. Be search engine friendly
2. Be readable for generative AI models
3. Be directly usable in CMS (WordPress, etc.)
4. Be 1500-2000 words
5. Be tailored for Danish SMEs lacking AI knowledge`;
}