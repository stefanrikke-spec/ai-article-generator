'use client';

import { Language, LANGUAGES } from '@/lib/i18n';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function LanguageSwitcher({
  currentLanguage,
  onLanguageChange,
}: LanguageSwitcherProps) {
  return (
    <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
      {Object.entries(LANGUAGES).map(([lang, label]) => (
        <button
          key={lang}
          onClick={() => onLanguageChange(lang as Language)}
          style={{
            padding: '8px 16px',
            background: currentLanguage === lang ? '#000' : '#f0f0f0',
            color: currentLanguage === lang ? '#fff' : '#000',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: currentLanguage === lang ? 'bold' : 'normal',
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}