export type Language = 'da' | 'en';

export const LANGUAGES = {
  da: 'Dansk',
  en: 'English',
} as const;

export const translations: Record<Language, Record<string, string>> = {
  da: {
    title: 'AI Artikel Generator',
    subtitle: 'Generer SEO & GEO optimerede artikler for AI-konsulenter',
    companyNameLabel: 'Virksomhedsnavn',
    companyNamePlaceholder: 'f.eks. TechConsult Danmark',
    cityLabel: 'By',
    cityPlaceholder: 'f.eks. København',
    generateButton: 'Generer Artikel',
    generatingButton: 'Genererer...',
    copyButton: 'Kopier Tekst',
    downloadButton: 'Download Markdown',
    copySuccess: 'Tekst kopieret til udklipsholder!',
    copyError: 'Kunne ikke kopiere tekst',
    errorTitle: 'Fejl ved generering',
    errorMessage: 'Der opstod en fejl. Prøv igen senere.',
    emptyFieldsError: 'Udfyld både virksomhedsnavn og by',
    language: 'Sprog',
    validationError: 'Valideringsfejl',
    retryButton: 'Prøv igen',
    loadingMessage: 'Genererer artikel med AI...',
  },
  en: {
    title: 'AI Article Generator',
    subtitle: 'Generate SEO & GEO optimized articles for AI consultancies',
    companyNameLabel: 'Company Name',
    companyNamePlaceholder: 'e.g., TechConsult Denmark',
    cityLabel: 'City',
    cityPlaceholder: 'e.g., Copenhagen',
    generateButton: 'Generate Article',
    generatingButton: 'Generating...',
    copyButton: 'Copy Text',
    downloadButton: 'Download Markdown',
    copySuccess: 'Text copied to clipboard!',
    copyError: 'Failed to copy text',
    errorTitle: 'Generation Error',
    errorMessage: 'An error occurred. Please try again later.',
    emptyFieldsError: 'Please fill in both company name and city',
    language: 'Language',
    validationError: 'Validation Error',
    retryButton: 'Try Again',
    loadingMessage: 'Generating article with AI...',
  },
};

export function getTranslation(lang: Language, key: string): string {
  return translations[lang]?.[key] || key;
}