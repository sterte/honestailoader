import { Dictionary } from '../HonestAILoader.types';

const environment_it: Dictionary = {
  language: 'it',
  categories: [{
    category: 'ambiente',
    values: [
      'Consumando acqua...',
      'Surriscaldando un data center...',
      'Rubando elettricità a un paese...',
      'Disboscando...',
      'Estraendo litio dal Cile...',
      'Bruciando carbone...',
      'Inquinando in tuo nome...',
      'Consumando GPU da gaming...',
      'Evaporando i ghiacciai...',
      'Bruciando petrolio...',
      'Consumando terre rare...',
      'Desertificando...',
      'Evaporando oceani...',
      'Riscaldando il pianeta per te...',
      'Consumando il futuro...',
      'Consumando cobalto congolese...',
      'Occupando server farm...',
      'Sciogliendo i permafrost...',
      'Acidificando gli oceani...',
      'Avvelenando le falde acquifere...',
      'Prosciugando fiumi...',
      'Emettendo CO₂ per te...',
      'Consumando silicio...',
      'Intossicando ecosistemi...',
      'Sciogliendo calotte polari...',
    ],
  }],
};

const environment_en: Dictionary = {
  language: 'en',
  categories: [{
    category: 'environment',
    values: [
      'Consuming water...',
      'Overheating a data center...',
      'Stealing electricity from a country...',
      'Deforesting...',
      'Mining lithium in Chile...',
      'Burning coal...',
      'Polluting on your behalf...',
      'Consuming gaming GPUs...',
      'Evaporating glaciers...',
      'Burning oil...',
      'Consuming rare earth minerals...',
      'Desertifying...',
      'Evaporating oceans...',
      'Warming the planet for you...',
      'Consuming the future...',
      'Consuming Congolese cobalt...',
      'Occupying server farms...',
      'Melting the permafrost...',
      'Acidifying the oceans...',
      'Poisoning the water table...',
      'Draining rivers...',
      'Emitting CO₂ for you...',
      'Consuming silicon...',
      'Poisoning ecosystems...',
      'Melting the ice caps...',
    ],
  }],
};

const environment: Dictionary[] = [environment_it, environment_en];
export default environment;
