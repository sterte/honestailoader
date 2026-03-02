# HonestAILoader – React TypeScript Component Spec

## Overview

Crea un componente React TypeScript chiamato `HonestAILoader` che combina una **parte grafica** (animazione di caricamento) e una **parte testuale** (frasi localizzate estratte casualmente da dizionari). Il componente deve essere completamente autonomo, riutilizzabile e altamente configurabile.

---

## Struttura del progetto

```
src/
  components/
    HonestAILoader/
      index.ts                        # re-export pubblico
      HonestAILoader.tsx              # componente principale
      HonestAILoader.types.ts         # tutti i tipi/interfacce TypeScript
      graphic/
        GraphicLoader.tsx             # wrapper grafica
        CircleLoader.tsx              # animazione circolare
        LinearLoader.tsx              # animazione lineare
      text/
        TextLoader.tsx                # wrapper testo
        useTextCycle.ts               # hook per il ciclo delle frasi
      dictionaries/
        index.ts                      # re-export dei dizionari built-in
        dict1.ts                      # primo dizionario built-in (es. "tech")
        dict2.ts                      # secondo dizionario built-in (es. "motivational")
        dict3.ts                      # terzo dizionario built-in (es. "fun")
      utils/
        probability.ts                # logica di campionamento pesato
        normalizeProbabilities.ts     # normalizzazione somma → 1
```

---

## Tipi TypeScript (`HonestAILoader.types.ts`)

```ts
export type LoaderType = 'circle' | 'linear';
export type TextTransition = 'fade' | 'scroll';

export interface DictionaryCategory {
  category: string;
  values: string[];
}

export interface Dictionary {
  language: string;           // es. "en", "it", "fr"
  categories: DictionaryCategory[];
}

export interface HonestAILoaderProps {
  // --- Grafica ---
  showGraphic?: boolean;
  type?: LoaderType;
  loop?: boolean;
  advancement?: number;        // 0..1, usato solo se loop=false

  // --- Testo ---
  showText?: boolean;
  language?: string;           // es. "en" | "it"
  dictionaries?: BuiltInDictionaryKey[];  // es. ['dict1', 'dict2']
  customDictionaries?: Dictionary | Dictionary[];
  dictionaryProbabilities?: number[];      // pesi per dictionaries[]
  customDictionaryProbabilities?: number[];// pesi per customDictionaries[]
  textTime?: number;           // ms visualizzazione frase
  textTransition?: TextTransition;
  transitionTime?: number;     // ms animazione in/out
}

export type BuiltInDictionaryKey = 'dict1' | 'dict2' | 'dict3';
```

---

## Dizionari built-in

Crea **tre dizionari** con almeno **3 categorie ciascuno** e **almeno 5 frasi per categoria per lingua** (supporta almeno `en` e `it`).

Esempio di struttura per `dict1.ts`:

```ts
import { Dictionary } from '../HonestAILoader.types';

const dict1: Dictionary = {
  language: 'en',
  categories: [
    {
      category: 'thinking',
      values: [
        'Crunching the numbers…',
        'Consulting the digital oracle…',
        // ...
      ],
    },
    {
      category: 'waiting',
      values: [
        'Good things take time…',
        // ...
      ],
    },
    {
      category: 'humor',
      values: [
        'Teaching electrons to behave…',
        // ...
      ],
    },
  ],
};

export default dict1;
```

Crea versioni separate per `it` oppure unifica in un unico file con entrambe le lingue come dizionari distinti (scegli la struttura più pulita).

---

## Logica di probabilità (`probability.ts` + `normalizeProbabilities.ts`)

### Normalizzazione
- Raccogli tutti i pesi: `[...dictionaryProbabilities, ...customDictionaryProbabilities]`
- Se non specificati, usa pesi uguali per tutti i dizionari attivi
- Normalizza la somma a 1

### Campionamento
1. Seleziona un dizionario con campionamento pesato normalizzato
2. Dal dizionario selezionato, filtra le categorie disponibili per la lingua richiesta
3. Seleziona una categoria a caso (uniform)
4. Seleziona una frase a caso dalla categoria (uniform)
5. Evita di ripetere la stessa frase consecutivamente (best-effort)

---

## Hook `useTextCycle`

```ts
function useTextCycle(options: {
  allDictionaries: Dictionary[];
  weights: number[];
  language: string;
  textTime: number;
  transitionTime: number;
}): {
  currentText: string;
  phase: 'in' | 'visible' | 'out';  // per pilotare l'animazione CSS
}
```

