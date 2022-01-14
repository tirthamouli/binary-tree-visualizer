import {CanvasComponent} from '..';
import theme from '../config/theme';
import {CircleColorSettings} from '../config/types';
import {RadiusSettings} from './types';

/**
 * Rate at which circle will grow or shrink
 */
const growthRate = 0.3;

/**
 * Describes a circle in the canvas
 */
class Circle {
  /**
   * Radius of the circle
   */
  private radiusSettings: RadiusSettings

  /**
   * The colorId of the circle
   */
  private colorId: string = ''

  /**
   * Color of the circle
   */
  private colorSettings: CircleColorSettings

  /**
   * Value to be displayed inside the circle
   */
  private value: string

  /**
   * X Position of the circle
   */
  private x: number = -1

  /**
   * Y Position of the circle
   */
  private y: number = -1

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
    this.radiusSettings = {
      currentRadius: radius,
      originalRadius: radius,
      maxRadius: radius * theme.growthAndShrinkTimes,
      minRadius: radius / theme.growthAndShrinkTimes,
    };
  }

  /**
   * Draw the circle
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} radius
   * @param {string} color
   */
  private drawCircle(
      ctx: CanvasRenderingContext2D,
      radius: number,
      color: string,
  ) {
    const {x, y} = this;

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.fill();
  }

  /**
   * Draw the border
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  private drawBorder(ctx: CanvasRenderingContext2D) {
    const {x, y, colorSettings, radiusSettings: {currentRadius: radius}} = this;
    const {borderColor} = colorSettings;

    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
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

    // Decide font size
    const fontSize = `${theme.fontSize}pt`;
    const ySpacing = theme.fontSize/2;

    ctx.fillStyle = borderColor;
    ctx.font = `${fontSize} ${theme.textFont}`;
    ctx.textAlign = 'center';
    ctx.fillText(value, x, y + ySpacing);
  }

  /**
   * Get the current radius
   *
   * @return {number}
   */
  getRadius() {
    const {
      radiusSettings: {currentRadius: radius},
    } = this;
    return radius;
  }

  /**
   * Increase radius of the circle
   * @param {number} maxRadius
   * @return {boolean} - Weather size was changed
   */
  grow(maxRadius = this.radiusSettings.maxRadius) {
    const {
      radiusSettings: {
        currentRadius,
      },
    } = this;

    if (currentRadius < maxRadius) {
      const originalIncreasedRadius = currentRadius + growthRate;
      this.radiusSettings.currentRadius = originalIncreasedRadius > maxRadius ?
      maxRadius : originalIncreasedRadius;
      return true;
    }

    return false;
  }

  /**
   * Decrease the radius of the circle
   * @param {number} minRadius
   * @return {boolean} - Weather size was changed
   */
  shrink(minRadius = this.radiusSettings.minRadius) {
    const {
      radiusSettings: {
        currentRadius,
      },
    } = this;

    if (currentRadius > minRadius) {
      const originalDecreasedRadius = currentRadius - growthRate;
      this.radiusSettings.currentRadius = originalDecreasedRadius < minRadius ?
      minRadius : originalDecreasedRadius;
      return true;
    }

    return false;
  }

  /**
   * Bring the circle back to its original radius
   * @return {boolean} - Weather size was changed
   */
  restoreCircle() {
    const {
      radiusSettings: {
        currentRadius,
        originalRadius,
      },
    } = this;

    if (currentRadius > originalRadius) {
      return this.shrink(originalRadius);
    }

    if (currentRadius < originalRadius) {
      return this.grow(originalRadius);
    }

    return false;
  }

  /**
   * Set the color id of the circle
   *
   * @param {string} colorId
   */
  setColorId(colorId: string) {
    this.colorId = colorId;
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
   * Draw the circle on the screen
   * Draw the border
   * Add the text
   *
   * @param {CanvasComponent} comp
   * @return {string} - The color id represented by the unique color
   */
  draw(comp: CanvasComponent) {
    const {
      radiusSettings: {currentRadius: radius},
      colorSettings: {bgColor},
    } = this;

    // Draw circle
    this.colorId = this.colorId ? this.colorId : comp.getNextColor();
    this.drawCircle(
        comp.getContext(),
        radius,
        bgColor,
    );
    this.drawCircle(
        comp.getHitContext(),
        radius,
        this.colorId,
    );

    // Draw border
    this.drawBorder(comp.getContext());

    // Write text
    this.writeText(comp.getContext());

    // Return the colorId
    return this.colorId;
  }
}

export default Circle;
