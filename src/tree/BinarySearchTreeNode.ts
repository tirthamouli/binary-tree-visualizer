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
          return;
        }
        this.setLeft(new BinarySearchTreeNode(value));
        return;
      }

      // When value is greater
      if (this.right) {
        this.right.insert(value);
        return;
      }
      this.setRight(new BinarySearchTreeNode(value));
    }

    /**
     * Find the minimum value from the given node
     *
     * @param {BinarySearchTreeNode<T>} node
     * @return {BinarySearchTreeNode<T>}
     */
    findMinimum():BinarySearchTreeNode<T> {
      if (this.left) {
        return this.left.findMinimum();
      }
      return this;
    }

    /**
     * Delete this node
     *
     * @param {BinarySearchTreeNode<T>} parent
     * @return {[
     *  BinarySearchTreeNode<T>,
     *  BinarySearchTreeNode<T>
     * ]} [deletedNode, currentRoot]
     */
    deleteThisNode(
        parent?: BinarySearchTreeNode<T>,
    ): [BinarySearchTreeNode<T>?, BinarySearchTreeNode<T>?] {
      // Which direction is this node from the parent
      const childDirection = parent?.left === this ? 'left' : 'right';

      // Case 1: Delete leaf node
      if (!this.left && !this.right) {
        if (parent) {
          delete parent[childDirection];
        }
        return [this];
      }

      // Case 2: Delete when there is only one child
      if (this.left && !this.right) {
        if (parent) {
          parent[childDirection] = this.left;
        }
        return [this, this.left];
      } else if (this.right && !this.left) {
        if (parent) {
          parent[childDirection] = this.right;
        }
        return [this, this.right];
      }

      // Case 3: There are 2 children

      // Step 1: Delete the in order successor
      const [deletedNode] = this.right!.delete(
        this.right!.findMinimum().value, this,
      );

      // Step 2: Set the in order successor as the current node
      // Deleted node will always be found
      deletedNode!.left = this.left;
      deletedNode!.right = this.right;
      if (parent) {
        parent[childDirection] = deletedNode;
      }

      return [this, deletedNode];
    }

    /**
     * Delete a node
     * (Using recursion)
     *
     * @param {T} value
     * @param {BinarySearchTreeNode<T>} parent
     * @return {[
     *  BinarySearchTreeNode<T>,
     *  BinarySearchTreeNode<T>
     * ]} [deletedNode, currentRoot]
     */
    delete(
        value: T,
        parent?: BinarySearchTreeNode<T>,
    ): [BinarySearchTreeNode<T>?, BinarySearchTreeNode<T>?] {
      // Delete from left node
      if (value < this.value && this.left) {
        const [deletedNode] = this.left.delete(value, this);
        return [deletedNode, this];
      }

      // Delete from right node
      if (value > this.value && this.right) {
        const [deletedNode] = this.right.delete(value, this);
        return [deletedNode, this];
      }

      // Delete the current node
      if (this.value === value) {
        const res = this.deleteThisNode(parent);
        delete this.left;
        delete this.right;
        return res;
      }

      return [, this];
    }
}

export default BinarySearchTreeNode;
