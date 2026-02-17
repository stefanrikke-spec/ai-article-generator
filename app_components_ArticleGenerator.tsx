'use client';

import { useState } from 'react';
import { Language, getTranslation } from '@/lib/i18n';
import { GenerateResponse, APIError } from '@/types';
import ResultDisplay from './ResultDisplay';

interface ArticleGeneratorProps {
  language: Language;
}

export default function ArticleGenerator({ language }: ArticleGeneratorProps) {
  const t = (key: string) => getTranslation(language, key);

  const [companyName, setCompanyName] = useState('');
  const [city, setCity] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function generateArticle() {
    // Reset state
    setError('');
    setResult('');

    // Validate
    if (!companyName.trim() || !city.trim()) {
      setError(t('emptyFieldsError'));
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: companyName.trim(),
          city: city.trim(),
          language,
        }),
      });

      const data: GenerateResponse | APIError = await res.json();

      if (!res.ok || 'error' in data) {
        setError(t('errorMessage'));
        console.error('API Error:', data);
        return;
      }

      if ('content' in data && data.success) {
        setResult(data.content);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError(t('errorMessage'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          {t('companyNameLabel')}
        </label>
        <input
          placeholder={t('companyNamePlaceholder')}
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            opacity: loading ? 0.6 : 1,
            cursor: loading ? 'not-allowed' : 'text',
          }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          {t('cityLabel')}
        </label>
        <input
          placeholder={t('cityPlaceholder')}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            opacity: loading ? 0.6 : 1,
            cursor: loading ? 'not-allowed' : 'text',
          }}
        />
      </div>

      {error && (
        <div
          style={{
            padding: '10px',
            marginBottom: '20px',
            backgroundColor: '#fee',
            color: '#c33',
            borderRadius: '4px',
            border: '1px solid #fcc',
          }}
        >
          <strong>{t('errorTitle')}:</strong> {error}
        </div>
      )}

      <button
        onClick={generateArticle}
        disabled={loading}
        style={{
          padding: '12px 24px',
          background: loading ? '#999' : '#000',
          color: '#fff',
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
          borderRadius: '4px',
          fontSize: '16px',
          fontWeight: 'bold',
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? t('generatingButton') : t('generateButton')}
      </button>

      {loading && (
        <div style={{ marginTop: '20px', color: '#666', fontStyle: 'italic' }}>
          {t('loadingMessage')}
        </div>
      )}

      {result && <ResultDisplay content={result} language={language} />}
    </div>
  );
}