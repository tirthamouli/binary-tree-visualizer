import CanvasComponent from './Canvas';
import theme from '../config/theme';
import BinaryTreeNode from '../tree/BinaryTreeNode';
import {Point} from '../types/Point';
import {
  getCanvasHeightFromTreeHeight,
  getCanvasWidthFromMaxNodeSpacing,
  getXPositionFromGivenHorizontalNodePosition,
} from '../utils/tree';
import {IndividualInputOptions, PathArray} from './types';
import connectPointsWithBezierCurve
  from '../utils/connectPointsWithBezierCurve';

/**
 * The current animation frame that is going on
 */
let animationFrameId: number;

/**
 * Array of all children that needs printing
 */
let globalPathArray: PathArray;

/**
 * Current color that is being hovered on
 */
let hoveredColorId: string;

/**
 * Map storing the colorId to the path array
 */
let colorIdToPathMap: Map<string, PathArray> = new Map();

/**
 * Clear the existing animation frame if any and request an animation frame
 *
 * @param {BinaryTreeNode<string | number>} root
 * @param {CanvasComponent} comp
 * @param {IndividualInputOptions} options
 */
function requestAnimationFrame(
    root: BinaryTreeNode<string | number>,
    comp: CanvasComponent,
    options: IndividualInputOptions,
) {
  // Clear existing animation frame
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }

  // Request a new one
  animationFrameId = window.requestAnimationFrame(
      () => animationFrameCB(root, comp, options),
  );
}


/**
 * Get the node height from print array
 *
 * @return {number}
 */
function getNodeHeightFromGlobalPathArray() {
  return globalPathArray.length + 1;
}


/**
 * Get the node width from the print array
 *
 * @return {{
 *  left: number,
 *  right: number
 * }}
 */
function getNodeWidthFromGlobalPathArray() {
  let left = 0;
  let right = 0;
  let current = 0;

  for (const childDirection of globalPathArray) {
    if (childDirection === 'left') {
      current -= 1;
    } else {
      current += 1;
    }
    if (current < 0) {
      left = Math.max(Math.abs(current), left);
    } else {
      right = Math.max(current, right);
    }
  }

  return {
    left, right,
  };
}

/**
 * Draw single node
 *
 * @param {BinaryTreeNode} node
 * @param {CanvasComponent} comp
 * @param {PathArray} pathArray
 * @param {Point} position
 * @return {boolean} Weather redraw is required
 */
function drawSingleNode(
    node: BinaryTreeNode<string | number>,
    comp: CanvasComponent,
    pathArray: PathArray,
    position: Point,
) {
  const {x, y} = position;
  const doesNodeHaveChildren = Boolean(node.left || node.right);
  node.nodeCircle.setCoordinates(x, y);

  // Grow or shrink while hover
  const colorId = node.nodeCircle.draw(comp);
  colorIdToPathMap.set(colorId, pathArray);
  if (colorId === hoveredColorId && doesNodeHaveChildren) {
    return node.nodeCircle.grow();
  } else {
    return node.nodeCircle.restoreCircle();
  }
}

/**
 * Draw both the children if required
 *
 * @param {BinaryTreeNode} node
 * @param {CanvasComponent} comp
 * @param {number} xPosition
 * @param {number} nodeHeight
 * @param {PathArray} pathArray
 * @return {boolean}
 */
function drawChildren(
    node: BinaryTreeNode<string | number>,
    comp: CanvasComponent,
    xPosition: number,
    nodeHeight: number,
    pathArray: PathArray,
) {
  const currentHeight = getCanvasHeightFromTreeHeight(nodeHeight);
  const childHeight = getCanvasHeightFromTreeHeight(nodeHeight + 1);
  let requiredRedraw = false;

  // Draw the left child
  if (node.left) {
    const currentPathArray : PathArray = node.left.left || node.left.right ?
      [...pathArray, 'left'] : [...pathArray];
    const xLeft = xPosition - (0.5 * theme.leafNodeSpace);

    requiredRedraw = drawSingleNode(
        node.left,
        comp,
        currentPathArray, {
          x: xLeft,
          y: childHeight,
        },
    ) || requiredRedraw;
    connectPointsWithBezierCurve(comp, {
      xStart: xPosition,
      xEnd: xLeft,
    }, {
      yStart: currentHeight + node.nodeCircle.getRadius(),
      yEnd: childHeight - node.left.nodeCircle.getRadius(),
    });
  }

  // Draw the right child
  if (node.right) {
    const currentPathArray : PathArray = node.right.left || node.right.right ?
      [...pathArray, 'right'] : [...pathArray];
    const xRight = xPosition + (0.5 * theme.leafNodeSpace);

    requiredRedraw = drawSingleNode(
        node.right,
        comp,
        currentPathArray, {
          x: xRight,
          y: childHeight,
        },
    ) || requiredRedraw;
    connectPointsWithBezierCurve(comp, {
      xStart: xPosition,
      xEnd: xRight,
    }, {
      yStart: currentHeight + node.nodeCircle.getRadius(),
      yEnd: childHeight - node.right.nodeCircle.getRadius(),
    });
  }

  return requiredRedraw;
}


