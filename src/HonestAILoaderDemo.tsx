import React, { useState } from 'react';
import { HonestAILoader } from './components/HonestAILoader';
import type { LoaderType, TextTransition } from './components/HonestAILoader';

// Example of a custom dictionary with user-defined phrases
const customDict = {
  language: 'en',
  categories: [
    {
      category: 'custom1',
      values: ['Custom phrase one…', 'Elaborating the response…'],
    },
    {
      category: 'custom2',
      values: ['Almost ready…', 'One more moment…'],
    },
  ],
};

const customDictIt = {
  language: 'it',
  categories: [
    {
      category: 'custom1',
      values: ['Frase personalizzata uno…', 'Elaborando la risposta…'],
    },
    {
      category: 'custom2',
      values: ['Quasi pronto…', 'Un momento ancora…'],
    },
  ],
};

export default function HonestAILoaderDemo() {
  const [advancement, setAdvancement] = useState(0);
  const [loop, setLoop] = useState(true);
  const [type, setType] = useState<LoaderType>('circle');
  const [language, setLanguage] = useState<'en' | 'it'>('en');
  const [textTransition, setTextTransition] = useState<TextTransition>('fade');
  const [showGraphic, setShowGraphic] = useState(true);
  const [showText, setShowText] = useState(true);

  return (
    <div style={containerStyle}>
      <h1 style={{ margin: '0 0 1.5rem', fontSize: '1.5rem' }}>HonestAILoader Demo</h1>

      {/* ── Controls ── */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Controls</h2>
        <div style={controlsStyle}>
          <label style={labelStyle}>
            <input
              type="checkbox"
              checked={showGraphic}
              onChange={e => setShowGraphic(e.target.checked)}
            />{' '}
            Show graphic
          </label>

          <label style={labelStyle}>
            <input
              type="checkbox"
              checked={showText}
              onChange={e => setShowText(e.target.checked)}
            />{' '}
            Show text
          </label>

          <label style={labelStyle}>
            <input
              type="checkbox"
              checked={loop}
              onChange={e => setLoop(e.target.checked)}
            />{' '}
            Loop mode
          </label>

          {!loop && (
            <label style={labelStyle}>
              Advancement: {Math.round(advancement * 100)}%
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={advancement}
                onChange={e => setAdvancement(Number(e.target.value))}
                style={{ display: 'block', width: '100%', marginTop: '0.25rem' }}
              />
            </label>
          )}

          <label style={labelStyle}>
            Loader type:{' '}
            <select value={type} onChange={e => setType(e.target.value as LoaderType)}>
              <option value="circle">Circle</option>
              <option value="linear">Linear</option>
            </select>
          </label>

          <label style={labelStyle}>
            Language:{' '}
            <select value={language} onChange={e => setLanguage(e.target.value as 'en' | 'it')}>
              <option value="en">English</option>
              <option value="it">Italiano</option>
            </select>
          </label>

          <label style={labelStyle}>
            Text transition:{' '}
            <select
              value={textTransition}
              onChange={e => setTextTransition(e.target.value as TextTransition)}
            >
              <option value="fade">Fade</option>
              <option value="scroll">Scroll</option>
            </select>
          </label>
        </div>
      </section>

      {/* ── Preview ── */}
      <section style={previewStyle}>
        <HonestAILoader
          showGraphic={showGraphic}
          type={type}
          loop={loop}
          advancement={advancement}
          showText={showText}
          language={language}
          dictionaries={['dict1', 'dict2', 'dict3']}
          customDictionaries={[customDict, customDictIt]}
          dictionaryProbabilities={[0.2, 0.3, 0.5]}
          customDictionaryProbabilities={[0.4, 0.6]}
          textTime={1000}
          textTransition={textTransition}
          transitionTime={200}
        />
      </section>
    </div>
  );
}

// ── Inline styles (keeps the demo self-contained) ──────────────────────────────

const containerStyle: React.CSSProperties = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  padding: '2rem',
  maxWidth: '520px',
  margin: '0 auto',
  color: '#111827',
};

const sectionStyle: React.CSSProperties = {
  marginBottom: '2rem',
};

const headingStyle: React.CSSProperties = {
  fontSize: '1rem',
  fontWeight: 600,
  marginBottom: '0.75rem',
};

const controlsStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.9rem',
};

const previewStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '3rem 2rem',
  background: '#f9fafb',
  borderRadius: '12px',
  minHeight: '200px',
  border: '1px solid #e5e7eb',
};
