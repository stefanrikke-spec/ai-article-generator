'use client';

import { useState } from 'react';
import { Language, getTranslation } from '@/lib/i18n';

interface ResultDisplayProps {
  content: string;
  language: Language;
}

export default function ResultDisplay({ content, language }: ResultDisplayProps) {
  const t = (key: string) => getTranslation(language, key);
  const [copyFeedback, setCopyFeedback] = useState('');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopyFeedback(t('copySuccess'));
      setTimeout(() => setCopyFeedback(''), 2000);
    } catch {
      setCopyFeedback(t('copyError'));
      setTimeout(() => setCopyFeedback(''), 2000);
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `article-${new Date().getTime()}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div style={{ marginTop: '40px' }}>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button
          onClick={handleCopy}
          style={{
            padding: '8px 16px',
            background: '#0066cc',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px',
            fontSize: '14px',
          }}
        >
          {t('copyButton')}
        </button>
        <button
          onClick={handleDownload}
          style={{
            padding: '8px 16px',
            background: '#006600',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px',
            fontSize: '14px',
          }}
        >
          {t('downloadButton')}
        </button>
        {copyFeedback && <span style={{ color: '#0066cc', alignSelf: 'center' }}>{copyFeedback}</span>}
      </div>

      <div
        style={{
          background: '#f9f9f9',
          padding: '20px',
          borderRadius: '4px',
          border: '1px solid #eee',
          maxHeight: '600px',
          overflowY: 'auto',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          fontFamily: 'monospace',
          fontSize: '13px',
          lineHeight: '1.5',
        }}
      >
        {content}
      </div>
    </div>
  );
}