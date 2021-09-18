import theme from '../../../src/config/theme';
import {
  getCanvasHeightFromTreeHeight,
  getCanvasWidthFromMaxLeafNodes,
  getMaxLeafNodesFromHeight,
} from '../../../src/utils/tree';

describe('Tree utils test', () => {
  describe('getMaxLeafNodesFromHeight test', () => {
    it('should get max leaf nodes from height', () => {
      const mockTreeHeight = 12;
      const expectedResult = 2 ** 11;
      expect(getMaxLeafNodesFromHeight(mockTreeHeight)).toBe(expectedResult);
    });
  });

  describe('getCanvasWidthFromMaxLeafNodes', () => {
    it('should get canvas width from the max leaf nodes', () => {
      const mockLeafNodes = 4;
      const expectedResult = 6 * theme.leafNodeSpace;
      expect(
          getCanvasWidthFromMaxLeafNodes(mockLeafNodes),
      ).toBe(expectedResult);
    });
  });

  describe('getCanvasHeightFromTreeHeight', () => {
    it('should be able to get canvas height from tree height', () => {
      const mockTreeHeight = 12;
      const expectedResult = 12 * theme.lineHeight;
      expect(
          getCanvasHeightFromTreeHeight(mockTreeHeight),
      ).toBe(expectedResult);
    });
  });
});
