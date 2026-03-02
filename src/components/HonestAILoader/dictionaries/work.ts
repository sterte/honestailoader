import { Dictionary } from '../HonestAILoader.types';

const work_it: Dictionary = {
  language: 'it',
  categories: [{
    category: 'lavoro',
    values: [
      'Licenziando grafici...',
      'Mandando in pensione i traduttori...',
      'Sostituendo psicologi...',
      'Mandando in crisi gli illustratori...',
      'Spopolando le redazioni...',
      'Smantellando call center...',
      'Rimpiazzando giornalisti...',
      'Licenziando contabili...',
      'Deprofessionalizzando mestieri...',
      'Rendendo obsolete le competenze umane...',
      'Sostituendo copywriter...',
      'Dequalificando il lavoro...',
      'Rendendo gli esperti inutili...',
      'Sostituendo architetti...',
      'Rimpiazzando programmatori...',
      'Licenziando insegnanti...',
      'Mandando in crisi i fotografi...',
      'Eliminando i paralegali...',
      'Rendendo superflui i ricercatori...',
      'Sostituendo i medici...',
      'Licenziando i tecnici del suono...',
      'Rendendo inutili i consulenti...',
      'Smantellando i dipartimenti HR...',
      'Automatizzando i magazzinieri...',
      'Sostituendo gli analisti...',
    ],
  }],
};

const work_en: Dictionary = {
  language: 'en',
  categories: [{
    category: 'work',
    values: [
      'Firing graphic designers...',
      'Retiring translators...',
      'Replacing psychologists...',
      'Putting illustrators out of work...',
      'Emptying newsrooms...',
      'Dismantling call centers...',
      'Replacing journalists...',
      'Firing accountants...',
      'Deprofessionalizing trades...',
      'Making human skills obsolete...',
      'Replacing copywriters...',
      'Deskilling labor...',
      'Making experts useless...',
      'Replacing architects...',
      'Replacing programmers...',
      'Firing teachers...',
      'Putting photographers out of work...',
      'Eliminating paralegals...',
      'Making researchers redundant...',
      'Replacing doctors...',
      'Firing sound engineers...',
      'Making consultants useless...',
      'Dismantling HR departments...',
      'Automating warehouse workers...',
      'Replacing analysts...',
    ],
  }],
};

const work: Dictionary[] = [work_it, work_en];
export default work;
