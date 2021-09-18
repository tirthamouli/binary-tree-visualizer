import Circle from '../shapes/Circle';
import theme from '../config/theme';
import getRandomColor from '../utils/getRandomColor';

/**
 * Describes a node of a binary tree
 */
class BinaryTreeNode<T extends string | number> {
  /**
   * The value of the node
   */
  value: T

  /**
   * The canvas circle
   */
  nodeCircle: Circle

  /**
   * The left child of the node
   */
  left?: BinaryTreeNode<T>

  /**
   * The right child of the node
   */
  right?: BinaryTreeNode<T>

  /**
   * For constructing a new binary tree node
   *
   * @param {T} value
   */
  constructor(value: T) {
    this.value = value;
    this.nodeCircle = new Circle(
        `${value}`,
        theme.radius,
        getRandomColor(),
    );
  }

  /**
   * Set the left child
   *
   * @param {BinaryTreeNode} value
   */
  setLeft(value: BinaryTreeNode<T>) {
    this.left = value;
  }

  /**
   * Set the right child
   *
   * @param {BinaryTreeNode} value
   */
  setRight(value: BinaryTreeNode<T>) {
    this.right = value;
  }

  /**
   * Get the height of the binry tree from the node
   * Height of root is 1
   *
   * @return {number}
   */
  getHeight():number {
    const leftHeight = this.left?.getHeight() || 0;
    const rightHeight = this.right?.getHeight() || 0;
    return Math.max(leftHeight, rightHeight) + 1;
  }
}

export default BinaryTreeNode;
