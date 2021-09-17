import BinaryTreeNode from '../tree/BinaryTreeNode';
import {VisualizationType} from '../enumns/VisualizationType';
import drawPrettyBinaryTree from './drawPrettyBinaryTree';
import drawExpandableBinaryTree from './drawExpandableBinaryTree';
import drawSimpleBinaryTree from './drawSimpleBinaryTree';
import {MainInputOptions} from './types';


/**
 * Draw a binary tree in one of the given types
 *
 * @param {BinaryTreeNode<string | number>} root
 * @param {HTMLCanvasElement} canvasElement
 * @param {Partial<MainInputOptions>} options
 */
function drawBinaryTree(
    root: BinaryTreeNode<string | number>,
    canvasElement: HTMLCanvasElement,
    options: Partial<MainInputOptions> = {},
) {
  const {
    type = VisualizationType.SIMPLE,
    maxHeigth = window.innerHeight,
    maxWidth = window.innerWidth,
  } = options;

  switch (type) {
    case VisualizationType.PRETTY:
      drawPrettyBinaryTree(root, canvasElement, {
        maxHeigth,
        maxWidth,
      });
      break;

    case VisualizationType.EXPANDABLE:
      drawExpandableBinaryTree(root, canvasElement, {
        maxHeigth,
        maxWidth,
      });
      break;

    default:
      drawSimpleBinaryTree(root, canvasElement, {
        maxHeigth,
        maxWidth,
      });
      break;
  }
}

export default drawBinaryTree;
