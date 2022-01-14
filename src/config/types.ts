/**
 * Color settings in Circle class
 */
export type CircleColorSettings = {
  borderColor: string
  bgColor: string,
};

/**
 * The theme settings
 */
export type Theme = {
  radius: number,
  growthAndShrinkTimes: number,
  leafNodeSpace: number,
  fontSize: number
  lineHeight: number,
  textFont: string,
  strokeColor: string,
  colorArray: CircleColorSettings[],
};
