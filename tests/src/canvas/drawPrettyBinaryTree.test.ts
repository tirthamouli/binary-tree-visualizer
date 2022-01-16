/**
 * @jest-environment jsdom
 */
import connectPointsWithBezierCurve from
  '../../../src/utils/connectPointsWithBezierCurve';
import drawPrettyBinaryTree from '../../../src/canvas/drawPrettyBinaryTree';
import BinaryTreeNode from '../../../src/tree/BinaryTreeNode';
import CanvasComponent from '../../../src/canvas/Canvas';

jest.mock('../../../src/utils/connectPointsWithBezierCurve');

describe('drawPrettyBinaryTree tests', () => {
  const mockBinaryTreeNode = new BinaryTreeNode<number>(100);
  const mockCanvas = document.createElement('canvas');
  const mockCanvasComponent = new CanvasComponent(mockCanvas);
  mockBinaryTreeNode.setLeft(new BinaryTreeNode(200));
  mockBinaryTreeNode.left?.setLeft(new BinaryTreeNode(300));
  mockBinaryTreeNode.left?.setRight(new BinaryTreeNode(400));
  mockBinaryTreeNode.setRight(new BinaryTreeNode(500));

  beforeEach(
      () => {
        (connectPointsWithBezierCurve as
        jest.MockedFunction<typeof connectPointsWithBezierCurve>).mockClear();
        jest.spyOn(
            window,
            'requestAnimationFrame',
        ).mockImplementation((cb) => {
          cb(0);
          return 1;
        });
      },
  );
  afterEach(() => {
    (window.requestAnimationFrame as
      jest.MockedFunction<typeof window.requestAnimationFrame>).mockRestore();
  });

  it('should be able to draw a pretty binary tree', () => {
    drawPrettyBinaryTree(mockBinaryTreeNode, mockCanvasComponent, {
      maxHeight: 1080,
      maxWidth: 1920,
    });
    mockCanvas.dispatchEvent(new MouseEvent('mousemove', {
      clientX: 960,
      clientY: 10,
    }));

    expect(connectPointsWithBezierCurve).toBeCalledTimes(8);
  });
});
