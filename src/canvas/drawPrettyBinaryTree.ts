import CanvasComponent from './Canvas';
import theme from '../config/theme';
import BinaryTreeNode from '../tree/BinaryTreeNode';
import {Point} from '../types/Point';
import {
  getCanvasHeightFromTreeHeight,
  getRequiredAndActualHeightAndWidth,
  getXPositionFromGivenHorizontalNodePosition,
} from '../utils/tree';
import connectPointsWithBezierCurve
  from '../utils/connectPointsWithBezierCurve';
import {
  IndividualInputOptions,
  LeftAndRightSpacing,
} from './types';

/**
 * The current animation frame that is going on
 */
let animationFrameId: number;

/**
 * Current color that is being hovered on
 */
let hoveredColorId: string;

/**
 * Spacing map for storing space requirements
 */
let spacingMap: Map<BinaryTreeNode<string | number>, LeftAndRightSpacing>;

/**
 * Clear the existing animation frame if any and request an animation frame
 *
 * @param {BinaryTreeNode<string | number>} root
 * @param {CanvasComponent} canvasComponent
 * @param {Point} position
 * @param {boolean} highlightMode
 */
function requestAnimationFrame(
    root: BinaryTreeNode<string | number>,
    canvasComponent: CanvasComponent,
    position: Point,
    highlightMode: boolean,
) {
  // Clear existing animation frame
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }

  // Request a new one
  animationFrameId = window.requestAnimationFrame(() => {
    canvasComponent.clearCanvas();
    const requiredRedraw = recursivelyDrawNodes(
        root, canvasComponent, position, highlightMode);
    if (requiredRedraw) {
      requestAnimationFrame(root, canvasComponent, position, highlightMode);
    }
  });
}

/**
 * Draw single node
 *
 * @param {BinaryTreeNode} node
 * @param {CanvasComponent} comp
 * @param {Point} position
 * @param {boolean} highlightMode
 * @return {boolean} Weather redraw is required
 */
function drawSingleNode(
    node: BinaryTreeNode<string | number>,
    comp: CanvasComponent,
    position: Point,
    highlightMode: boolean,
) {
  const {x, y} = position;
  node.nodeCircle.setCoordinates(x, y);

  // Grow or shrink while hover
  const colorId = node.nodeCircle.draw(comp);
  if (colorId === hoveredColorId && highlightMode) {
    return node.nodeCircle.grow();
  } else {
    return node.nodeCircle.restoreCircle();
  }
}

/**
 * Recursively draw all the nodes for a pretty tree
 *
 * @param {BinaryTreeNode<string | number>} root
 * @param {CanvasComponent} canvasComponent
 * @param {Point} position
 * @param {boolean} highlightMode
 * @return {boolean}
 */
function recursivelyDrawNodes(
    root: BinaryTreeNode<string | number>,
    canvasComponent: CanvasComponent,
    position: Point,
    highlightMode: boolean,
): boolean {
  const {x: xPosition, y: yPosition} = position;

  // Draw the node
  let requiredRedraw = drawSingleNode(
      root,
      canvasComponent,
      {x: xPosition, y: yPosition},
      highlightMode,
  );
  root.nodeCircle.setCoordinates(xPosition, yPosition);
  root.nodeCircle.draw(canvasComponent);

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

    requiredRedraw = recursivelyDrawNodes(
        root.left,
        canvasComponent,
        leftPosition,
        highlightMode,
    ) || requiredRedraw;
    connectPointsWithBezierCurve(canvasComponent, {
      xStart: xPosition,
      xEnd: leftPosition.x,
    }, {
      yStart: yPosition + root.nodeCircle.getRadius(),
      yEnd: childYPosition - root.left.nodeCircle.getRadius(),
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

    requiredRedraw = recursivelyDrawNodes(
        root.right,
        canvasComponent,
        rightPosition,
        highlightMode,
    ) || requiredRedraw;
    connectPointsWithBezierCurve(canvasComponent, {
      xStart: xPosition,
      xEnd: rightPosition.x,
    }, {
      yStart: yPosition + root.nodeCircle.getRadius(),
      yEnd: childYPosition - root.right.nodeCircle.getRadius(),
    });
  }

  return requiredRedraw;
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
  const left = root.left ? calculateSpacingMapRecursively(
      root.left,
  ) + 0.5: 0;
  const right = root.right ? calculateSpacingMapRecursively(
      root.right,
  ) + 0.5: 0;
  spacingMap.set(root, {
    left,
    right,
  });

  return left + right;
}

/**
 * Draw a pretty binary tree
 *
 * @param {BinaryTreeNode<string | number>} root
 * @param {CanvasComponent} canvasComponent
 * @param {IndividualInputOptions} options
 */
function drawPrettyBinaryTree(
    root: BinaryTreeNode<string | number>,
    canvasComponent: CanvasComponent,
    options: IndividualInputOptions,
) {
  spacingMap = new Map();
  const maxNodeSpacing = calculateSpacingMapRecursively(root);
  const heightOfTree = root.getHeight();
  const {maxHeight, maxWidth, highlightMode} = options;

  // Calculate canvas spacing requirements
  const {
    maxCanvasWidthRequired,
    actualMaxHeight,
    actualMaxWidth,
  } = getRequiredAndActualHeightAndWidth(
      maxNodeSpacing,
      heightOfTree,
      maxWidth,
      maxHeight,
  );

  // Init calculation
  const left = spacingMap.get(root)!.left;
  const midPointInCanvas = actualMaxWidth / 2;
  const xStart = (midPointInCanvas - maxCanvasWidthRequired / 2);

  // Initialize the canvas
  canvasComponent.setMaxWidthAndHeight(actualMaxHeight, actualMaxWidth);

  /**
   * Hover event handler
   */
  canvasComponent.onHover((color) => {
    hoveredColorId = color;
    requestAnimationFrame(root, canvasComponent, {
      x: xStart + getXPositionFromGivenHorizontalNodePosition(left+1),
      y: getCanvasHeightFromTreeHeight(0.5),
    }, Boolean(highlightMode));
  });

  // Recursively draw all nodes
  requestAnimationFrame(root, canvasComponent, {
    x: xStart + getXPositionFromGivenHorizontalNodePosition(left+1),
    y: getCanvasHeightFromTreeHeight(0.5),
  }, Boolean(highlightMode));
}

export default drawPrettyBinaryTree;
