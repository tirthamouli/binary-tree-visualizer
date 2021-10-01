/**
 * @jest-environment jsdom
 */
import CanvasComponent from '../../../src/canvas/Canvas';
import Circle from '../../../src/shapes/Circle';
import getRandomColor from '../../../src/utils/getRandomColor';

describe('Canvas tests', () => {
  const mockHeight = 1080;
  const mockWidth = 1920;

  it('should be initialize a CanvasComponent', () => {
    const mockCanvas = document.createElement('canvas');
    const canvasComponent = new CanvasComponent(
        mockCanvas,
        mockHeight,
        mockWidth,
    );

    expect(canvasComponent.getContext()).toBe(mockCanvas.getContext('2d'));
  });

  it('should not be able to get draw context', () => {
    const mockCanvas = document.createElement('canvas');
    mockCanvas.getContext = () => null;
    const canvasComponent = new CanvasComponent(
        mockCanvas,
        mockHeight,
        mockWidth,
    );

    expect(() => canvasComponent.getContext())
        .toThrow(new Error('Cannot get 2d context'));
  });

  it('should not be able to get hit context', () => {
    const mockCanvas = document.createElement('canvas');
    const mockHitCanvas = document.createElement('canvas');
    mockHitCanvas.getContext = () => null;
    const mockCircle = new Circle('1', 20, getRandomColor());
    const canvasComponent = new CanvasComponent(
        mockCanvas,
        mockHeight,
        mockWidth,
    );
    (canvasComponent as any).$hitEl = mockHitCanvas;
    mockCircle.setCoordinates(100, 100);
    expect(() => mockCircle.draw(canvasComponent))
        .toThrow(new Error('Cannot get 2d context'));
  });

  it('should be able to get next color', () => {
    const mockCanvas = document.createElement('canvas');
    const canvasComponent = new CanvasComponent(
        mockCanvas,
        mockHeight,
        mockWidth,
    );

    const nextColor = canvasComponent.getNextColor();
    expect(nextColor).toBe('rgb(0, 0, 0)');
  });

  it('should be able to get the color on click', (done) => {
    const mockCanvas = document.createElement('canvas');
    const mockCircle = new Circle('1', 20, getRandomColor());
    const canvasComponent = new CanvasComponent(
        mockCanvas,
        mockHeight,
        mockWidth,
    );
    mockCircle.setCoordinates(100, 100);
    mockCircle.draw(canvasComponent);

    canvasComponent.onClickGetColor((color) => {
      expect(color).toBe('rgb(0, 0, 0)');
      done();
    });

    mockCanvas.dispatchEvent(new MouseEvent('click', {
      clientX: 100,
      clientY: 100,
    }));
  });
});
