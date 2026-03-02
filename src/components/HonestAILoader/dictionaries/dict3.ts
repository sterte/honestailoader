import { Dictionary } from '../HonestAILoader.types';

const dict3_en: Dictionary = {
  language: 'en',
  categories: [
    {
      category: 'humor',
      values: [
        'Teaching electrons to behave…',
        'Bribing the servers with compliments…',
        'Searching for the answer in couch cushions…',
        'Asking a very wise rubber duck…',
        'Negotiating with the semicolons…',
        'Convincing the cache it is not tired…',
      ],
    },
    {
      category: 'absurd',
      values: [
        'Summoning digital wizards…',
        'Consulting the ancient scrolls of Stack Overflow…',
        'Running the algorithm on a very fast hamster wheel…',
        'Translating the question into binary and back…',
        'Politely asking the quantum foam for suggestions…',
        'Untangling the spaghetti code…',
      ],
    },
    {
      category: 'meta',
      values: [
        'Pretending to work very hard…',
        'Generating impressive-looking progress…',
        'Making convincing loading noises…',
        'Definitely not playing Minesweeper…',
        'Typing furiously for authenticity…',
        'This bar only goes up — promise!',
      ],
    },
  ],
};

const dict3_it: Dictionary = {
  language: 'it',
  categories: [
    {
      category: 'humor',
      values: [
        'Insegnando agli elettroni a comportarsi…',
        'Corrompendo i server con i complimenti…',
        'Cercando la risposta nei cuscini del divano…',
        "Chiedendo consiglio a un'anatra di gomma molto saggia…",
        'Negoziando con i punti e virgola…',
        'Convincendo la cache che non è stanca…',
      ],
    },
    {
      category: 'absurd',
      values: [
        'Invocando maghi digitali…',
        'Consultando gli antichi papiri di Stack Overflow…',
        "Eseguendo l'algoritmo su una ruota di criceto velocissima…",
        'Traducendo la domanda in binario e ritorno…',
        'Chiedendo cortesemente alla schiuma quantistica dei suggerimenti…',
        'Sbrogliando il codice spaghetti…',
      ],
    },
    {
      category: 'meta',
      values: [
        'Fingendo di lavorare moltissimo…',
        "Generando progressi dall'aspetto convincente…",
        'Producendo suoni di caricamento realistici…',
        'Sicuramente non stiamo giocando a Campo Minato…',
        'Digitando freneticamente per autenticità…',
        'Questa barra va solo su — promesso!',
      ],
    },
  ],
};

/** Fun/humor dictionary: playful and self-aware loading phrases */
const dict3: Dictionary[] = [dict3_en, dict3_it];

export default dict3;
