import BezierCurve from '../../../src/strokes/BezierCurve';

describe('BezierCurve tests', () => {
  const mockColor = 'mock-color';
  const mockStart = {
    x: 0,
    y: 1,
  };
  const mockCp1 = {
    x: 2,
    y: 3,
  };
  const mockCp2 = {
    x: 4,
    y: 5,
  };
  const mockEnd = {
    x: 6,
    y: 7,
  };
  const mockCtx: any = {
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    bezierCurveTo: jest.fn(),
    stroke: jest.fn(),
  };

  it('should initialize a proper bezier curve and be able to draw it', () => {
    const bezierCurve = new BezierCurve(
        mockColor,
        mockStart,
        mockCp1,
        mockCp2,
        mockEnd,
    );
    bezierCurve.draw(mockCtx);

    expect(bezierCurve.color).toBe(mockColor);
    expect(bezierCurve.xStart).toBe(mockStart.x);
    expect(bezierCurve.yStart).toBe(mockStart.y);
    expect(bezierCurve.cp1x).toBe(mockCp1.x);
    expect(bezierCurve.cp1y).toBe(mockCp1.y);
    expect(bezierCurve.cp2x).toBe(mockCp2.x);
    expect(bezierCurve.cp2y).toBe(mockCp2.y);
    expect(bezierCurve.xEnd).toBe(mockEnd.x);
    expect(bezierCurve.yEnd).toBe(mockEnd.y);

    expect(mockCtx.beginPath).toBeCalled();
    expect(mockCtx.moveTo).toBeCalledWith(mockStart.x, mockStart.y);
    expect(mockCtx.bezierCurveTo).toBeCalledWith(
        mockCp1.x,
        mockCp1.y,
        mockCp2.x,
        mockCp2.y,
        mockEnd.x,
        mockEnd.y,
    );
    expect(mockCtx.stroke).toBeCalled();
  });
});
