import theme from '../../../src/config/theme';
import Circle from '../../../src/shapes/Circle';

describe('Circle tests', () => {
  const mockRadius = 20;
  const mockColorSettings = {
    bgColor: 'mock-color-1',
    borderColor: 'mock-color-2',
  };
  const mockValue = '1000';
  const mockX = 120;
  const mockY = 140;

  let mockCtx: any;

  beforeEach(() => {
    mockCtx = {
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      bezierCurveTo: jest.fn(),
      stroke: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn(),
      fillText: jest.fn(),
    };
  });

  it('should initialize a proper circle', () => {
    const circle = new Circle(mockValue, mockRadius, mockColorSettings);

    expect(circle.value).toBe(mockValue);
    expect(circle.colorSettings).toStrictEqual(mockColorSettings);
    expect(circle.radius).toBe(mockRadius);
  });

  it('should be able to set coordinates', () => {
    const circle = new Circle(mockValue, mockRadius, mockColorSettings);
    circle.setCoordinates(mockX, mockY);

    expect(circle.x).toBe(mockX);
    expect(circle.y).toBe(mockY);
  });

  it('should be able to draw the circle (normal font)', () => {
    const circle = new Circle(mockValue, mockRadius, mockColorSettings);
    circle.draw(mockCtx);

    expect(mockCtx.font).toBe(`8pt ${theme.textFont}`);
    expect(mockCtx.beginPath).toBeCalledTimes(1);
    expect(mockCtx.arc).toBeCalledTimes(2);
    expect(mockCtx.fill).toBeCalledTimes(1);
    expect(mockCtx.stroke).toBeCalledTimes(1);
    expect(mockCtx.fillText).toBeCalledTimes(1);
  });

  it('should be able to draw the circle (small font)', () => {
    const circle = new Circle('10', mockRadius, mockColorSettings);
    circle.draw(mockCtx);

    expect(mockCtx.font).toBe(`10pt ${theme.textFont}`);
    expect(mockCtx.beginPath).toBeCalledTimes(1);
    expect(mockCtx.arc).toBeCalledTimes(2);
    expect(mockCtx.fill).toBeCalledTimes(1);
    expect(mockCtx.stroke).toBeCalledTimes(1);
    expect(mockCtx.fillText).toBeCalledTimes(1);
  });
});
