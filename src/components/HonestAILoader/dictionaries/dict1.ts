import { Dictionary } from '../HonestAILoader.types';

const dict1_en: Dictionary = {
  language: 'en',
  categories: [
    {
      category: 'thinking',
      values: [
        'Crunching the numbers…',
        'Consulting the digital oracle…',
        'Parsing your request with precision…',
        'Synthesizing knowledge at the speed of light…',
        'Running advanced heuristics…',
        'Cross-referencing the knowledge graph…',
      ],
    },
    {
      category: 'processing',
      values: [
        'Spinning up the inference engine…',
        'Vectorizing your thoughts…',
        'Optimizing neural pathways…',
        'Calibrating probability distributions…',
        'Loading attention layers…',
        'Tokenizing the universe, one word at a time…',
      ],
    },
    {
      category: 'loading',
      values: [
        'Fetching the answer from the ether…',
        'Warming up the GPU…',
        'Allocating memory for brilliance…',
        'Compiling results…',
        'Streaming tokens into coherence…',
        'Defragmenting thoughts…',
      ],
    },
  ],
};

const dict1_it: Dictionary = {
  language: 'it',
  categories: [
    {
      category: 'thinking',
      values: [
        'Elaborazione dati in corso…',
        "Consultando l'oracolo digitale…",
        'Analizzando la richiesta con precisione…',
        'Sintetizzando conoscenze alla velocità della luce…',
        'Applicando euristiche avanzate…',
        'Incrociando i riferimenti del grafo della conoscenza…',
      ],
    },
    {
      category: 'processing',
      values: [
        'Avviando il motore di inferenza…',
        'Vettorializzando i tuoi pensieri…',
        'Ottimizzando i percorsi neurali…',
        'Calibrando le distribuzioni di probabilità…',
        'Caricando i livelli di attenzione…',
        "Tokenizzando l'universo, una parola alla volta…",
      ],
    },
    {
      category: 'loading',
      values: [
        "Recuperando la risposta dall'etere…",
        'Riscaldando la GPU…',
        'Allocando memoria per la brillantezza…',
        'Compilando i risultati…',
        'Trasmettendo i token in modo coerente…',
        'Deframmentando i pensieri…',
      ],
    },
  ],
};

/** Tech-themed dictionary: processing, inference, and computation phrases */
const dict1: Dictionary[] = [dict1_en, dict1_it];

export default dict1;
