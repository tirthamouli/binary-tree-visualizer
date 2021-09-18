import BinaryTreeNode from './BinaryTreeNode';

/**
 * A Binary search tree node
 */
class BinarySearchTreeNode<T extends string | number>
  extends BinaryTreeNode<T> {
    /**
     * Left child of the node
     */
    left?: BinarySearchTreeNode<T>

    /**
     * Right child of the node
     */
    right?: BinarySearchTreeNode<T>

    /**
     * Set the left child of the node
     *
     * @param {BinarySearchTreeNode<T>} value
     */
    setLeft(value: BinarySearchTreeNode<T>) {
      super.setLeft(value);
    }

    /**
     * Set the right child of the node
     *
     * @param {BinarySearchTreeNode<T>} value
     */
    setRight(value: BinarySearchTreeNode<T>) {
      super.setRight(value);
    }

    /**
     * Insert a value into the node
     * (Using Recursion)
     *
     * @param {T} value
     */
    insert(value: T) {
      // Skip equal value
      if (value === this.value) {
        return;
      }

      // When value is lesser
      if (value < this.value) {
        if (this.left) {
          this.left.insert(value);
        }
        this.setLeft(new BinarySearchTreeNode(value));
        return;
      }

      // When value is greater
      if (this.right) {
        this.right.insert(value);
      }
      this.setRight(new BinarySearchTreeNode(value));
    }
}

export default BinarySearchTreeNode;
