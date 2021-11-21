import theme from '../config/theme';

/**
 * Get the max number of leaf nodes from height of the binary tree
 *
 * @param {number} treeHeight - Height of the tree (number of nodes from)
 * @return {number} - Maximum number of leaf nodes
 */
export function getMaxLeafNodesFromHeight(treeHeight: number) {
  return 2 ** (treeHeight-1);
}

/**
 * Maximum canvas width required from number of tree nodes
 *
 * @param {number} maxNodes - Maximum number of nodes
 * @return {number} - The max width required
 */
export function getCanvasWidthFromMaxNodeSpacing(maxNodes: number) {
  return (maxNodes + 2) * theme.leafNodeSpace;
}

/**
 * Get the x position from given horizontal node position
 *
 * @param {number} nodes - The number of nodes from the left
 * @return {number} - The x position
 */
export function getXPositionFromGivenHorizontalNodePosition(nodes: number) {
  return (nodes) * theme.leafNodeSpace;
}

/**
 * Get canvas height from the tree height
 *
 * @param {number} treeHeight - Height of the tree (number of nodes from)
 * @return {number} - The canvas height in px
 */
export function getCanvasHeightFromTreeHeight(treeHeight: number) {
  return (treeHeight) * theme.lineHeight;
}

/**
 * Get required and actual height and width
 *
 * @param {number} maxNodeSpacing
 * @param {number} heightOfTree
 * @param {number} maxWidth
 * @param {number} maxHeight
 * @return {{
 *  maxCanvasHeightRequired: number,
 *  maxCanvasWidthRequired:number,
 *  actualMaxHeight: number,
 *  actualMaxWidth: number
 * }}
 */
export function getRequiredAndActualHeightAndWidth(
    maxNodeSpacing: number,
    heightOfTree: number,
    maxWidth: number,
    maxHeight: number,
) {
  const maxCanvasWidthRequired = getCanvasWidthFromMaxNodeSpacing(
      maxNodeSpacing,
  );
  const maxCanvasHeightRequired = getCanvasHeightFromTreeHeight(heightOfTree+1);
  const actualMaxWidth = maxCanvasWidthRequired > maxWidth ?
    maxCanvasWidthRequired : maxWidth;
  const actualMaxHeight = maxCanvasHeightRequired > maxHeight ?
    maxCanvasHeightRequired : maxHeight;

  return {
    maxCanvasHeightRequired,
    maxCanvasWidthRequired,
    actualMaxHeight,
    actualMaxWidth,
  };
}
