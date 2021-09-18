/**
 * @jest-environment jsdom
 */
import BinaryTreeNode from '../../../src/tree/BinaryTreeNode';
import drawExpandableBinaryTree from
  '../../../src/canvas/drawExpandableBinaryTree';

describe('drawExpandableBinaryTree tests', () => {
  const mockBinaryTreeNode = new BinaryTreeNode<number>(100);
  const mockCanvas = document.createElement('canvas');

  // @Todo: Update this once implemented
  it('should throw error as it is not implemented', () => {
    try {
      drawExpandableBinaryTree(mockBinaryTreeNode, mockCanvas, {
        maxHeigth: 1080,
        maxWidth: 1920,
      });
    } catch (err) {
      expect(err).toStrictEqual(new Error('Not yet implemented'));
    }
  });
});