/**
 * Draw all the nodes by following print array
 *
 * @param {BinaryTreeNode} root
 * @param {CanvasComponent} comp
 * @param {number} xRootPosition
 * @return {boolean} - Weather animated redraw is required
 */
function drawAllNodes(
    root:BinaryTreeNode<string | number>,
    comp: CanvasComponent,
    xRootPosition: number): boolean {
  // Draw root
  let currentNode = root;
  let xPosition = xRootPosition;
  let currentNodeHeight = 0.5;
  const currentPathArray: Array<'left' | 'right'> = [];
  let requiredRedraw = drawSingleNode(root, comp, [...currentPathArray], {
    x: xPosition,
    y: getCanvasHeightFromTreeHeight(currentNodeHeight),
  });

  // Draw all the children according to the path
  for (const currentPath of globalPathArray) {
    requiredRedraw = drawChildren(
        currentNode,
        comp,
        xPosition,
        currentNodeHeight,
        currentPathArray,
    ) || requiredRedraw;

    if (currentPath === 'left') {
      currentNode = currentNode.left!;
      xPosition = xPosition - (0.5 * theme.leafNodeSpace);
      currentPathArray.push('left');
    } else {
      currentNode = currentNode.right!;
      xPosition = xPosition + (0.5 * theme.leafNodeSpace);
      currentPathArray.push('right');
    }
    currentNodeHeight += 1;
  }

  // Draw the children of the last element in the path
  requiredRedraw = drawChildren(
      currentNode,
      comp,
      xPosition,
      currentNodeHeight,
      currentPathArray,
  ) || requiredRedraw;

  // Return if redraw is required
  return requiredRedraw;
}

/**
 * Animation frame call back function that will recursively be called.
 * In case animation is required
 *
 * @param {BinaryTreeNode<string | number>} root
 * @param {CanvasComponent} comp
 * @param {IndividualInputOptions} options
 */
function animationFrameCB(
    root: BinaryTreeNode<string | number>,
    comp: CanvasComponent,
    options: IndividualInputOptions,
) {
  // Height and width calculations
  const nodeHeight = getNodeHeightFromGlobalPathArray();
  const {
    left: leftNodeWidth,
    right: rightNodeWidth,
  } = getNodeWidthFromGlobalPathArray();
  const requiredHeight = getCanvasHeightFromTreeHeight(nodeHeight + 1);
  const requiredWidth = getCanvasWidthFromMaxNodeSpacing(
      leftNodeWidth+rightNodeWidth,
  );
  const actualHeight = Math.max(requiredHeight, options.maxHeight);
  const actualWidth = Math.max(requiredWidth, options.maxWidth);
  const xStart = (actualWidth/2) - (requiredWidth/2);

  // Set the height and width
  // This also clears the canvas. So no need to clear it manually.
  comp.setMaxWidthAndHeight(actualHeight, actualWidth);

  // Initialize color id to path map
  colorIdToPathMap = new Map();

  // Draw and check if redraw is required
  const requiredRedraw = drawAllNodes(
      root,
      comp,
      xStart + getXPositionFromGivenHorizontalNodePosition(leftNodeWidth + 1),
  );
  if (requiredRedraw) {
    requestAnimationFrame(root, comp, options);
  }
}

/**
 * Draw an expandable binary tree
 *
 * @param {BinaryTreeNode<string | number>} root
 * @param {CanvasComponent} canvasComponent
 * @param {IndividualInputOptions} options
 */
function drawExpandableBinaryTree(
    root: BinaryTreeNode<string | number>,
    canvasComponent: CanvasComponent,
    options: IndividualInputOptions,
) {
  // Initialization
  globalPathArray = [];

  /**
   * Click event handler
   */
  canvasComponent.onClick((color) => {
    globalPathArray = colorIdToPathMap.get(color) || globalPathArray;
    requestAnimationFrame(root, canvasComponent, options);
  });

  /**
   * Hover event handler
   */
  canvasComponent.onHover((color) => {
    hoveredColorId = color;
    requestAnimationFrame(root, canvasComponent, options);
  });

  // Draw frame
  requestAnimationFrame(root, canvasComponent, options);
}

export default drawExpandableBinaryTree;
