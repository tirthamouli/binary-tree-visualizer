/**
 * @jest-environment jsdom
 */
import {CanvasComponent} from '../../../src';
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
  let mockComp: CanvasComponent;
  let mockCtx: any;
  const growRadiusTimes = (circle: Circle, times: number) => {
    for (let i = 0; i < times; i+=1) {
      circle.grow();
    }
  };
  const shrinkRadiusTimes = (circle: Circle, times: number) => {
    for (let i = 0; i < times; i+=1) {
      circle.shrink();
    }
  };
  const restoreRadiusTimes = (circle: Circle, times: number) => {
    for (let i = 0; i < times; i+=1) {
      circle.restoreCircle();
    }
  };

  beforeEach(() => {
    const $el = document.createElement('canvas');
    mockCtx = {
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      bezierCurveTo: jest.fn(),
      stroke: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn(),
      fillText: jest.fn(),
    };
    $el.getContext = jest.fn().mockReturnValue(mockCtx);

    mockComp = new CanvasComponent($el);
  });

  it('should initialize a proper circle', () => {
    const circle = new Circle(mockValue, mockRadius, mockColorSettings);

    expect((circle as any).value).toBe(mockValue);
    expect((circle as any).colorSettings).toStrictEqual(mockColorSettings);
    expect(circle.getRadius()).toBe(mockRadius);
  });

  it('should be able to set coordinates', () => {
    const circle = new Circle(mockValue, mockRadius, mockColorSettings);
    circle.setCoordinates(mockX, mockY);

    expect((circle as any).x).toBe(mockX);
    expect((circle as any).y).toBe(mockY);
  });

  it('should be able to draw the circle (normal font)', () => {
    const circle = new Circle(mockValue, mockRadius, mockColorSettings);
    circle.draw(mockComp);

    expect(mockCtx.font).toBe(`10pt ${theme.textFont}`);
    expect(mockCtx.beginPath).toBeCalledTimes(1);
    expect(mockCtx.arc).toBeCalledTimes(2);
    expect(mockCtx.fill).toBeCalledTimes(1);
    expect(mockCtx.stroke).toBeCalledTimes(1);
    expect(mockCtx.fillText).toBeCalledTimes(1);
  });

  it('should be able to draw the circle (small font)', () => {
    const circle = new Circle('10', mockRadius, mockColorSettings);
    circle.draw(mockComp);

    expect(mockCtx.font).toBe(`10pt ${theme.textFont}`);
    expect(mockCtx.beginPath).toBeCalledTimes(1);
    expect(mockCtx.arc).toBeCalledTimes(2);
    expect(mockCtx.fill).toBeCalledTimes(1);
    expect(mockCtx.stroke).toBeCalledTimes(1);
    expect(mockCtx.fillText).toBeCalledTimes(1);
  });

  it('should be able to set color id', () => {
    const circle = new Circle(mockValue, mockRadius, mockColorSettings);
    circle.setCoordinates(mockX, mockY);
    circle.setColorId('mock-color-id');

    expect((circle as any).colorId).toBe('mock-color-id');
  });

  it('should be able to grow the circle', () => {
    const circle = new Circle(mockValue, mockRadius, mockColorSettings);
    circle.setCoordinates(mockX, mockY);

    expect(circle.getRadius()).toBe(20);
    growRadiusTimes(circle, 1);
    expect(circle.getRadius()).toBe(20.3);
    growRadiusTimes(circle, 20);
    expect(circle.getRadius()).toBe(25);
  });

  it('should be able to shrink the circle', () => {
    const circle = new Circle(mockValue, mockRadius, mockColorSettings);
    circle.setCoordinates(mockX, mockY);

    expect(circle.getRadius()).toBe(20);
    shrinkRadiusTimes(circle, 1);
    expect(circle.getRadius()).toBe(19.7);
    shrinkRadiusTimes(circle, 20);
    expect(circle.getRadius()).toBe(16);
  });

  it('should be able to restore the circle (grow)', () => {
    const circle = new Circle(mockValue, mockRadius, mockColorSettings);
    circle.setCoordinates(mockX, mockY);

    shrinkRadiusTimes(circle, 20);
    restoreRadiusTimes(circle, 20);
    expect(circle.getRadius()).toBe(20);
  });

  it('should be able to restore the circle (shrink)', () => {
    const circle = new Circle(mockValue, mockRadius, mockColorSettings);
    circle.setCoordinates(mockX, mockY);

    growRadiusTimes(circle, 20);
    restoreRadiusTimes(circle, 20);
    expect(circle.getRadius()).toBe(20);
  });
});
