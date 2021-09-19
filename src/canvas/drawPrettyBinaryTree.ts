import {CanvasComponent} from '.';
import theme from '../config/theme';
import BinaryTreeNode from '../tree/BinaryTreeNode';
import {Point} from '../types/Point';
import {
  getCanvasHeightFromTreeHeight,
  getRequiredAndActualHeightandWidth,
  getXPositionFromGivenHorizontalNodePosition,
} from '../utils/tree';
import connectPointsWithBezierCurve from './connectPointsWithBezierCurve';
import {
  IndividualInputOptions,
  LeftAndRightSpacing,
} from './types';

/**
 * Spacing map for storing space requirements
 */
let spacingMap: Map<BinaryTreeNode<string | number>, LeftAndRightSpacing>;

/**
 * Recursively draw all the nodes for a pretty tree
 *
 * @param {BinaryTreeNode<string | number>} root
 * @param {CanvasComponent} canvasComponent
 * @param {Point} position
 */
function recursivelyDrawNodes(
    root: BinaryTreeNode<string | number>,
    canvasComponent: CanvasComponent,
    position: Point,
) {
  const {x: xPosition, y: yPosition} = position;

  // Draw the node
  root.nodeCircle.setCoordinates(xPosition, yPosition);
  root.nodeCircle.draw(canvasComponent.getContext());

  // Root spacings
  const {left, right} = spacingMap.get(root)!;

  // Draw the left child
  if (root.left) {
    const leftOfLeft = spacingMap.get(root.left)!.left;
    const childYPosition = yPosition + theme.lineHeight;
    const leftPosition = {
      x: xPosition - getXPositionFromGivenHorizontalNodePosition(
          left - leftOfLeft,
      ),
      y: childYPosition,
    };

    recursivelyDrawNodes(
        root.left,
        canvasComponent,
        leftPosition,
    );
    connectPointsWithBezierCurve(canvasComponent, {
      xStart: xPosition,
      xEnd: leftPosition.x,
    }, {
      yStart: yPosition + theme.radius,
      yEnd: childYPosition - theme.radius,
    });
  }

  // Draw the right child
  if (root.right) {
    const rightOfRight = spacingMap.get(root.right)!.right;
    const childYPosition = yPosition + theme.lineHeight;
    const rightPosition = {
      x: xPosition + getXPositionFromGivenHorizontalNodePosition(
          right - rightOfRight,
      ),
      y: childYPosition,
    };

    recursivelyDrawNodes(
        root.right,
        canvasComponent,
        rightPosition,
    );
    connectPointsWithBezierCurve(canvasComponent, {
      xStart: xPosition,
      xEnd: rightPosition.x,
    }, {
      yStart: yPosition + theme.radius,
      yEnd: childYPosition - theme.radius,
    });
  }
}

/**
 * Calculates the spacing required recursively
 *
 * @param {BinaryTreeNode<string | number>} root
 * @return {number} - The spacing requirement of that node
 */
function calculateSpacingMapRecursively(
    root: BinaryTreeNode<string | number>,
): number {
  const left = root.left ? calculateSpacingMapRecursively(root.left) + 1: 0;
  const right = root.right ? calculateSpacingMapRecursively(root.right) + 1: 0;
  spacingMap.set(root, {
    left,
    right,
  });

  return left + right;
}

/**
 * Draw an explandable binary tree
 *
 * @param {BinaryTreeNode<string | number>} root
 * @param {HTMLCanvasElement} canvasElement
 * @param {IndividualInputOptions} options
 */
function drawPrettyBinaryTree(
    root: BinaryTreeNode<string | number>,
    canvasElement: HTMLCanvasElement,
    options: IndividualInputOptions,
) {
  spacingMap = new Map();
  const maxNodeSpacing = calculateSpacingMapRecursively(root);
  const heightOfTree = root.getHeight();
  const {maxHeigth, maxWidth} = options;

  // Calculate canvas spacing requirements
  const {
    maxCanvasWidthRequired,
    actualMaxHeight,
    actualMaxWidth,
  } = getRequiredAndActualHeightandWidth(
      maxNodeSpacing,
      heightOfTree,
      maxWidth,
      maxHeigth,
  );

  // Init calculation
  const left = spacingMap.get(root)!.left;
  const midPointInCanvas = actualMaxWidth / 2;
  const xStart = midPointInCanvas - maxCanvasWidthRequired / 2;

  // Initialize the canvas
  const canvasComponent = new CanvasComponent(
      canvasElement,
      actualMaxHeight,
      actualMaxWidth,
  );

  // Recursively draw all nodes
  recursivelyDrawNodes(root, canvasComponent, {
    x: xStart + getXPositionFromGivenHorizontalNodePosition(left+1),
    y: getCanvasHeightFromTreeHeight(0.5),
  });
}

export default drawPrettyBinaryTree;
