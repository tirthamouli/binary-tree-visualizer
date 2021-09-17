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
export function getCanvasWidthFromMaxLeafNodes(maxNodes: number) {
  return (maxNodes + 2) * theme.leafNodeSpace;
}

/**
 *
 * @param {number} treeHeight - Height of the tree (number of nodes from)
 * @return {number} - The canvas height in px
 */
export function getCanvasHeightFromTreeHeight(treeHeight: number) {
  return (treeHeight) * theme.lineHeight;
}
