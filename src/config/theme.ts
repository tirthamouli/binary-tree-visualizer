import {Theme} from './types';

const theme: Theme = {
  radius: 20,
  growthAndShrinkTimes: 1.25,
  leafNodeSpace: 75,
  lineHeight: 90,
  fontSize: 10,
  textFont: 'Poppins',
  strokeColor: '#f56042',
  colorArray: [
    {bgColor: '#fff2e0', borderColor: '#f56042'},
  ],
};

/**
 * Set the user defined theme if required
 *
 * @param {Theme} userDefinedTheme
 */
export function setTheme(userDefinedTheme: Partial<Theme>) {
  const {
    radius = theme.radius,
    growthAndShrinkTimes = theme.growthAndShrinkTimes,
    leafNodeSpace = theme.leafNodeSpace,
    lineHeight = theme.lineHeight,
    colorArray = theme.colorArray,
    textFont = theme.textFont,
    strokeColor = theme.strokeColor,
    fontSize = theme.fontSize,
  } = userDefinedTheme;

  theme.radius = radius;
  theme.growthAndShrinkTimes = growthAndShrinkTimes;
  theme.leafNodeSpace = leafNodeSpace;
  theme.lineHeight = lineHeight;
  theme.colorArray = colorArray;
  theme.textFont = textFont;
  theme.strokeColor = strokeColor;
  theme.fontSize = fontSize;
}

export default theme;

