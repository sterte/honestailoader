import React from 'react';
import { LoaderType, StyleOptions } from '../HonestAILoader.types';
import CircleLoader from './CircleLoader';
import LinearLoader from './LinearLoader';

interface GraphicLoaderProps {
  type: LoaderType;
  loop: boolean;
  advancement: number;
  speed: number;
  styleOptions?: StyleOptions;
}

/** Renders the appropriate graphic loader based on `type`. */
const GraphicLoader: React.FC<GraphicLoaderProps> = ({ type, loop, advancement, speed, styleOptions }) => {
  if (type === 'linear') {
    return <LinearLoader loop={loop} advancement={advancement} speed={speed} styleOptions={styleOptions} />;
  }
  return <CircleLoader loop={loop} advancement={advancement} speed={speed} styleOptions={styleOptions} />;
};

export default GraphicLoader;
