import CanvasComponent from './canvas';
import BinaryTreeNode from '../tree/BinaryTreeNode';
import {VisualizationType} from '../enumns/VisualizationType';
import drawPrettyBinaryTree from './drawPrettyBinaryTree';
import drawExpandableBinaryTree from './drawExpandableBinaryTree';
import drawSimpleBinaryTree from './drawSimpleBinaryTree';

/**
 * Draw a binary tree
 *
 * @param {BinaryTreeNode} root
 * @param {CanvasComponent} canvasComponent
 * @param {VisualizationType} type
 */
function drawBinaryTree(
    root: BinaryTreeNode,
    canvasComponent: CanvasComponent,
    type: VisualizationType,
) {
  switch (type) {
    case VisualizationType.PRETTY:
      drawPrettyBinaryTree(root, canvasComponent);
      break;

    case VisualizationType.EXPANDABLE:
      drawExpandableBinaryTree(root, canvasComponent);
      break;

    default:
      drawSimpleBinaryTree(root, canvasComponent);
      break;
  }
}

export default drawBinaryTree;
