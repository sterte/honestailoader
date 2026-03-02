import React, { useState } from 'react';
import { HonestAILoader } from './components/HonestAILoader';
import { version } from '../package.json';
import type {
  BuiltInDictionaryKey,
  Dictionary,
  LoaderType,
  StyleOptions,
  TextPosition,
  TextTransition,
} from './components/HonestAILoader';

// ── Built-in dictionary metadata ─────────────────────────────────────────────

const BUILT_IN_KEYS: BuiltInDictionaryKey[] = [
  'environment', 'work', 'society', 'power', 'data', 'quotes', 'cinema',
];

// ── Types ─────────────────────────────────────────────────────────────────────

interface BuiltInEntry {
  enabled: boolean;
  weight: number;
}

interface CustomDictEntry {
  id: string;
  language: string;
  category: string;
  phrases: string[];
  enabled: boolean;
  weight: number;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function HonestAILoaderDemo() {
  // Language
  const [language, setLanguage] = useState('en');

  // Built-in dicts
  const [builtIn, setBuiltIn] = useState<Record<BuiltInDictionaryKey, BuiltInEntry>>(
    Object.fromEntries(BUILT_IN_KEYS.map(k => [k, { enabled: true, weight: 1 }])) as
      Record<BuiltInDictionaryKey, BuiltInEntry>,
  );

  // Custom dicts
  const [customDicts, setCustomDicts] = useState<CustomDictEntry[]>([]);

  // Builder form
  const [bldLang,     setBldLang]     = useState('it');
  const [bldCategory, setBldCategory] = useState('');
  const [bldPhrases,  setBldPhrases]  = useState('');
  const [copyDone,    setCopyDone]    = useState(false);
  const [codeCopied,  setCodeCopied]  = useState(false);

  // Graphic
  const [showGraphic,  setShowGraphic]  = useState(true);
  const [type,         setType]         = useState<LoaderType>('circle');
  const [loop,         setLoop]         = useState(true);
  const [advancement,  setAdvancement]  = useState(0);

  // Text
  const [showText,       setShowText]       = useState(true);
  const [textTransition, setTextTransition] = useState<TextTransition>('fade');
  const [textPosition,   setTextPosition]   = useState<TextPosition>('bottom');
  const [textTime,       setTextTime]       = useState(2000);
  const [transitionTime, setTransitionTime] = useState(300);

  // Style
  const [style, setStyle] = useState<StyleOptions>({
    primaryColor:   '#6366f1',
    secondaryColor: '#e5e7eb',
    size:           100,
    strokeWidth:    6,
    barHeight:      8,
    textColor:      '#374151',
    fontSize:       '0.9rem',
    fontWeight:     400,
    fontFamily:     '',
    letterSpacing:  '0em',
    lineHeight:     1.5,
  });

  const setS = <K extends keyof StyleOptions>(k: K, v: StyleOptions[K]) =>
    setStyle(prev => ({ ...prev, [k]: v }));

  // ── Derive HonestAILoader props ───────────────────────────────────────────

  const activeDicts = BUILT_IN_KEYS.filter(k => builtIn[k].enabled);
  const dictProbs   = activeDicts.map(k => builtIn[k].weight);

  const activeCustom  = customDicts.filter(d => d.enabled && d.phrases.length > 0);
  const customDictObjs: Dictionary[] = activeCustom.map(d => ({
    language: d.language,
    categories: [{ category: d.category, values: d.phrases }],
  }));
  const customProbs = activeCustom.map(d => d.weight);

  // ── Helpers ───────────────────────────────────────────────────────────────

  const setBuiltInField = (key: BuiltInDictionaryKey, field: keyof BuiltInEntry, value: boolean | number) =>
    setBuiltIn(prev => ({ ...prev, [key]: { ...prev[key], [field]: value } }));

  const setCustomField = (id: string, field: keyof CustomDictEntry, value: unknown) =>
    setCustomDicts(prev => prev.map(d => d.id === id ? { ...d, [field]: value } : d));

  const addCustomDict = () => {
    const phrases = bldPhrases.split('\n').map(s => s.trim()).filter(Boolean);
    if (!bldCategory.trim() || phrases.length === 0) return;
    setCustomDicts(prev => [...prev, {
      id: Math.random().toString(36).slice(2),
      language: bldLang,
      category: bldCategory.trim(),
      phrases,
      enabled: true,
      weight: 1,
    }]);
    setBldCategory('');
    setBldPhrases('');
  };

  const removeCustomDict = (id: string) =>
    setCustomDicts(prev => prev.filter(d => d.id !== id));

  const exportTS = () => {
    if (customDicts.length === 0) return;
    const lines = [
      `import { Dictionary } from './src/components/HonestAILoader';\n`,
      ...customDicts.map(d => {
        const varName = `${d.category.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${d.language}`;
        const vals = d.phrases.map(p => `        '${p.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}',`).join('\n');
        return `export const ${varName}: Dictionary = {\n  language: '${d.language}',\n  categories: [{\n    category: '${d.category}',\n    values: [\n${vals}\n    ],\n  }],\n};`;
      }),
    ];
    navigator.clipboard.writeText(lines.join('\n'));
    setCopyDone(true);
    setTimeout(() => setCopyDone(false), 2000);
  };

  // ── Code generation ───────────────────────────────────────────────────────

  const generateCode = (): string => {
    const props: string[] = [];

    if (!showGraphic)                  props.push('  showGraphic={false}');
    if (type !== 'circle')             props.push(`  type="${type}"`);
    if (!loop)                         props.push('  loop={false}');
    if (!loop && advancement !== 0)    props.push(`  advancement={${advancement}}`);
    if (!showText)                     props.push('  showText={false}');
    if (language !== 'en')             props.push(`  language="${language}"`);

    const defaultDicts: BuiltInDictionaryKey[] = ['environment'];
    if (JSON.stringify(activeDicts) !== JSON.stringify(defaultDicts))
      props.push(`  dictionaries={[${activeDicts.map(k => `'${k}'`).join(', ')}]}`);
    if (customDictObjs.length > 0)
      props.push('  customDictionaries={customDicts}');

    if (textTransition !== 'fade')     props.push(`  textTransition="${textTransition}"`);
    if (textPosition !== 'bottom')     props.push(`  textPosition="${textPosition}"`);
    if (textTime !== 3000)             props.push(`  textTime={${textTime}}`);
    if (transitionTime !== 300)        props.push(`  transitionTime={${transitionTime}}`);

    const styleDefaults: StyleOptions = {
      primaryColor: '#6366f1', secondaryColor: '#e5e7eb',
      size: 100, strokeWidth: 6, barHeight: 8,
      textColor: '#6b7280', fontSize: '0.9rem',
      fontWeight: 400, fontFamily: '', letterSpacing: '0em', lineHeight: 1.5,
    };
    const styleLines = (Object.entries(style) as [keyof StyleOptions, unknown][])
      .filter(([k, v]) => v !== '' && v !== undefined && v !== styleDefaults[k])
      .map(([k, v]) => typeof v === 'string' ? `    ${k}: '${v}',` : `    ${k}: ${v},`);
    if (styleLines.length > 0)
      props.push(`  styleOptions={{\n${styleLines.join('\n')}\n  }}`);

    const tag = props.length === 0
      ? '<HonestAILoader />'
      : `<HonestAILoader\n${props.join('\n')}\n/>`;

    return [
      `import { HonestAILoader } from 'honest-ai-loader';`,
      `import 'honest-ai-loader/style.css';`,
      '',
      tag,
    ].join('\n');
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generateCode());
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div style={pageStyle}>

      {/* ══ LEFT — Dictionary panel ══════════════════════════════════════════ */}
      <aside style={leftStyle}>

        {/* Language switcher */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <span style={sectionTitle}>HonestAILoader</span>
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            {(['it', 'en'] as const).map(lang => (
              <button key={lang} onClick={() => setLanguage(lang)} style={langBtn(language === lang)}>
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Built-in dictionaries */}
        <p style={sectionLabel}>Built-in dictionaries</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1.25rem' }}>
          {BUILT_IN_KEYS.map(key => (
            <div key={key} style={dictRowStyle}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={builtIn[key].enabled}
                  onChange={e => setBuiltInField(key, 'enabled', e.target.checked)}
                />
                <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: builtIn[key].enabled ? '#111827' : '#9ca3af' }}>
                  {key}
                </span>
              </label>
              <input
                type="range" min={0} max={5} step={0.1}
                value={builtIn[key].weight}
                disabled={!builtIn[key].enabled}
                onChange={e => setBuiltInField(key, 'weight', Number(e.target.value))}
                style={{ width: 80, opacity: builtIn[key].enabled ? 1 : 0.3 }}
              />
              <span style={weightBadge}>{builtIn[key].weight.toFixed(1)}</span>
            </div>
          ))}
        </div>

        {/* Custom dict builder */}
        <p style={sectionLabel}>Custom dictionary</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <select value={bldLang} onChange={e => setBldLang(e.target.value)} style={{ ...inputStyle, flex: 0 }}>
              <option value="it">IT</option>
              <option value="en">EN</option>
            </select>
            <input
              type="text"
              placeholder="category name"
              value={bldCategory}
              onChange={e => setBldCategory(e.target.value)}
              style={{ ...inputStyle, flex: 1 }}
            />
          </div>
          <textarea
            placeholder={'one phrase per line...\nFrase uno...\nFrase due...'}
            value={bldPhrases}
            onChange={e => setBldPhrases(e.target.value)}
            rows={5}
            style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace', fontSize: '0.75rem' }}
          />
          <button onClick={addCustomDict} style={addBtnStyle} disabled={!bldCategory.trim() || !bldPhrases.trim()}>
            + Add dictionary
          </button>
        </div>

        {/* Custom dict list */}
        {customDicts.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '0.75rem' }}>
            {customDicts.map(d => (
              <div key={d.id} style={dictRowStyle}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, cursor: 'pointer', minWidth: 0 }}>
                  <input
                    type="checkbox"
                    checked={d.enabled}
                    onChange={e => setCustomField(d.id, 'enabled', e.target.checked)}
                  />
                  <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: d.enabled ? '#111827' : '#9ca3af', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {d.category}
                  </span>
                  <span style={{ fontSize: '0.65rem', color: '#fff', background: '#6366f1', borderRadius: 4, padding: '1px 5px', flexShrink: 0 }}>
                    {d.language}
                  </span>
                  <span style={{ fontSize: '0.65rem', color: '#6b7280', flexShrink: 0 }}>{d.phrases.length} phrases</span>
                </label>
                <input
                  type="range" min={0} max={5} step={0.1}
                  value={d.weight}
                  disabled={!d.enabled}
                  onChange={e => setCustomField(d.id, 'weight', Number(e.target.value))}
                  style={{ width: 60, opacity: d.enabled ? 1 : 0.3 }}
                />
                <span style={weightBadge}>{d.weight.toFixed(1)}</span>
                <button onClick={() => removeCustomDict(d.id)} style={deleteBtnStyle}>✕</button>
              </div>
            ))}
          </div>
        )}

        {customDicts.length > 0 && (
          <button onClick={exportTS} style={exportBtnStyle}>
            {copyDone ? '✓ Copied!' : '⬇ Copy as TypeScript'}
          </button>
        )}
      </aside>

      {/* ══ MIDDLE — Controls ════════════════════════════════════════════════ */}
      <div style={controlsColStyle}>

        <fieldset style={fieldsetStyle}>
          <legend style={legendStyle}>Graphic</legend>
          <FRow label="showGraphic"><Toggle value={showGraphic} onChange={setShowGraphic} /></FRow>
          <FRow label="type">
            <select style={selStyle} value={type} onChange={e => setType(e.target.value as LoaderType)}>
              <option value="circle">circle</option>
              <option value="linear">linear</option>
            </select>
          </FRow>
          <FRow label="loop"><Toggle value={loop} onChange={setLoop} /></FRow>
          {!loop && (
            <FRow label="advancement">
              <Slider min={0} max={1} step={0.01} value={advancement} onChange={setAdvancement}
                display={`${Math.round(advancement * 100)}%`} />
            </FRow>
          )}
        </fieldset>

        <fieldset style={fieldsetStyle}>
          <legend style={legendStyle}>Text</legend>
          <FRow label="showText"><Toggle value={showText} onChange={setShowText} /></FRow>
          <FRow label="textTransition">
            <select style={selStyle} value={textTransition} onChange={e => setTextTransition(e.target.value as TextTransition)}>
              <option value="fade">fade</option>
              <option value="scroll">scroll</option>
            </select>
          </FRow>
          <FRow label="textPosition">
            <select style={selStyle} value={textPosition} onChange={e => setTextPosition(e.target.value as TextPosition)}>
              {['top','bottom','left','right','over','under'].map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </FRow>
          <FRow label="textTime">
            <Slider min={500} max={6000} step={100} value={textTime} onChange={setTextTime} display={`${textTime}ms`} />
          </FRow>
          <FRow label="transitionTime">
            <Slider min={50} max={1000} step={50} value={transitionTime} onChange={setTransitionTime} display={`${transitionTime}ms`} />
          </FRow>
        </fieldset>

        <fieldset style={fieldsetStyle}>
          <legend style={legendStyle}>Style</legend>
          <FRow label="primaryColor"><input type="color" value={style.primaryColor} onChange={e => setS('primaryColor', e.target.value)} /></FRow>
          <FRow label="secondaryColor"><input type="color" value={style.secondaryColor} onChange={e => setS('secondaryColor', e.target.value)} /></FRow>
          <FRow label="size"><Slider min={40} max={300} step={4} value={style.size!} onChange={v => setS('size', v)} display={`${style.size}px`} /></FRow>
          {type === 'circle' && <FRow label="strokeWidth"><Slider min={1} max={20} step={1} value={style.strokeWidth!} onChange={v => setS('strokeWidth', v)} display={`${style.strokeWidth}px`} /></FRow>}
          {type === 'linear' && <FRow label="barHeight"><Slider min={2} max={32} step={1} value={style.barHeight!} onChange={v => setS('barHeight', v)} display={`${style.barHeight}px`} /></FRow>}
          <FRow label="textColor"><input type="color" value={style.textColor} onChange={e => setS('textColor', e.target.value)} /></FRow>
          <FRow label="fontSize">
            <Slider min={10} max={24} step={0.5} value={parseFloat(style.fontSize ?? '14')}
              onChange={v => setS('fontSize', `${v}px`)} display={style.fontSize!} />
          </FRow>
          <FRow label="fontWeight">
            <select style={selStyle} value={String(style.fontWeight)} onChange={e => setS('fontWeight', Number(e.target.value))}>
              {[100,200,300,400,500,600,700,800,900].map(w => <option key={w} value={w}>{w}</option>)}
            </select>
          </FRow>
          <FRow label="fontFamily">
            <select style={{ ...selStyle, maxWidth: 120 }} value={style.fontFamily} onChange={e => setS('fontFamily', e.target.value)}>
              <option value="">inherit</option>
              <option value="monospace">monospace</option>
              <option value="Georgia, serif">serif</option>
              <option value="system-ui, sans-serif">system-ui</option>
              <option value="'Courier New', monospace">Courier New</option>
            </select>
          </FRow>
          <FRow label="letterSpacing">
            <Slider min={-2} max={10} step={0.5} value={parseFloat(style.letterSpacing ?? '0')}
              onChange={v => setS('letterSpacing', `${v}px`)} display={style.letterSpacing!} />
          </FRow>
          <FRow label="lineHeight">
            <Slider min={1} max={3} step={0.1} value={Number(style.lineHeight)}
              onChange={v => setS('lineHeight', v)} display={Number(style.lineHeight).toFixed(1)} />
          </FRow>
        </fieldset>

      </div>

      {/* ══ RIGHT — Preview (top) + Code (bottom) ════════════════════════════ */}
      <div style={rightColStyle}>

        {/* Preview */}
        <div style={previewStyle}>
          <HonestAILoader
            showGraphic={showGraphic}
            type={type}
            loop={loop}
            advancement={advancement}
            showText={showText}
            language={language}
            dictionaries={activeDicts}
            customDictionaries={customDictObjs.length ? customDictObjs : undefined}
            dictionaryProbabilities={dictProbs}
            customDictionaryProbabilities={customProbs.length ? customProbs : undefined}
            textTime={textTime}
            textTransition={textTransition}
            transitionTime={transitionTime}
            textPosition={textPosition}
            styleOptions={style}
          />
        </div>

        {/* Generated code */}
        <div style={codePanelStyle}>
          <div style={codeHeaderStyle}>
            <span style={legendStyle}>Generated code</span>
            <button onClick={copyCode} style={copyCodeBtnStyle}>
              {codeCopied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
          <pre style={codeStyle}>{generateCode()}</pre>
        </div>

      </div>

      {/* ══ FOOTER ═══════════════════════════════════════════════════════════ */}
      <footer style={footerStyle}>
        <span>v{version}</span>
        <span style={{ color: '#d1d5db' }}>·</span>
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          style={footerLinkStyle}
        >
          CC BY 4.0
        </a>
        <span style={{ color: '#d1d5db' }}>·</span>
        <a
          href="https://github.com/sterte/honestailoader"
          target="_blank"
          rel="noopener noreferrer"
          style={footerLinkStyle}
        >
          GitHub
        </a>
        <span style={{ color: '#d1d5db' }}>·</span>
        <a
          href="https://www.npmjs.com/package/honest-ai-loader"
          target="_blank"
          rel="noopener noreferrer"
          style={footerLinkStyle}
        >
          npm
        </a>
      </footer>
    </div>
  );
}

