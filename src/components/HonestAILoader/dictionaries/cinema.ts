import { Dictionary } from '../HonestAILoader.types';

const cinema_it: Dictionary = {
  language: 'it',
  categories: [{
    category: 'cinema',
    values: [
      'Licenziando sceneggiatori...',
      'Clonando la voce di attori morti...',
      'Rigenerando Kubrick senza Kubrick...',
      'Sostituendo compositori...',
      'Inventando filmografie inesistenti...',
      'Rendendo obsoleti i critici cinematografici...',
      'Generando locandine tutte uguali...',
      'Sostituendo i doppiatori...',
      'Cancellando il lavoro dei montatori...',
      "Replicando l'estetica senza l'anima...",
      'Producendo sequel non richiesti...',
      'Rubando lo stile ai registi...',
      'Facendo recitare attori senza consenso...',
      'Uccidendo la fotografia di scena...',
      'Rendendo eterni gli attori contro la loro volontà...',
      'Generando trame già viste...',
      'Demolendo il lavoro degli animatori...',
      'Svuotando il senso della narrazione...',
      'Rimpiazzando il genio con la media...',
      'Producendo film che nessuno ha voluto...',
      'Generando colonne sonore standardizzate...',
      'Brevettando gli stili registici...',
      'Rendendo obsoleti i costumisti...',
      'Sostituendo gli agenti cinematografici...',
      'Eliminando il caso creativo...',
    ],
  }],
};

const cinema_en: Dictionary = {
  language: 'en',
  categories: [{
    category: 'cinema',
    values: [
      'Firing screenwriters...',
      'Cloning the voices of dead actors...',
      'Regenerating Kubrick without Kubrick...',
      'Replacing composers...',
      'Inventing non-existent filmographies...',
      'Making film critics obsolete...',
      'Generating identical posters...',
      'Replacing voice actors...',
      "Erasing editors' work...",
      'Replicating the aesthetic without the soul...',
      'Producing unwanted sequels...',
      "Stealing directors' styles...",
      'Making actors perform without consent...',
      'Killing set photography...',
      'Making actors eternal against their will...',
      'Generating already-seen plots...',
      "Demolishing animators' work...",
      'Emptying the meaning of storytelling...',
      'Replacing genius with the average...',
      'Producing films nobody wanted...',
      'Generating standardized soundtracks...',
      'Patenting directorial styles...',
      'Making costume designers obsolete...',
      'Replacing film agents...',
      'Eliminating creative chance...',
    ],
  }],
};

const cinema: Dictionary[] = [cinema_it, cinema_en];
export default cinema;
