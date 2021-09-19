import CanvasComponent from './Canvas';
import BinaryTreeNode from '../tree/BinaryTreeNode';
import theme from '../config/theme';
import {
  getCanvasHeightFromTreeHeight,
  getMaxLeafNodesFromHeight,
  getRequiredAndActualHeightandWidth,
} from '../utils/tree';
import {
  HorizontalStartAndEndInput,
  IndividualInputOptions,
} from './types';
import connectPointsWithBezierCurve from './connectPointsWithBezierCurve';

/**
 * Recursively draw all the nodes
 *
 * @param {BinaryTreeNode<string | number>} root
 * @param {CanvasComponent} canvasComponent
 * @param {number} currentLine
 * @param {HorizontalStartAndEndInput} horizontalConfig
 */
function recursivelyDrawNodes(
    root: BinaryTreeNode<string | number>,
    canvasComponent: CanvasComponent,
    currentLine: number,
    horizontalConfig: HorizontalStartAndEndInput,
) {
  // X Calculation
  const {xStart, xEnd} = horizontalConfig;
  const xPosition = (xStart + xEnd) / 2;

  // Y Calculation
  const yPosition = currentLine * theme.lineHeight;

  // Draw the node
  root.nodeCircle.setCoordinates(xPosition, yPosition);
  root.nodeCircle.draw(canvasComponent.getContext());


  // Draw the left child nodes
  // Radius is added and subtracted from y to move the line outside the circle
  if (root.left) {
    recursivelyDrawNodes(root.left, canvasComponent, currentLine+1, {
      xStart,
      xEnd: xPosition,
    });
    connectPointsWithBezierCurve(canvasComponent, {
      xStart: xPosition,
      xEnd: (xStart + xPosition) / 2,
    }, {
      yStart: yPosition + theme.radius,
      yEnd: getCanvasHeightFromTreeHeight(currentLine + 1) - theme.radius,
    });
  }

  if (root.right) {
    recursivelyDrawNodes(root.right, canvasComponent, currentLine+1, {
      xStart: xPosition,
      xEnd,
    });
    connectPointsWithBezierCurve(canvasComponent, {
      xStart: xPosition,
      xEnd: (xPosition + xEnd) / 2,
    }, {
      yStart: yPosition + theme.radius,
      yEnd: getCanvasHeightFromTreeHeight(currentLine + 1) - theme.radius,
    });
  }
}

/**
 * Draw an explandable binary tree
 *
 * @param {BinaryTreeNode<string | number>} root
 * @param {HTMLCanvasElement} canvasElement
 * @param {IndividualInputOptions} options
 */
function drawSimpleBinaryTree(
    root: BinaryTreeNode<string | number>,
    canvasElement: HTMLCanvasElement,
    options: IndividualInputOptions,
) {
  const heightOfTree = root.getHeight();
  const maxNumberOfLeafNodes = getMaxLeafNodesFromHeight(heightOfTree);
  const {maxHeigth, maxWidth} = options;

  // Max height and width requirements
  const {
    maxCanvasWidthRequired,
    actualMaxHeight,
    actualMaxWidth,
  } = getRequiredAndActualHeightandWidth(
      maxNumberOfLeafNodes,
      heightOfTree,
      maxWidth,
      maxHeigth,
  );

  // Init calculation
  const midPointInCanvas = actualMaxWidth / 2;
  const xStart = (midPointInCanvas - maxCanvasWidthRequired / 2) +
  theme.leafNodeSpace;
  const xEnd = (midPointInCanvas + maxCanvasWidthRequired / 2) -
  theme.leafNodeSpace;

  // Initialize the canvas
  const canvasComponent = new CanvasComponent(
      canvasElement,
      actualMaxHeight,
      actualMaxWidth,
  );

  // Recursively draw the tree
  recursivelyDrawNodes(root, canvasComponent, 0.5, {xStart, xEnd});
}

export default drawSimpleBinaryTree;
