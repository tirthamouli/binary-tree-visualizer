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
  private blue = 0

  /**
   * Increment a color
   *
   * @param {'red' | 'green' | 'blue'} color
   */
  incrementColor(color: 'red' | 'green' | 'blue') {
    this[color] = (this[color] + 1) % 256;
  }

  /**
   * Get the next color
   * Starts from rgb(0, 0, 0)
   *
   * @return {string}
   */
  getNextColor() {
    // Generate the rgb value
    const color = `rgb(${this.red}, ${this.green}, ${this.blue})`;

    // Increment the color
    this.incrementColor('blue');
    if (this.blue === 0) {
      this.incrementColor('green');
      if (this.green === 0) {
        this.incrementColor('red');
      }
    }

    // Return the color
    return color;
  }
}

export default ColorGenerator;
