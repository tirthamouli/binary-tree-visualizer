import theme, {setTheme} from '../../../src/config/theme';

describe('Theme tests', () => {
  it('should be able to set radius', () => {
    const mockValue = 30;
    setTheme({
      radius: mockValue,
    });

    expect(theme.radius).toBe(mockValue);
  });

  it('should be able to set leaf node spacing', () => {
    const mockValue = 200;
    setTheme({
      leafNodeSpace: mockValue,
    });

    expect(theme.leafNodeSpace).toBe(mockValue);
  });

  it('should be able to set line height', () => {
    const mockValue = 200;
    setTheme({
      lineHeight: mockValue,
    });

    expect(theme.lineHeight).toBe(mockValue);
  });

  it('should be able to set text font', () => {
    const mockValue = 'mock-font';
    setTheme({
      textFont: mockValue,
    });

    expect(theme.textFont).toBe(mockValue);
  });

  it('should be able to set stroke color', () => {
    const mockValue = 'mock-stroke-color';
    setTheme({
      strokeColor: mockValue,
    });

    expect(theme.strokeColor).toBe(mockValue);
  });

  it('should be able to set color array', () => {
    const mockValue = [
      {bgColor: 'mock-color-1', borderColor: 'mock-color-1'},
      {bgColor: 'mock-color-2', borderColor: 'mock-color-2'},
    ];
    setTheme({
      colorArray: mockValue,
    });

    expect(theme.colorArray).toStrictEqual(mockValue);
  });
});