- Usa `useEffect` + `setInterval` / `setTimeout` per ciclare le frasi
- Espone `phase` per permettere a `TextLoader` di applicare la classe CSS corretta
- Pulisce i timer al `unmount`

---

## Componente grafico

### `CircleLoader.tsx`
- **loop=true**: spinner SVG in rotazione continua (CSS `@keyframes rotate`)
- **loop=false**: cerchio SVG con `stroke-dasharray` / `stroke-dashoffset` proporzionale ad `advancement` (0..1)
- Stile: moderno, usa `stroke-linecap: round`

### `LinearLoader.tsx`
- **loop=true**: barra con animazione shimmer/bounce in loop
- **loop=false**: barra `<progress>`-style con larghezza `advancement * 100%`, transizione CSS fluida
- Stile: pill-shaped, usa `border-radius` generoso

---

## Componente testo (`TextLoader.tsx`)

- Riceve `currentText` e `phase` da `useTextCycle`
- Applica classi CSS condizionali basate su `phase` e `textTransition`:
  - **fade**: opacity 0→1 (in), 1→1 (visible), 1→0 (out)
  - **scroll**: translateY(10px)→0 (in), 0 (visible), 0→-10px (out)
- Usa CSS Modules oppure styled-components (scegli uno e sii consistente)

---

## Componente principale (`HonestAILoader.tsx`)

```tsx
const HonestAILoader: React.FC<HonestAILoaderProps> = ({
  showGraphic = true,
  type = 'circle',
  loop = true,
  advancement = 0,
  showText = true,
  language = 'en',
  dictionaries = ['dict1'],
  customDictionaries,
  dictionaryProbabilities,
  customDictionaryProbabilities,
  textTime = 3000,
  textTransition = 'fade',
  transitionTime = 300,
}) => { /* ... */ };
```

- Risolve i dizionari built-in tramite la mappa `{ dict1, dict2, dict3 }`
- Normalizza le probabilità
- Passa tutto a `GraphicLoader` e `TextLoader`
- Layout: flex column centrato, gap configurabile

---

## Esempio d'uso (da includere come `HonestAILoaderDemo.tsx`)

```tsx
import { HonestAILoader } from './components/HonestAILoader';
import dict1 from './components/HonestAILoader/dictionaries/dict1';

const customDict = {
  language: 'it',
  categories: [
    { category: 'custom1', values: ['Frase personalizzata uno…', 'Elaborando la risposta…'] },
    { category: 'custom2', values: ['Quasi pronto…', 'Un momento ancora…'] },
  ],
};

function Demo() {
  const [advancement, setAdvancement] = React.useState(0);

  return (
    <HonestAILoader
      showGraphic={true}
      type="circle"
      loop={false}
      advancement={advancement}
      showText={true}
      language="en"
      dictionaries={['dict1', 'dict2', 'dict3']}
      customDictionaries={customDict}
      dictionaryProbabilities={[0.2, 0.3, 0.5]}
      customDictionaryProbabilities={[0.4, 0.6]}
      textTime={1000}
      textTransition="fade"
      transitionTime={100}
    />
  );
}
```

---

## Requisiti tecnici

- **React** ≥ 18, **TypeScript** strict mode
- Nessuna dipendenza esterna obbligatoria (al massimo `clsx` per classi condizionali)
- Tutti i componenti devono essere functional components con hooks
- Props opzionali devono avere default values sensati
- Il componente deve essere accessibile: `role="status"`, `aria-live="polite"` sul testo
- Esporta anche i tipi pubblici da `index.ts`

---

## Output atteso

1. Tutti i file nella struttura descritta sopra
2. `HonestAILoaderDemo.tsx` come playground
3. Brevi commenti JSDoc sulle props principali e sulle funzioni di utilità

---

## Note implementative

- La logica di campionamento pesato deve funzionare correttamente anche quando `dictionaryProbabilities` e `customDictionaryProbabilities` hanno lunghezze diverse dal numero effettivo di dizionari (fallback a uniform)
- Se la lingua richiesta non è presente in un dizionario, quel dizionario viene ignorato per la selezione testuale (non lancia errori)
- `advancement` fuori range [0,1] deve essere clampato silenziosamente
- Il componente deve essere safe per SSR (nessun accesso diretto a `window`/`document` nel render)
