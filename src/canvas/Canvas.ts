import ColorGenerator from '../helpers/ColorGenerator';
import getRGBString from '../utils/getRGBString';
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
   * The current hovering color
   */
  private currentHoveringColor: string = ''

  /**
   * For storing the on hover callback
   */
  private onHoverCB?: (event: MouseEvent) => void

  /**
   * For storing the on click callback
   */
  private onClickCB?: (event: MouseEvent) => void

  /**
   * For constructing a new canvas component
   *
   * @param {HTMLCanvasElement} $el
   */
  constructor($el: HTMLCanvasElement) {
    const $hitEl = document.createElement('canvas');

    this.$el = $el;
    this.$hitEl = $hitEl;
    this.colorGenerator = new ColorGenerator();
  }

  /**
   * Clears the canvas
   */
  clearCanvas() {
    const {height, width} = this.$el;
    this.getContext().clearRect(0, 0, width, height);
  }

  /**
   * Set the maximum width and height
   *
   * @param {number} height
   * @param {number} width
   */
  setMaxWidthAndHeight(height: number, width: number) {
    this.$hitEl.height = this.$el.height = height;
    this.$hitEl.width = this.$el.width = width;
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
   * On hover get the canvas hit color
   *
   * @param {GetColorCallBack} cb
   */
  onHover(cb: GetColorCallBack) {
    // Clear previous listeners
    if (this.onHoverCB) {
      this.$el.removeEventListener('mousemove', this.onHoverCB);
    }

    // Set the callback
    this.onHoverCB = (event: MouseEvent) => {
      const {pageX, pageY} = event;
      const {data: pixel} = this.getHitContext().getImageData(
          pageX - this.$el.offsetLeft,
          pageY - this.$el.offsetTop,
          1, 1,
      );

      // Callback should only be called on color change
      const color = getRGBString(pixel[0], pixel[1], pixel[2]);
      if (this.currentHoveringColor !== color) {
        this.currentHoveringColor = color;
        cb(color);
      }
    };

    // Add the event listener
    this.$el.addEventListener('mousemove', this.onHoverCB);
  }

  /**
   * On click of canvas get the hit color
   *
   * @param {GetColorCallBack} cb
   */
  onClick(cb: GetColorCallBack) {
    // Clear previous listeners
    if (this.onClickCB) {
      this.$el.removeEventListener('click', this.onClickCB);
    }

    // Set the callback
    this.onClickCB = (event: MouseEvent) => {
      const {pageX, pageY} = event;
      console.log(pageX, pageY);
      const {data: pixel} = this.getHitContext().getImageData(
          pageX - this.$el.offsetLeft,
          pageY - this.$el.offsetTop,
          1, 1,
      );
      cb(getRGBString(pixel[0], pixel[1], pixel[2]));
    };

    // Add the event listener
    this.$el.addEventListener('click', this.onClickCB);
  }
}

export default CanvasComponent;


