import {Point} from '../types/Point';

/**
 * Describes a bezier curve
 */
class BezierCurve {
  /**
   * X Configurations
   */
  xStart: number
  cp1x: number
  cp2x: number
  xEnd: number

  /**
   * Y Configurations
   */
  yStart: number
  cp1y: number
  cp2y: number
  yEnd: number

  /**
   * Color of the curve
   */
  color: string

  /**
   * Construct a new bezier curve
   *
   * @param {string} color
   * @param {Point} start
   * @param {Point} cp1
   * @param {Point} cp2
   * @param {Point} end
   */
  constructor(
      color: string,
      start: Point,
      cp1: Point,
      cp2: Point,
      end: Point,
  ) {
    const {x: xStart, y: yStart} = start;
    const {x: cp1x, y: cp1y} = cp1;
    const {x: cp2x, y: cp2y} = cp2;
    const {x: xEnd, y: yEnd} = end;

    this.color = color;
    this.xStart = xStart;
    this.yStart = yStart;
    this.cp1x = cp1x;
    this.cp1y = cp1y;
    this.cp2x = cp2x;
    this.cp2y = cp2y;
    this.xEnd = xEnd;
    this.yEnd = yEnd;
  }

  /**
   * Draw the bezier curve
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.moveTo(this.xStart, this.yStart);
    ctx.strokeStyle = this.color;
    ctx.bezierCurveTo(
        this.cp1x,
        this.cp1y,
        this.cp2x,
        this.cp2y,
        this.xEnd,
        this.yEnd,
    );
    ctx.stroke();
  }
}


export default BezierCurve;
