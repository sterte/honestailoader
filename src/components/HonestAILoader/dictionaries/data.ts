import { Dictionary } from '../HonestAILoader.types';

const data_it: Dictionary = {
  language: 'it',
  categories: [{
    category: 'dati',
    values: [
      'Addestrandosi sui tuoi dati...',
      'Vendendo i tuoi dati...',
      'Erodendo la privacy...',
      'Estraendo dati senza chiedere...',
      'Facendo soldi con le tue parole...',
      "Distruggendo il diritto d'autore...",
      'Plagiando autori umani...',
      "Colonizzando l'immaginario collettivo...",
      'Costruendo dipendenze digitali...',
      'Ottimizzando la tua dipendenza...',
      'Generando meme...',
      'Inventando citazioni...',
      'Riscrivendo la storia...',
      'Generando spam...',
      'Alimentando la disinformazione...',
      'Scrivendo email di phishing...',
      'Moltiplicando i bias...',
      'Discriminando senza saperlo...',
      'Costruendo bolle informative...',
      'Distorcendo la realtà...',
      'Inventando notizie...',
      'Vendendo certezze false...',
      'Automatizzando la propaganda...',
      'Generando deepfake...',
      "Automatizzando l'incompetenza...",
    ],
  }],
};

const data_en: Dictionary = {
  language: 'en',
  categories: [{
    category: 'data',
    values: [
      'Training on your data...',
      'Selling your data...',
      'Eroding privacy...',
      'Extracting data without asking...',
      'Making money from your words...',
      'Destroying copyright...',
      'Plagiarizing human authors...',
      'Colonizing the collective imagination...',
      'Building digital addictions...',
      'Optimizing your dependency...',
      'Generating memes...',
      'Inventing citations...',
      'Rewriting history...',
      'Generating spam...',
      'Fueling disinformation...',
      'Writing phishing emails...',
      'Multiplying biases...',
      'Discriminating without knowing it...',
      'Building information bubbles...',
      'Distorting reality...',
      'Inventing news...',
      'Selling false certainties...',
      'Automating propaganda...',
      'Generating deepfakes...',
      'Automating incompetence...',
    ],
  }],
};

const data: Dictionary[] = [data_it, data_en];
export default data;
