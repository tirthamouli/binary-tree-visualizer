import {VisualizationType} from '../enumns/VisualizationType';

/**
 * Horizontal start and end input
 */
export type HorizontalStartAndEndInput = {
  xStart: number,
  xEnd: number
};

export type VerticalStartAndEndInput = {
  yStart: number,
  yEnd: number
};

/**
 * Input options type for individual draw functions
 */
export type IndividualInputOptions = {
  maxWidth: number,
  maxHeigth: number,
};

/**
 * Input options type for main entry function
 */
export type MainInputOptions = {
  type: VisualizationType,
} & IndividualInputOptions;


