import Circle from '../shapes/Circle';
import theme from '../config/theme';
import getRandomColor from '../utils/getRandomColor';

/**
 * Describes a node of a binary tree
 */
class BinaryTreeNode {
  /**
   * The value of the node
   */
  value: number

  /**
   * The canvas circle
   */
  nodeCircle: Circle

  /**
   * The left child of the node
   */
  left?: BinaryTreeNode

  /**
   * The right child of the node
   */
  right?: BinaryTreeNode

  /**
   * For constructing a new binary tree node
   *
   * @param {number} value
   */
  constructor(value: number) {
    this.value = value;
    this.nodeCircle = new Circle(
        value.toString(),
        theme.radius,
        getRandomColor(),
    );
  }

  /**
   * Set the left child
   *
   * @param {BinaryTreeNode} value
   */
  setLeft(value: BinaryTreeNode) {
    this.left = value;
  }

  /**
   * Set the right child
   *
   * @param {BinaryTreeNode} value
   */
  setRight(value: BinaryTreeNode) {
    this.right = value;
  }

  /**
   * Get the height of the binry tree from the node
   * Height of root is 1
   *
   * @return {number}
   */
  getHeight():number {
    const leftHeight = this.left ? this.left.getHeight() : 0;
    const rightHeight = this.right ? this.right.getHeight() : 0;
    return leftHeight > rightHeight ? leftHeight + 1 : rightHeight + 1;
  }
}

export default BinaryTreeNode;
