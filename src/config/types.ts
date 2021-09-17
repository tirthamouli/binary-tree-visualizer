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
  leafNodeSpace: number,
  lineHeight: number,
  textFont: string,
  strokeColor: string,
  colorArray: CircleColorSettings[],
};
