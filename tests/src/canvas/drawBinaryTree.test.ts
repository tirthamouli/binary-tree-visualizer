/**
 * @jest-environment jsdom
 */
import drawBinaryTree from '../../../src/canvas/drawBinaryTree';
import drawPrettyBinaryTree from '../../../src/canvas/drawPrettyBinaryTree';
import drawSimpleBinaryTree from '../../../src/canvas/drawSimpleBinaryTree';
import {VisualizationType} from '../../../src/enumns/VisualizationType';
import BinaryTreeNode from '../../../src/tree/BinaryTreeNode';
import drawExpandableBinaryTree from
  '../../../src/canvas/drawExpandableBinaryTree';

jest.mock('../../../src/canvas/drawSimpleBinaryTree');
jest.mock('../../../src/canvas/drawPrettyBinaryTree');
jest.mock('../../../src/canvas/drawExpandableBinaryTree');

describe('drawBinaryTree tests', () => {
  const mockBinaryTreeNode = new BinaryTreeNode<number>(30);
  const mockCanvas = document.createElement('canvas');
  const mockMaxWidth = 1920;
  const mockMaxHeight = 1080;

  it('should be able to draw simple binary tree', () => {
    drawBinaryTree(mockBinaryTreeNode, mockCanvas);
    expect(drawSimpleBinaryTree).toBeCalled();
  });

  it('should be able to draw pretty binary tree', () => {
    drawBinaryTree(mockBinaryTreeNode, mockCanvas, {
      type: VisualizationType.PRETTY,
      maxHeight: mockMaxHeight,
      maxWidth: mockMaxWidth,
    });
    expect(drawPrettyBinaryTree).toBeCalled();
  });

  it('should be able to draw expandable binary tree', () => {
    drawBinaryTree(mockBinaryTreeNode, mockCanvas, {
      type: VisualizationType.EXPANDABLE,
    });
    expect(drawExpandableBinaryTree).toBeCalled();
  });

  it('should be able to draw highlight binary tree', () => {
    drawBinaryTree(mockBinaryTreeNode, mockCanvas, {
      type: VisualizationType.HIGHLIGHT,
    });
    expect(drawPrettyBinaryTree).toBeCalled();
  });
});


