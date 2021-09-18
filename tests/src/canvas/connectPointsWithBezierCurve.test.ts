/**
 * @jest-environment jsdom
 */
import CanvasComponent from '../../../src/canvas/Canvas';
import connectPointsWithBezierCurve from
  '../../../src/canvas/connectPointsWithBezierCurve';
import BezierCurve from '../../../src/strokes/BezierCurve';

jest.mock('../../../src/strokes/BezierCurve');

describe('connectPointsWithBezierCurve tests', () => {
  const mockCanvas = document.createElement('canvas');
  const mockWidth = 1920;
  const mockHeight = 1080;
  const mockCanvasComponent = new CanvasComponent(
      mockCanvas,
      mockHeight,
      mockWidth,
  );
  const mockHorizontalConfig = {
    xStart: 100,
    xEnd: 200,
  };
  const mockVerticalConfig = {
    yStart: 200,
    yEnd: 300,
  };

  it('should be able to connect 2 point', () => {
    connectPointsWithBezierCurve(
        mockCanvasComponent,
        mockHorizontalConfig,
        mockVerticalConfig,
    );

    expect(BezierCurve).toBeCalledTimes(1);
  });
});

