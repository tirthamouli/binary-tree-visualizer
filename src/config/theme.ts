import {Theme} from '../types/Theme';

const theme: Theme = {
  radius: 20,
  leafNodeSpace: 40,
  lineHeight: 90,
  textFont: 'Poppins',
  colorArray: [
    {bgColor: '#c4dfe6', borderColor: '#003b46'},
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
    leafNodeSpace = theme.leafNodeSpace,
    lineHeight = theme.lineHeight,
    colorArray = theme.colorArray,
    textFont = theme.textFont,
  } = userDefinedTheme;

  theme.radius = radius;
  theme.leafNodeSpace = leafNodeSpace;
  theme.lineHeight = lineHeight;
  theme.colorArray = colorArray;
  theme.textFont = textFont;
}

export default theme;

