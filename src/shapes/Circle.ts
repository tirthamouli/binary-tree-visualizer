import theme from '../config/theme';
import {CircleColorSettings} from '../config/types';

/**
 * Describes a circle in the canvas
 */
class Circle {
  /**
   * Radius of the circle
   */
  radius: number

  /**
   * Color of the circle
   */
  colorSettings: CircleColorSettings

  /**
   * Value to be displayed inside the circle
   */
  value: string

  /**
   * X Position of the circle
   */
  x: number = -1

  /**
   * Y Position of the circle
   */
  y: number = -1


  /**
   * For constructing a new circle
   *
   * @param {string} value
   * @param {number} radius
   * @param {CircleColorSettings} colorSettings
   */
  constructor(
      value: string,
      radius: number,
      colorSettings: CircleColorSettings,
  ) {
    this.value = value;
    this.colorSettings = colorSettings;
    this.radius = radius;
  }

  /**
   * Set the x and y coordinates of the circle
   *
   * @param {number} x
   * @param {number} y
   */
  setCoordinates(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * Draw the circle
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  private drawCircle(ctx: CanvasRenderingContext2D) {
    const {x, y, radius, colorSettings} = this;
    const {bgColor} = colorSettings;

    ctx.beginPath();
    ctx.fillStyle = bgColor;
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.fill();
  }

  /**
   * Draw the border
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  private drawBorder(ctx: CanvasRenderingContext2D) {
    const {x, y, radius, colorSettings} = this;
    const {borderColor} = colorSettings;

    ctx.arc(x, y, radius + 1, 0, Math.PI * 2, false);
    ctx.strokeStyle = borderColor;
    ctx.stroke();
  }

  /**
   * Write the text
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  private writeText(ctx: CanvasRenderingContext2D) {
    const {x, y, value, colorSettings} = this;
    const {borderColor} = colorSettings;

    // @todo: Make this configurable
    // Decide font size
    let fontSize = '10pt';
    let ySpacing = 5;
    if (value.length > 3) {
      fontSize = '8pt';
      ySpacing = 3;
    }

    ctx.fillStyle = borderColor;
    ctx.font = `${fontSize} ${theme.textFont}`;
    ctx.textAlign = 'center';
    ctx.fillText(value, x, y + ySpacing);
  }

  /**
   * Draw the circle on the screen
   * Draw the border
   * Add the text
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx: CanvasRenderingContext2D) {
    // Draw circle
    this.drawCircle(ctx);

    // Draw border
    this.drawBorder(ctx);

    // Write text
    this.writeText(ctx);
  }
}

export default Circle;
