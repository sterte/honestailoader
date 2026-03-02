import React from 'react';
import { LoaderType } from '../HonestAILoader.types';
import CircleLoader from './CircleLoader';
import LinearLoader from './LinearLoader';

interface GraphicLoaderProps {
  type: LoaderType;
  loop: boolean;
  advancement: number;
}

/** Renders the appropriate graphic loader based on `type`. */
const GraphicLoader: React.FC<GraphicLoaderProps> = ({ type, loop, advancement }) => {
  if (type === 'linear') {
    return <LinearLoader loop={loop} advancement={advancement} />;
  }
  return <CircleLoader loop={loop} advancement={advancement} />;
};

export default GraphicLoader;
