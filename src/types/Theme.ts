import {CircleColorSettings} from './CircleColorSettings';

/**
 * The theme settings
 */
export type Theme = {
  radius: number,
  leafNodeSpace: number,
  lineHeight: number,
  textFont: string,
  colorArray: CircleColorSettings[],
};