// ── Small reusable sub-components ─────────────────────────────────────────────

function FRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, minHeight: 26 }}>
      <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#374151', flexShrink: 0 }}>{label}</span>
      {children}
    </div>
  );
}

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return <input type="checkbox" checked={value} onChange={e => onChange(e.target.checked)} />;
}

function Slider({ min, max, step, value, onChange, display }: {
  min: number; max: number; step: number; value: number;
  onChange: (v: number) => void; display: string;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: 80, cursor: 'pointer' }} />
      <span style={{ fontSize: '0.7rem', color: '#6b7280', minWidth: 44, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
        {display}
      </span>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const pageStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '300px 240px 1fr',
  gridTemplateRows: '1fr auto',
  height: '100vh',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontSize: '0.875rem',
  color: '#111827',
  overflow: 'hidden',
};

const leftStyle: React.CSSProperties = {
  borderRight: '1px solid #e5e7eb',
  padding: '1.25rem',
  overflowY: 'auto',
  background: '#fafafa',
};

const controlsColStyle: React.CSSProperties = {
  borderRight: '1px solid #e5e7eb',
  padding: '1.25rem',
  overflowY: 'auto',
  background: '#fafafa',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
};

const rightColStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
};

const previewStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#f9fafb',
  borderBottom: '1px solid #e5e7eb',
  padding: '2rem',
};

const codePanelStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
};

const codeHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0.5rem 0.75rem',
  borderBottom: '1px solid #e5e7eb',
  background: '#f9fafb',
  flexShrink: 0,
};

const fieldsetStyle: React.CSSProperties = {
  border: '1px solid #e5e7eb',
  borderRadius: 8,
  padding: '0.6rem 0.75rem',
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.3rem',
};

const legendStyle: React.CSSProperties = {
  fontSize: '0.7rem',
  fontWeight: 600,
  color: '#6b7280',
  padding: '0 4px',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const sectionTitle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: '1rem',
};

const sectionLabel: React.CSSProperties = {
  fontSize: '0.7rem',
  fontWeight: 600,
  color: '#6b7280',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  margin: '0 0 0.4rem',
};

const dictRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  padding: '0.2rem 0.4rem',
  borderRadius: 6,
  background: '#fff',
  border: '1px solid #e5e7eb',
};

const weightBadge: React.CSSProperties = {
  fontSize: '0.7rem',
  color: '#6b7280',
  minWidth: 26,
  textAlign: 'right',
  fontVariantNumeric: 'tabular-nums',
};

const inputStyle: React.CSSProperties = {
  fontSize: '0.8rem',
  padding: '4px 8px',
  borderRadius: 6,
  border: '1px solid #d1d5db',
  background: '#fff',
  width: '100%',
  boxSizing: 'border-box',
};

const selStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  padding: '2px 4px',
  borderRadius: 4,
  border: '1px solid #d1d5db',
  background: '#fff',
};

const addBtnStyle: React.CSSProperties = {
  padding: '0.35rem 0.75rem',
  borderRadius: 6,
  border: '1px solid #6366f1',
  background: '#6366f1',
  color: '#fff',
  fontSize: '0.8rem',
  cursor: 'pointer',
  fontWeight: 500,
};

const deleteBtnStyle: React.CSSProperties = {
  padding: '0 6px',
  borderRadius: 4,
  border: '1px solid #fca5a5',
  background: '#fff',
  color: '#ef4444',
  fontSize: '0.7rem',
  cursor: 'pointer',
  flexShrink: 0,
};

const exportBtnStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.4rem',
  borderRadius: 6,
  border: '1px solid #d1d5db',
  background: '#fff',
  color: '#374151',
  fontSize: '0.78rem',
  cursor: 'pointer',
  textAlign: 'center',
};

const codeStyle: React.CSSProperties = {
  flex: 1,
  margin: 0,
  fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
  fontSize: '0.75rem',
  lineHeight: 1.6,
  color: '#374151',
  background: '#fff',
  padding: '0.75rem',
  overflow: 'auto',
  whiteSpace: 'pre',
};

const copyCodeBtnStyle: React.CSSProperties = {
  padding: '0.2rem 0.6rem',
  borderRadius: 4,
  border: '1px solid #d1d5db',
  background: '#fff',
  color: '#374151',
  fontSize: '0.7rem',
  cursor: 'pointer',
};

const footerStyle: React.CSSProperties = {
  gridColumn: '1 / -1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.6rem',
  padding: '0.5rem 1rem',
  borderTop: '1px solid #e5e7eb',
  fontSize: '0.72rem',
  color: '#9ca3af',
  background: '#fafafa',
};

const footerLinkStyle: React.CSSProperties = {
  color: '#9ca3af',
  textDecoration: 'none',
};

const langBtn = (active: boolean): React.CSSProperties => ({
  padding: '0.25rem 0.6rem',
  borderRadius: 6,
  border: '1px solid',
  borderColor: active ? '#6366f1' : '#d1d5db',
  background: active ? '#6366f1' : '#fff',
  color: active ? '#fff' : '#374151',
  fontWeight: active ? 600 : 400,
  fontSize: '0.75rem',
  cursor: 'pointer',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
});
