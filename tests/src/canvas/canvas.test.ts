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
    );
    canvasComponent.setMaxWidthAndHeight(mockHeight, mockWidth);

    expect(canvasComponent.getContext()).toBe(mockCanvas.getContext('2d'));
  });

  it('should not be able to get draw context', () => {
    const mockCanvas = document.createElement('canvas');
    mockCanvas.getContext = () => null;
    const canvasComponent = new CanvasComponent(
        mockCanvas,
    );
    canvasComponent.setMaxWidthAndHeight(mockHeight, mockWidth);

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
    );
    canvasComponent.setMaxWidthAndHeight(mockHeight, mockWidth);
    (canvasComponent as any).$hitEl = mockHitCanvas;
    mockCircle.setCoordinates(100, 100);

    expect(() => mockCircle.draw(canvasComponent))
        .toThrow(new Error('Cannot get 2d context'));
  });

  it('should be able to get next color', () => {
    const mockCanvas = document.createElement('canvas');
    const canvasComponent = new CanvasComponent(
        mockCanvas,
    );
    canvasComponent.setMaxWidthAndHeight(mockHeight, mockWidth);

    const nextColor = canvasComponent.getNextColor();
    expect(nextColor).toBe('rgb(0, 0, 1)');
  });

  it('should be able to get the color on click', (done) => {
    const mockCanvas = document.createElement('canvas');
    const mockCircle = new Circle('1', 20, getRandomColor());
    const canvasComponent = new CanvasComponent(
        mockCanvas,
    );
    canvasComponent.setMaxWidthAndHeight(mockHeight, mockWidth);
    mockCircle.setCoordinates(100, 100);
    mockCircle.draw(canvasComponent);

    canvasComponent.onClick((color) => {
      expect(color).toBe('rgb(0, 0, 0)');
      done();
    });

    mockCanvas.dispatchEvent(new MouseEvent('click', {
      clientX: 0,
      clientY: 0,
    }));
  });

  it('should be able to remove old on click listener', (done) => {
    const mockCanvas = document.createElement('canvas');
    const mockCircle = new Circle('1', 20, getRandomColor());
    const canvasComponent = new CanvasComponent(
        mockCanvas,
    );
    const mockFirstCallback = jest.fn();
    canvasComponent.setMaxWidthAndHeight(mockHeight, mockWidth);
    mockCircle.setCoordinates(100, 100);
    mockCircle.draw(canvasComponent);

    canvasComponent.onClick(mockFirstCallback);
    canvasComponent.onClick((color) => {
      expect(color).toBe('rgb(0, 0, 0)');
      expect(mockFirstCallback).toBeCalledTimes(0);
      done();
    });

    mockCanvas.dispatchEvent(new MouseEvent('click', {
      clientX: 0,
      clientY: 0,
    }));
  });

  it('should be able to get the color on hover', (done) => {
    const mockCanvas = document.createElement('canvas');
    const mockCircle = new Circle('1', 20, getRandomColor());
    const canvasComponent = new CanvasComponent(
        mockCanvas,
    );
    canvasComponent.setMaxWidthAndHeight(mockHeight, mockWidth);
    mockCircle.setCoordinates(100, 100);
    mockCircle.draw(canvasComponent);

    canvasComponent.onHover((color) => {
      expect(color).toBe('rgb(0, 0, 0)');
      done();
    });

    mockCanvas.dispatchEvent(new MouseEvent('mousemove', {
      clientX: 0,
      clientY: 0,
    }));
    mockCanvas.dispatchEvent(new MouseEvent('mousemove', {
      clientX: 1,
      clientY: 1,
    }));
  });

  it('should remove old hover event listeners', (done) => {
    const mockCanvas = document.createElement('canvas');
    const mockCircle = new Circle('1', 20, getRandomColor());
    const canvasComponent = new CanvasComponent(
        mockCanvas,
    );
    const mockFirstCallback = jest.fn();
    canvasComponent.setMaxWidthAndHeight(mockHeight, mockWidth);
    mockCircle.setCoordinates(100, 100);
    mockCircle.draw(canvasComponent);

    canvasComponent.onHover(mockFirstCallback);
    canvasComponent.onHover((color) => {
      expect(color).toBe('rgb(0, 0, 0)');
      expect(mockFirstCallback).toBeCalledTimes(0);
      done();
    });

    mockCanvas.dispatchEvent(new MouseEvent('mousemove', {
      clientX: 0,
      clientY: 0,
    }));
    mockCanvas.dispatchEvent(new MouseEvent('mousemove', {
      clientX: 1,
      clientY: 1,
    }));
  });
});
