/**
 * Defines one canvas
 */
class CanvasComponent {
  /**
   * The canvas element
   */
  $el: HTMLCanvasElement


  /**
   * For constructing a new canvas component
   *
   * @param {HTMLCanvasElement} $el
   * @param {number} height
   * @param {number} width
   */
  constructor($el: HTMLCanvasElement, height: number, width: number) {
    this.$el = $el;
    $el.height = height;
    $el.width = width;
  }

  /**
   * Get the 2d context
   *
   * @return {CanvasRenderingContext2D}
   */
  getContext(): CanvasRenderingContext2D {
    const ctx= this.$el.getContext('2d');
    if (!ctx) {
      throw new Error('Cannot get 2d context');
    }

    return ctx;
  }
}

export default CanvasComponent;


