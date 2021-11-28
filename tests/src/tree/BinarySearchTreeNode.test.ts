import BinarySearchTreeNode from '../../../src/tree/BinarySearchTreeNode';

describe('Binary Search Tree Node tests', () => {
  it('should initialize a proper binary tree node', () => {
    const mockRootValue = 100;
    const binaryTreeNode = new BinarySearchTreeNode<number>(mockRootValue);

    expect(binaryTreeNode.value).toBe(mockRootValue);
    expect(binaryTreeNode.getHeight()).toBe(1);
    expect(binaryTreeNode.left).toBeUndefined();
    expect(binaryTreeNode.right).toBeUndefined();
    expect(binaryTreeNode.nodeCircle).toBeTruthy();
  });

  it('should be able to insert elements properly', () => {
    const mockRootValue = 100;
    const binaryTreeNode = new BinarySearchTreeNode<number>(mockRootValue);
    const insertArray = [50, 145, 150, 130, 120, 140, 30, 70, 75, 120];
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

  it('should be able to delete leaf node', () => {
    const mockRootValue = 12;
    const binaryTreeNode = new BinarySearchTreeNode<number>(mockRootValue);
    const insertArray = [5, 15, 3, 7, 13, 17, 1, 9, 14, 20, 8, 11, 18];
    insertArray.forEach((value) =>{
      binaryTreeNode.insert(value);
    });

    binaryTreeNode.delete(11);
    binaryTreeNode.delete(8);
    expect(binaryTreeNode.left!.right!.right!.right).toBeUndefined();
    expect(binaryTreeNode.left!.right!.right!.left).toBeUndefined();
    expect(binaryTreeNode.left!.right!.right!.value).toBe(9);
  });

  it('should be able to delete node with 1 child', () => {
    const mockRootValue = 12;
    const binaryTreeNode = new BinarySearchTreeNode<number>(mockRootValue);
    const insertArray = [5, 15, 3, 7, 13, 17, 1, 9, 14, 20, 8, 11, 18];
    insertArray.forEach((value) =>{
      binaryTreeNode.insert(value);
    });

    binaryTreeNode.delete(3);
    binaryTreeNode.delete(20);
    binaryTreeNode.delete(13);

    binaryTreeNode.delete(8);
    binaryTreeNode.delete(9);

    expect(binaryTreeNode.left!.left!.left).toBeUndefined();
    expect(binaryTreeNode.right!.right!.right!.left).toBeUndefined();
    expect(binaryTreeNode.left!.right!.right!.right).toBeUndefined();
    expect(binaryTreeNode.right!.left!.right).toBeUndefined();
  });

  it('should be able to delete node with 2 children', () => {
    const mockRootValue = 12;
    const binaryTreeNode = new BinarySearchTreeNode<number>(mockRootValue);
    const insertArray = [5, 15, 3, 7, 13, 17, 1, 9, 14, 20, 8, 11, 18];
    insertArray.forEach((value) =>{
      binaryTreeNode.insert(value);
    });

    const [deletedNode, updatedRoot] = binaryTreeNode.delete(15);
    expect(deletedNode!.value).toBe(15);
    expect(updatedRoot!.value).toBe(12);
  });

  it('should return deletedNode as undefined if node is not found', () => {
    const mockRootValue = 12;
    const binaryTreeNode = new BinarySearchTreeNode<number>(mockRootValue);
    const insertArray = [5, 15, 3, 7, 13, 17, 1, 9, 14, 20, 8, 11, 18];
    insertArray.forEach((value) =>{
      binaryTreeNode.insert(value);
    });

    const [deletedNode, updatedRoot] = binaryTreeNode.delete(21);
    expect(deletedNode).toBeUndefined();
    expect(updatedRoot!.value).toBe(12);
  });

  it('should be able to delete single parent', () => {
    const mockRootValue = 12;
    const binaryTreeNode = new BinarySearchTreeNode<number>(mockRootValue);

    const [deletedNode, updatedRoot] = binaryTreeNode.delete(12);
    expect(deletedNode!.value).toBe(12);
    expect(updatedRoot).toBeUndefined;
  });

  it('should be able to delete root node when it has 2 children', () => {
    const mockRootValue = 12;
    const binaryTreeNode = new BinarySearchTreeNode<number>(mockRootValue);
    const insertArray = [5, 15, 3, 7, 13, 17, 1, 9, 14, 20, 8, 11, 18];
    insertArray.forEach((value) =>{
      binaryTreeNode.insert(value);
    });

    const [deletedNode, updatedRoot] = binaryTreeNode.delete(12);
    expect(deletedNode!.value).toBe(12);
    expect(updatedRoot!.value).toBe(13);
  });

  it('should be able to delete root node when it has only left child', () => {
    const mockRootValue = 12;
    const binaryTreeNode = new BinarySearchTreeNode<number>(mockRootValue);
    const insertArray = [5];
    insertArray.forEach((value) =>{
      binaryTreeNode.insert(value);
    });

    const [deletedNode, updatedRoot] = binaryTreeNode.delete(12);
    expect(deletedNode!.value).toBe(12);
    expect(updatedRoot!.value).toBe(5);
  });

  it('should be able to delete root node when it has only right child', () => {
    const mockRootValue = 12;
    const binaryTreeNode = new BinarySearchTreeNode<number>(mockRootValue);
    const insertArray = [15];
    insertArray.forEach((value) =>{
      binaryTreeNode.insert(value);
    });

    const [deletedNode, updatedRoot] = binaryTreeNode.delete(12);
    expect(deletedNode!.value).toBe(12);
    expect(updatedRoot!.value).toBe(15);
  });
});
