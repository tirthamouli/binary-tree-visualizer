/**
 * @jest-environment jsdom
 */
import CanvasComponent from '../../../src/canvas/Canvas';

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

    expect(canvasComponent.$el).toBe(mockCanvas);
    expect(canvasComponent.getContext()).toBe(mockCanvas.getContext('2d'));
  });

  it('should not be able to get context', () => {
    const mockCanvas = document.createElement('canvas');
    mockCanvas.getContext = () => null;
    const canvasComponent = new CanvasComponent(
        mockCanvas,
        mockHeight,
        mockWidth,
    );

    try {
      canvasComponent.getContext();
    } catch (err) {
      expect(err).toStrictEqual(new Error('Cannot get 2d context'));
    }
  });
});
