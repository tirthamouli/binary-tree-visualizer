import ColorGenerator from '../../../src/helpers/ColorGenerator';

describe('ColorGenerator tests', () => {
  const skipColor = (colorGenerator: ColorGenerator, times: number) => {
    for (let i = 0; i < times; i+=1) {
      colorGenerator.getNextColor();
    }
  };

  it('should be able to initialize a new color generator', () => {
    const colorGenerator = new ColorGenerator();

    const firstColor = colorGenerator.getNextColor();

    skipColor(colorGenerator, 255);
    const secondColor = colorGenerator.getNextColor();

    skipColor(colorGenerator, 200*200);
    const thirdColor = colorGenerator.getNextColor();

    expect(firstColor).toBe('rgb(0, 0, 1)');
    expect(secondColor).toBe('rgb(0, 100, 1)');
    expect(thirdColor).toBe('rgb(98, 104, 139)');
  });
});
