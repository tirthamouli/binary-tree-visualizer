import BinarySearchTreeNode from '../../../src/tree/BinarySearchTreeNode';

describe('Binary Search Tree Node tests', () => {
  const mockRootValue = 100;
  const insertArray = [50, 145, 150, 130, 120, 140, 30, 70, 75, 120];

  it('should initialize a proper binary tree node', () => {
    const binaryTreeNode = new BinarySearchTreeNode<number>(mockRootValue);

    expect(binaryTreeNode.value).toBe(mockRootValue);
    expect(binaryTreeNode.getHeight()).toBe(1);
    expect(binaryTreeNode.left).toBeUndefined();
    expect(binaryTreeNode.right).toBeUndefined();
    expect(binaryTreeNode.nodeCircle).toBeTruthy();
  });

  it('should be able to insert elements properly', () => {
    const binaryTreeNode = new BinarySearchTreeNode<number>(mockRootValue);
    insertArray.forEach((value) =>{
      binaryTreeNode.insert(value);
    });

    expect(binaryTreeNode.value).toBe(mockRootValue);
    expect(binaryTreeNode.getHeight()).toBe(4);
    expect(binaryTreeNode.left?.value).toBe(50);
    expect(binaryTreeNode.right?.value).toBe(145);
    expect(binaryTreeNode.left?.left?.value).toBe(30);
    expect(binaryTreeNode.nodeCircle).toBeTruthy();
  });
});
