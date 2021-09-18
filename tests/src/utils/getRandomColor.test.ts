import getRandomColor from '../../../src/utils/getRandomColor';

describe('getRandomColor tests', () => {
  it('should get random color from color array only', () => {
    const color = getRandomColor();
    expect(color).toStrictEqual({
      'bgColor': '#fff2e0',
      'borderColor': '#f56042',
    });
  });
});
