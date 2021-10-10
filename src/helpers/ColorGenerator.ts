import getRGBString from '../utils/getRGBString';

/**
 * The gap between 2 ids
 */
const gap = 10;

/**
 * For generating color
 */
class ColorGenerator {
  /**
   * The red color value
   */
  private red = 0

  /**
   * The green color value
   */
  private green = 0

  /**
   * The blue color value
   */
  private blue = 1

  /**
   * Increment a color
   *
   * @param {'red' | 'green' | 'blue'} color
   */
  incrementColor(color: 'red' | 'green' | 'blue') {
    this[color] = (this[color] + gap) % 256;
  }

  /**
   * Get the next color
   * Starts from rgb(0, 0, 0)
   *
   * @return {string}
   */
  getNextColor() {
    // Generate the rgb value
    const color = getRGBString(this.red, this.green, this.blue);

    // Increment the color
    this.incrementColor('blue');
    if (this.blue < gap) {
      this.incrementColor('green');
      if (this.green < gap) {
        this.incrementColor('red');
      }
    }

    // Return the color
    return color;
  }
}

export default ColorGenerator;
