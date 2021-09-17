import {CircleColorSettings} from '../config/types';
import theme from '../config/theme';

/**
 * Get a random color settings
 *
 * @return {CircleColorSettings}
 */
function getRandomColor():CircleColorSettings {
  const {colorArray} = theme;
  return colorArray[Math.floor(Math.random() * colorArray.length)];
}

export default getRandomColor;
