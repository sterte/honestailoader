import React, { useState } from 'react';
import { HonestAILoader } from './components/HonestAILoader';
import type { BuiltInDictionaryKey, Dictionary, LoaderType, StyleOptions, TextPosition, TextTransition } from './components/HonestAILoader';

// ── Custom dictionaries (fixed content, togglable from the UI) ──────────────────

const customDictEn: Dictionary = {
  language: 'en',
  categories: [
    { category: 'custom1', values: ['Custom phrase one…', 'Elaborating the response…'] },
    { category: 'custom2', values: ['Almost ready…', 'One more moment…'] },
  ],
};

const customDictIt: Dictionary = {
  language: 'it',
  categories: [
    { category: 'custom1', values: ['Frase personalizzata uno…', 'Elaborando la risposta…'] },
    { category: 'custom2', values: ['Quasi pronto…', 'Un momento ancora…'] },
  ],
};

// ── Types ────────────────────────────────────────────────────────────────────────

type BuiltInState = Record<BuiltInDictionaryKey, { enabled: boolean; weight: number }>;
type CustomState  = { dict: Dictionary; label: string; enabled: boolean; weight: number }[];

// ── Component ────────────────────────────────────────────────────────────────────

export default function HonestAILoaderDemo() {
  // Graphic
  const [showGraphic, setShowGraphic]     = useState(true);
  const [type, setType]                   = useState<LoaderType>('circle');
  const [loop, setLoop]                   = useState(true);
  const [advancement, setAdvancement]     = useState(0);

  // Text
  const [showText, setShowText]           = useState(true);
  const [language, setLanguage]           = useState('en');
  const [textTransition, setTextTransition] = useState<TextTransition>('fade');
  const [textPosition, setTextPosition]   = useState<TextPosition>('bottom');
  const [textTime, setTextTime]           = useState(2000);
  const [transitionTime, setTransitionTime] = useState(300);

  // Style
  const [styleOptions, setStyleOptions] = useState<StyleOptions>({
    primaryColor:   '#6366f1',
    secondaryColor: '#e5e7eb',
    size:           100,
    strokeWidth:    6,
    barHeight:      8,
    textColor:      '#6b7280',
    fontSize:       '0.9rem',
    fontWeight:     400,
    fontFamily:     '',
    letterSpacing:  '0em',
    lineHeight:     1.5,
  });

  const setStyle = <K extends keyof StyleOptions>(key: K, value: StyleOptions[K]) =>
    setStyleOptions(prev => ({ ...prev, [key]: value }));

  // Dictionaries
  const [builtIn, setBuiltIn] = useState<BuiltInState>({
    dict1: { enabled: true,  weight: 1 },
    dict2: { enabled: true,  weight: 1 },
    dict3: { enabled: false, weight: 1 },
  });

  const [custom, setCustom] = useState<CustomState>([
    { dict: customDictEn, label: 'Custom EN', enabled: false, weight: 1 },
    { dict: customDictIt, label: 'Custom IT', enabled: false, weight: 1 },
  ]);

  // ── Derive props ───────────────────────────────────────────────────────────────

  const activeDicts = (Object.keys(builtIn) as BuiltInDictionaryKey[]).filter(
    k => builtIn[k].enabled,
  );
  const dictProbabilities = activeDicts.map(k => builtIn[k].weight);

  const activeCustom    = custom.filter(c => c.enabled);
  const customDicts     = activeCustom.map(c => c.dict);
  const customProbs     = activeCustom.map(c => c.weight);

  // ── Helpers ────────────────────────────────────────────────────────────────────

  const setBuiltInField = (
    key: BuiltInDictionaryKey,
    field: 'enabled' | 'weight',
    value: boolean | number,
  ) =>
    setBuiltIn(prev => ({ ...prev, [key]: { ...prev[key], [field]: value } }));

  const setCustomField = (
    idx: number,
    field: 'enabled' | 'weight',
    value: boolean | number,
  ) =>
    setCustom(prev =>
      prev.map((c, i) => (i === idx ? { ...c, [field]: value } : c)),
    );

  // ── Render ─────────────────────────────────────────────────────────────────────

  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}>HonestAILoader — Demo</h1>

      <div style={layoutStyle}>

        {/* ── Left: controls ── */}
        <div style={panelStyle}>

          {/* Graphic */}
          <fieldset style={fieldsetStyle}>
            <legend style={legendStyle}>Graphic</legend>

            <Row>
              <CheckControl
                label="showGraphic"
                checked={showGraphic}
                onChange={setShowGraphic}
              />
            </Row>

            <Row>
              <label style={labelStyle}>type</label>
              <select
                style={selectStyle}
                value={type}
                onChange={e => setType(e.target.value as LoaderType)}
              >
                <option value="circle">circle</option>
                <option value="linear">linear</option>
              </select>
            </Row>

            <Row>
              <CheckControl label="loop" checked={loop} onChange={setLoop} />
            </Row>

            {!loop && (
              <Row>
                <label style={labelStyle}>advancement</label>
                <div style={sliderWrap}>
                  <input
                    type="range" min={0} max={1} step={0.01}
                    value={advancement}
                    onChange={e => setAdvancement(Number(e.target.value))}
                    style={rangeStyle}
                  />
                  <span style={valueStyle}>{Math.round(advancement * 100)}%</span>
                </div>
              </Row>
            )}
          </fieldset>

          {/* Text */}
          <fieldset style={fieldsetStyle}>
            <legend style={legendStyle}>Text</legend>

            <Row>
              <CheckControl label="showText" checked={showText} onChange={setShowText} />
            </Row>

            <Row>
              <label style={labelStyle}>language</label>
              <select
                style={selectStyle}
                value={language}
                onChange={e => setLanguage(e.target.value)}
              >
                <option value="en">en</option>
                <option value="it">it</option>
              </select>
            </Row>

            <Row>
              <label style={labelStyle}>textTransition</label>
              <select
                style={selectStyle}
                value={textTransition}
                onChange={e => setTextTransition(e.target.value as TextTransition)}
              >
                <option value="fade">fade</option>
                <option value="scroll">scroll</option>
              </select>
            </Row>

            <Row>
              <label style={labelStyle}>textPosition</label>
              <select
                style={selectStyle}
                value={textPosition}
                onChange={e => setTextPosition(e.target.value as TextPosition)}
              >
                <option value="top">top</option>
                <option value="bottom">bottom</option>
                <option value="left">left</option>
                <option value="right">right</option>
                <option value="over">over</option>
                <option value="under">under</option>
              </select>
            </Row>

            <Row>
              <label style={labelStyle}>textTime</label>
              <div style={sliderWrap}>
                <input
                  type="range" min={500} max={6000} step={100}
                  value={textTime}
                  onChange={e => setTextTime(Number(e.target.value))}
                  style={rangeStyle}
                />
                <span style={valueStyle}>{textTime} ms</span>
              </div>
            </Row>

            <Row>
              <label style={labelStyle}>transitionTime</label>
              <div style={sliderWrap}>
                <input
                  type="range" min={50} max={1000} step={50}
                  value={transitionTime}
                  onChange={e => setTransitionTime(Number(e.target.value))}
                  style={rangeStyle}
                />
                <span style={valueStyle}>{transitionTime} ms</span>
              </div>
            </Row>
          </fieldset>

          {/* Style options */}
          <fieldset style={fieldsetStyle}>
            <legend style={legendStyle}>styleOptions</legend>

            <Row>
              <label style={labelStyle}>primaryColor</label>
              <input type="color" value={styleOptions.primaryColor}
                onChange={e => setStyle('primaryColor', e.target.value)} />
            </Row>

            <Row>
              <label style={labelStyle}>secondaryColor</label>
              <input type="color" value={styleOptions.secondaryColor}
                onChange={e => setStyle('secondaryColor', e.target.value)} />
            </Row>

            <Row>
              <label style={labelStyle}>size</label>
              <div style={sliderWrap}>
                <input type="range" min={40} max={300} step={4}
                  value={styleOptions.size}
                  onChange={e => setStyle('size', Number(e.target.value))}
                  style={rangeStyle} />
                <span style={valueStyle}>{styleOptions.size} px</span>
              </div>
            </Row>

            {type === 'circle' && (
              <Row>
                <label style={labelStyle}>strokeWidth</label>
                <div style={sliderWrap}>
                  <input type="range" min={1} max={20} step={1}
                    value={styleOptions.strokeWidth}
                    onChange={e => setStyle('strokeWidth', Number(e.target.value))}
                    style={rangeStyle} />
                  <span style={valueStyle}>{styleOptions.strokeWidth} px</span>
                </div>
              </Row>
            )}

            {type === 'linear' && (
              <Row>
                <label style={labelStyle}>barHeight</label>
                <div style={sliderWrap}>
                  <input type="range" min={2} max={32} step={1}
                    value={styleOptions.barHeight}
                    onChange={e => setStyle('barHeight', Number(e.target.value))}
                    style={rangeStyle} />
                  <span style={valueStyle}>{styleOptions.barHeight} px</span>
                </div>
              </Row>
            )}

            <Row>
              <label style={labelStyle}>textColor</label>
              <input type="color" value={styleOptions.textColor}
                onChange={e => setStyle('textColor', e.target.value)} />
            </Row>

            <Row>
              <label style={labelStyle}>fontSize</label>
              <div style={sliderWrap}>
                <input type="range" min={10} max={24} step={0.5}
                  value={parseFloat(styleOptions.fontSize ?? '14.4')}
                  onChange={e => setStyle('fontSize', `${e.target.value}px`)}
                  style={rangeStyle} />
                <span style={valueStyle}>{styleOptions.fontSize}</span>
              </div>
            </Row>

            <Row>
              <label style={labelStyle}>fontWeight</label>
              <select style={selectStyle}
                value={String(styleOptions.fontWeight)}
                onChange={e => setStyle('fontWeight', Number(e.target.value))}>
                {[100, 200, 300, 400, 500, 600, 700, 800, 900].map(w => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </Row>

            <Row>
              <label style={labelStyle}>fontFamily</label>
              <select style={{ ...selectStyle, maxWidth: 130 }}
                value={styleOptions.fontFamily}
                onChange={e => setStyle('fontFamily', e.target.value)}>
                <option value="">inherit</option>
                <option value="monospace">monospace</option>
                <option value="Georgia, serif">serif</option>
                <option value="system-ui, sans-serif">system-ui</option>
                <option value="'Courier New', monospace">Courier New</option>
              </select>
            </Row>

            <Row>
              <label style={labelStyle}>letterSpacing</label>
              <div style={sliderWrap}>
                <input type="range" min={-2} max={10} step={0.5}
                  value={parseFloat(styleOptions.letterSpacing ?? '0')}
                  onChange={e => setStyle('letterSpacing', `${e.target.value}px`)}
                  style={rangeStyle} />
                <span style={valueStyle}>{styleOptions.letterSpacing}</span>
              </div>
            </Row>

            <Row>
              <label style={labelStyle}>lineHeight</label>
              <div style={sliderWrap}>
                <input type="range" min={1} max={3} step={0.1}
                  value={Number(styleOptions.lineHeight)}
                  onChange={e => setStyle('lineHeight', Number(e.target.value))}
                  style={rangeStyle} />
                <span style={valueStyle}>{Number(styleOptions.lineHeight).toFixed(1)}</span>
              </div>
            </Row>
          </fieldset>

          {/* Built-in dictionaries */}
          <fieldset style={fieldsetStyle}>
            <legend style={legendStyle}>dictionaries + dictionaryProbabilities</legend>

            {(Object.keys(builtIn) as BuiltInDictionaryKey[]).map(key => (
              <Row key={key}>
                <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <input
                    type="checkbox"
                    checked={builtIn[key].enabled}
                    onChange={e => setBuiltInField(key, 'enabled', e.target.checked)}
                  />
                  {key}
                </label>
                <div style={sliderWrap}>
                  <input
                    type="range" min={0} max={5} step={0.1}
                    value={builtIn[key].weight}
                    disabled={!builtIn[key].enabled}
                    onChange={e => setBuiltInField(key, 'weight', Number(e.target.value))}
                    style={{ ...rangeStyle, opacity: builtIn[key].enabled ? 1 : 0.35 }}
                  />
                  <span style={valueStyle}>{builtIn[key].weight.toFixed(1)}</span>
                </div>
              </Row>
            ))}
          </fieldset>

          {/* Custom dictionaries */}
          <fieldset style={fieldsetStyle}>
            <legend style={legendStyle}>customDictionaries + customDictionaryProbabilities</legend>

            {custom.map((c, idx) => (
              <Row key={idx}>
                <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <input
                    type="checkbox"
                    checked={c.enabled}
                    onChange={e => setCustomField(idx, 'enabled', e.target.checked)}
                  />
                  {c.label}
                </label>
                <div style={sliderWrap}>
                  <input
                    type="range" min={0} max={5} step={0.1}
                    value={c.weight}
                    disabled={!c.enabled}
                    onChange={e => setCustomField(idx, 'weight', Number(e.target.value))}
                    style={{ ...rangeStyle, opacity: c.enabled ? 1 : 0.35 }}
                  />
                  <span style={valueStyle}>{c.weight.toFixed(1)}</span>
                </div>
              </Row>
            ))}
          </fieldset>
        </div>

        {/* ── Right: preview + active props ── */}
        <div style={rightColStyle}>
          <div style={previewStyle}>
            <HonestAILoader
              showGraphic={showGraphic}
              type={type}
              loop={loop}
              advancement={advancement}
              showText={showText}
              language={language}
              dictionaries={activeDicts}
              customDictionaries={customDicts.length ? customDicts : undefined}
              dictionaryProbabilities={dictProbabilities}
              customDictionaryProbabilities={customProbs.length ? customProbs : undefined}
              textTime={textTime}
              textTransition={textTransition}
              transitionTime={transitionTime}
              textPosition={textPosition}
              styleOptions={styleOptions}
            />
          </div>

          <pre style={codeStyle}>{buildPropsDisplay({
            showGraphic, type, loop,
            advancement: loop ? undefined : advancement,
            showText, language,
            dictionaries: activeDicts,
            dictionaryProbabilities: dictProbabilities,
            customDictionaries: customDicts.length ? `[${activeCustom.map(c => c.label).join(', ')}]` : undefined,
            customDictionaryProbabilities: customProbs.length ? customProbs : undefined,
            textTime, textTransition, transitionTime, textPosition,
            styleOptions: JSON.stringify(styleOptions, null, 0),
          })}</pre>
        </div>

      </div>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────────

function CheckControl({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: 6 }}>
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
      {label}
    </label>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div style={rowStyle}>{children}</div>;
}

function buildPropsDisplay(props: Record<string, unknown>): string {
  const lines = Object.entries(props)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => {
      const val =
        typeof v === 'string'  ? `"${v}"` :
        Array.isArray(v)       ? `[${(v as unknown[]).join(', ')}]` :
        String(v);
      return `  ${k}={${val}}`;
    });
  return `<HonestAILoader\n${lines.join('\n')}\n/>`;
}

