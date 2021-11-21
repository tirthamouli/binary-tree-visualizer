import {VisualizationType} from '../enumns/VisualizationType';

/**
 * Horizontal start and end input
 */
export type HorizontalStartAndEndInput = {
  xStart: number,
  xEnd: number
};

/**
 * Vertical start and end points
 */
export type VerticalStartAndEndInput = {
  yStart: number,
  yEnd: number
};

/**
 * Left and right node spacing requirement
 */
export type LeftAndRightSpacing = {
  left: number,
  right: number
};

/**
 * Input options type for individual draw functions
 */
export type IndividualInputOptions = {
  maxWidth: number,
  maxHeight: number,
  highlightMode?: boolean
};

/**
 * Input options type for main entry function
 */
export type MainInputOptions = {
  type: VisualizationType,
  maxWidth: number,
  maxHeight: number,
};

/**
 * Callback for getting color
 */
export type GetColorCallBack = (color: string) => any;

/**
 * Defines the path
 */
export type PathArray = Array<'left' | 'right'>;
