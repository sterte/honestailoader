import { Dictionary } from '../HonestAILoader.types';

const dict2_en: Dictionary = {
  language: 'en',
  categories: [
    {
      category: 'encouragement',
      values: [
        'Great question — hang tight!',
        'Your curiosity is our fuel…',
        "We're working hard just for you…",
        'Almost there — patience pays off!',
        'The best answers are worth the wait…',
        "You're in good hands — we've got this!",
      ],
    },
    {
      category: 'progress',
      values: [
        'Making progress, one step at a time…',
        'Every second brings us closer…',
        'Building something great for you…',
        'The gears are turning — stay with us!',
        'Good things are on their way…',
        "We're closing in on the answer…",
      ],
    },
    {
      category: 'patience',
      values: [
        'Good things take time…',
        'Perfection takes a moment…',
        'Your answer is being crafted with care…',
        'Worth the wait, we promise…',
        'Slow is smooth, smooth is fast…',
        'Patience is a virtue — almost done!',
      ],
    },
  ],
};

const dict2_it: Dictionary = {
  language: 'it',
  categories: [
    {
      category: 'encouragement',
      values: [
        'Ottima domanda — resta con noi!',
        'La tua curiosità è il nostro carburante…',
        'Stiamo lavorando sodo solo per te…',
        'Quasi pronto — la pazienza paga!',
        "Le risposte migliori valgono l'attesa…",
        'Sei in buone mani — ci pensiamo noi!',
      ],
    },
    {
      category: 'progress',
      values: [
        'Avanzando, un passo alla volta…',
        'Ogni secondo ci avvicina di più…',
        'Costruendo qualcosa di grande per te…',
        'Gli ingranaggi girano — rimani con noi!',
        'Le cose buone stanno arrivando…',
        'Ci stiamo avvicinando alla risposta…',
      ],
    },
    {
      category: 'patience',
      values: [
        'Le cose buone richiedono tempo…',
        'La perfezione richiede un momento…',
        'La tua risposta viene elaborata con cura…',
        "Vale l'attesa, promesso…",
        'Piano è liscio, liscio è veloce…',
        'La pazienza è una virtù — quasi finito!',
      ],
    },
  ],
};

/** Motivational dictionary: encouragement, progress, and patience phrases */
const dict2: Dictionary[] = [dict2_en, dict2_it];

export default dict2;
