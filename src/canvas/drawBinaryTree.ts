import BinaryTreeNode from '../tree/BinaryTreeNode';
import {VisualizationType} from '../enumns/VisualizationType';
import drawPrettyBinaryTree from './drawPrettyBinaryTree';
import drawExpandableBinaryTree from './drawExpandableBinaryTree';
import drawSimpleBinaryTree from './drawSimpleBinaryTree';
import {MainInputOptions} from './types';
import CanvasComponent from './Canvas';

// For keeping track of canvas components for canvas elements
const canvasMap: Map<HTMLCanvasElement, CanvasComponent> = new Map();

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
    maxHeight = window.innerHeight,
    maxWidth = window.innerWidth,
  } = options;

  const canvasComponent = canvasMap.get(canvasElement) ||
  new CanvasComponent(canvasElement);
  canvasMap.set(canvasElement, canvasComponent);

  switch (type) {
    case VisualizationType.PRETTY:
      drawPrettyBinaryTree(root, canvasComponent, {
        maxHeight,
        maxWidth,
      });
      break;

    case VisualizationType.EXPANDABLE:
      drawExpandableBinaryTree(root, canvasComponent, {
        maxHeight,
        maxWidth,
      });
      break;

    case VisualizationType.HIGHLIGHT:
      drawPrettyBinaryTree(root, canvasComponent, {
        maxHeight,
        maxWidth,
        highlightMode: true,
      });
      break;

    default:
      drawSimpleBinaryTree(root, canvasComponent, {
        maxHeight,
        maxWidth,
      });
      break;
  }
}

export default drawBinaryTree;