// ── Styles ────────────────────────────────────────────────────────────────────────

const pageStyle: React.CSSProperties = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontSize: '0.875rem',
  padding: '1.5rem 2rem',
  color: '#111827',
  minHeight: '100vh',
  boxSizing: 'border-box',
};

const titleStyle: React.CSSProperties = {
  margin: '0 0 1.25rem',
  fontSize: '1.25rem',
  fontWeight: 700,
};

const layoutStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '320px 1fr',
  gap: '1.5rem',
  alignItems: 'start',
};

const panelStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
};

const rightColStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  position: 'sticky',
  top: '1.5rem',
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

const fieldsetStyle: React.CSSProperties = {
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  padding: '0.75rem 1rem',
  margin: 0,
};

const legendStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 600,
  color: '#6b7280',
  padding: '0 4px',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.5rem',
  minHeight: '28px',
};

const labelStyle: React.CSSProperties = {
  flexShrink: 0,
  color: '#374151',
  fontFamily: 'monospace',
  fontSize: '0.8rem',
};

const selectStyle: React.CSSProperties = {
  fontSize: '0.8rem',
  padding: '2px 4px',
  borderRadius: '4px',
  border: '1px solid #d1d5db',
  background: '#fff',
};

const sliderWrap: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  flex: 1,
  justifyContent: 'flex-end',
};

const rangeStyle: React.CSSProperties = {
  width: '110px',
  cursor: 'pointer',
};

const valueStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  color: '#6b7280',
  minWidth: '52px',
  textAlign: 'right',
  fontVariantNumeric: 'tabular-nums',
};

const codeStyle: React.CSSProperties = {
  margin: 0,
  padding: '0.75rem 1rem',
  background: '#1e293b',
  color: '#94a3b8',
  borderRadius: '8px',
  fontSize: '0.72rem',
  lineHeight: 1.6,
  overflowX: 'auto',
};
