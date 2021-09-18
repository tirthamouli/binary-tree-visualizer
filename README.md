# Binary Tree Visualizer
![Binary tree](https://user-images.githubusercontent.com/22812597/133884350-4ff8845a-d62f-46d1-b087-12f62cec9c5d.png)

This is a visualizer for binary trees.

Use the BinaryTreeNode and BinarySearchTreeNode classes provided in the library to create a binary tree or extend it to create a different type of binary tree.
To visualize it just pass the root node and the html canvas element to the drawBinaryTree function.

# Installation
Via NPM

```
npm i binary-tree-visualizer
```

# Usage

## Default

```html
<style>
  body, html {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }
</style>

<body>
  <canvas></canvas>
</body>
```

```js
import { BinaryTreeNode, drawBinaryTree } from 'binary-tree-visualizer';

// Init a new root binary tree node
const root = new BinaryTreeNode(100);

// Setting the left child
root.setLeft(new BinaryTreeNode(50));

// Setting the left > left child
root.left.setLeft(new BinaryTreeNode(30));

// Setting the right child
root.setRight(new BinaryTreeNode(145));

// Draw a binary tree with all default config
// Canvas will take up entire height and width of the screen
drawBinaryTree(root, document.querySelector('canvas'));
```

## Options
drawBinaryTree can take a 3rd options argument

```js
import { VisualizationType } from 'binary-tree-visualizer';

type options = {
  // SIMPLE is taken by default. (Only simple has been implemented till now)
  type?:  VisualizationType.SIMPLE |  VisualizationType.EXPANDABLE | VisualizationType.PRETTY,
  // SUGGESTION: Max heigth of the canvas. If required more will be taken
  maxHeight?: number,
  // SUGGESTION: Max width of the canvas. If required more will be taken
  maxWidth?: number
};
```

## Theme
Theme can be tweaked as well
```js
import { setTheme } from 'binary-tree-visualizer';

setTheme(options);
```

```ts
type options = {
  // Radius of nodes (DEFAULT 20)
  radius?: number,
  // Minimum leaf node spacing (DEFAULT 60)
  leafNodeSpace?: number,
  // Minimum vertical spacing (DEFAULT 90)
  lineHeight?: number,
  // Font family shown on canvas (DEFAULT 'Poppins') (import required)
  textFont?: string,
  // The color of lines/storkes (DEFAULT '#f56042')
  strokeColor?: string,
  // A random color that is selected for each node circle
  // (DEFAULT [{bgColor: '#fff2e0', borderColor: '#f56042'}])
  colorArray?: {
    borderColor: string
    bgColor: string
  }[],
};
```
## Binary Search Tree
A Binary search tree implementation is also given out of the box

```js
import { BinarySearchTreeNode, drawBinaryTree } from 'binary-tree-visualizer';

const root = new BinarySearchTreeNode(100);
[50, 145, 150, 130, 120, 140, 30, 70, 75].forEach((num) => root.insert(num));

drawBinaryTree(root, document.querySelector('canvas'));
```
