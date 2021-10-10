/**
 * Get RGB string from red green and blue values
 *
 * @param {number} red
 * @param {number} green
 * @param {number} blue
 * @return {string}
 */
function getRGBString(red: number, green: number, blue: number) {
  return `rgb(${red}, ${green}, ${blue})`;
}

export default getRGBString;
