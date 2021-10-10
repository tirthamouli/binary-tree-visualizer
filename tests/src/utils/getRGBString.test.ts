import getRGBString from '../../../src/utils/getRGBString';

describe('getRGBString tests', () => {
  it('should be able to get rgb string', () => {
    const res = getRGBString(1, 2, 3);
    expect(res).toBe('rgb(1, 2, 3)');
  });
});
