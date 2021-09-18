/**
 * @jest-environment jsdom
 */
import connectPointsWithBezierCurve from
  '../../../src/canvas/connectPointsWithBezierCurve';
import drawSimpleBinaryTree from '../../../src/canvas/drawSimpleBinaryTree';
import BinaryTreeNode from '../../../src/tree/BinaryTreeNode';

jest.mock('../../../src/canvas/connectPointsWithBezierCurve');


describe('drawSimpleBinaryTree tests', () => {
  const mockBinaryTreeNode = new BinaryTreeNode<number>(100);
  mockBinaryTreeNode.setLeft(new BinaryTreeNode(200));
  mockBinaryTreeNode.left?.setLeft(new BinaryTreeNode(300));
  mockBinaryTreeNode.left?.setRight(new BinaryTreeNode(400));
  mockBinaryTreeNode.setRight(new BinaryTreeNode(500));
  const mockCanvas = document.createElement('canvas');

  beforeEach(
      () => {
        (connectPointsWithBezierCurve as
          jest.MockedFunction<typeof connectPointsWithBezierCurve>).mockClear();
      },
  );

  it('should be able to draw when max width and height are greater', () => {
    drawSimpleBinaryTree(mockBinaryTreeNode, mockCanvas, {
      maxHeigth: 1080,
      maxWidth: 1920,
    });

    expect(connectPointsWithBezierCurve).toBeCalledTimes(4);
  });

  it('should be able to draw when max width and height are lesser', () => {
    drawSimpleBinaryTree(mockBinaryTreeNode, mockCanvas, {
      maxHeigth: 10,
      maxWidth: 20,
    });

    expect(connectPointsWithBezierCurve).toBeCalledTimes(4);
  });
});

