/**
 * @jest-environment jsdom
 */
import drawPrettyBinaryTree from '../../../src/canvas/drawPrettyBinaryTree';
import BinaryTreeNode from '../../../src/tree/BinaryTreeNode';


describe('drawPrettyBinaryTree tests', () => {
  const mockBinaryTreeNode = new BinaryTreeNode<number>(100);
  const mockCanvas = document.createElement('canvas');

  // @Todo: Update this once implemented
  it('should throw error as it is not implemented', () => {
    try {
      drawPrettyBinaryTree(mockBinaryTreeNode, mockCanvas, {
        maxHeigth: 1080,
        maxWidth: 1920,
      });
    } catch (err) {
      expect(err).toStrictEqual(new Error('Not yet implemented'));
    }
  });
});
