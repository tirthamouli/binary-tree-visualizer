import ColorGenerator from '../helpers/ColorGenerator';
import {GetColorCallBack} from './types';

/**
 * Defines one canvas
 */
class CanvasComponent {
  /**
   * The canvas element
   */
  private $el: HTMLCanvasElement

  /**
   * This is a hidden canvas element
   * which is used to redraw all the elements from the canvas
   * in unique colors.
   *
   * This way an element can be easily identified from this hit canvas
   * just by using the color in O(1)
   *
   * Otherwise to identify an element in the canvas it will take O(n)
   *
   */
  private $hitEl: HTMLCanvasElement

  /**
   * The color generator for generating new color
   */
  private colorGenerator: ColorGenerator


  /**
   * For constructing a new canvas component
   *
   * @param {HTMLCanvasElement} $el
   * @param {number} height
   * @param {number} width
   */
  constructor($el: HTMLCanvasElement, height: number, width: number) {
    const $hitEl = document.createElement('canvas');

    this.$el = $el;
    this.$hitEl = $hitEl;
    this.colorGenerator = new ColorGenerator();

    $hitEl.height = $el.height = height;
    $hitEl.width = $el.width = width;
  }

  /**
   * Get the hit 2d context
   *
   * @return {CanvasComponent}
   */
  getHitContext(): CanvasRenderingContext2D {
    const ctx = this.$hitEl.getContext('2d');
    if (!ctx) {
      throw new Error('Cannot get 2d context');
    }

    return ctx;
  }

  /**
   * Get the 2d context
   *
   * @return {CanvasRenderingContext2D}
   */
  getContext(): CanvasRenderingContext2D {
    const ctx = this.$el.getContext('2d');
    if (!ctx) {
      throw new Error('Cannot get 2d context');
    }

    return ctx;
  }

  /**
   * Get the next color from the color generator
   *
   * @return {string}
   */
  getNextColor() {
    return this.colorGenerator.getNextColor();
  }

  /**
   * On click of canvas get the hit color
   *
   * @param {GetColorCallBack} cb
   */
  onClickGetColor(cb: GetColorCallBack) {
    this.$el.addEventListener('click', (event) => {
      const {clientX, clientY} = event;
      const {data: pixel} = this.getHitContext().getImageData(
          clientX - this.$el.offsetLeft,
          clientY - this.$el.offsetTop,
          1, 1,
      );

      cb(`rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`);
    });
  }
}

export default CanvasComponent;


