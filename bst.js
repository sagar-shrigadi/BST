class Node {
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(){
        this.root = null;
    }

    buildTree(arr){
        if (arr.length === 0) {
            return null;
        }

        let mid = Math.floor(arr.length / 2);

        let node = new Node(arr[mid]);

        let leftArray = arr.slice(0, mid);
        let rightArray = arr.slice(mid + 1);

        node.left = this.buildTree(leftArray);
        node.right = this.buildTree(rightArray);

        return node;
    }

    insertItem(node, value){
        if (node === null) return new Node(value);

        if (value < node.value){
            node.left = this.insertItem(node.left, value);
        }else if(value > node.value){
            node.right = this.insertItem(node.right, value);
        }

        return node;
    }

    deleteItem(node, value){
        if (node === null) return null;

        if (value < node.value){
            node.left = this.deleteItem(node.left, value);
        }else if (value > node.value){
            node.right = this.deleteItem(node.right, value);
        }else {
            if (node.left === null){
                return node.right;
            }else if (node.right === null){
                return node.left;
            }

            let successorNode = this.__successorNode(node);
            node.value = successorNode.value;

            node.right = this.deleteItem(node.right, successorNode.value);
        }

        return node;
    }

    __successorNode(node){
        node = node.right;

        while(node !== null && node.left !== null){
            node = node.left;
        }

        return node;
    }

    find(value, node = this.root){
        // returns node with given value

        if(node === null){
            return null;
        }

        if(value === node.value){
            return node;
        }

        if(value < node.value){
            return this.find(value, node.left)
        }else if(value > node.value){
            return this.find(value, node.right)
        }
    }

    levelOrderForEach(callback){ // BFS = all nodes on same depth then move to next depth
        // using a queue

        if (this.root === null) return [];
        
        if (!callback){
            throw new Error("Callback Function is required!");
        }

        let nodes = [];
        let queue = [this.root];

        while(queue.length > 0){
            let current = queue.shift();
            callback(nodes, current);

            if(current.left !== null) {queue.push(current.left);}
            if(current.right !== null) {queue.push(current.right);}
        }

        return nodes;

        // a cleaner version which returns an array containing values if no callback is provided or with node data if callback is present 
        // if (this.root === null) return [];

        // const queue = [this.root];
        // const results = [];

        // while (queue.length > 0) {
        //     const current = queue.shift();

        //     // 1. If a callback is provided, call it with the node
        //     if (callback) callback(current);

        //     // 2. Always collect the value for the return array
        //     results.push(current.value);

        //     if (current.left) queue.push(current.left);
        //     if (current.right) queue.push(current.right);
        // }

        // // 3. Return the collected values
        // return results;
        // }
    }

    inOrder(node = this.root){ // DFS
        // left -> root -> right 

        if  (node === null) { return; }

        this.inOrder(node.left);
        console.log(node.value);
        this.inOrder(node.right);
    }

    preOrder(node = this.root){ // DFS 
        // root -> left -> right 

        if(node === null){return;}

        console.log(node.value);
        this.preOrder(node.left);
        this.preOrder(node.right);
    }

    postOrder(node = this.root){ // DFS
        // left -> right -> root 

        if (node === null) return;

        this.postOrder(node.left);
        this.postOrder(node.right);
        console.log(node.value);
    }

    height(value){
        let targetNode = this.find(value);

        if (targetNode === null) return null;

        return this.__calculateHeight(targetNode);
    }

    __calculateHeight(node){
        if (node === null){
            return -1; // -1 because caluculating edges instead of nodes --- i.e the left node has height of 0 
        }

        return Math.max(this.__calculateHeight(node.left), this.__calculateHeight(node.right)) + 1;
    }

    depth(value){
        let node = this.root;
        let count = 0;

        while(node !== null){
            if (node.value === value){
                return count;
            }

            count++;

            if (value < node.value){
                node = node.left;
            } else {
                node = node.right;
            }
        }
        return null;
    }

    isBalanced(node = this.root){
        // for each node in the tree, determine if height of left and right subtrees is at most 1

        if (node === null){
            return [true, 0];
        }

        let leftSubtree = this.isBalanced(node.left);
        let rightSubtree = this.isBalanced(node.right);

        let balanced = (leftSubtree[0] && rightSubtree[0]) && (Math.abs(leftSubtree[1] - rightSubtree[1]) <= 1);
        
        return [balanced, Math.max(leftSubtree[1], rightSubtree[1]) + 1];
    }

    rebalanced(node = this.root){
        let newArray = this.__InorderForRebalancing(node);
        tree.root = this.buildTree(newArray);
    }

    __InorderForRebalancing(node, arr = []){
        if (node === null) return;

        this.__InorderForRebalancing(node.left, arr);
        arr.push(node.value);
        this.__InorderForRebalancing(node.right, arr);

        return arr;
    }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};


function randomArrayLessThan100(){
    let resultArr = [];

    while(resultArr.length < 10){
        let newNum = Math.floor(Math.random()*100);
        let NumberInArray = resultArr.find((element) => element === newNum);

        console.log(NumberInArray);
        if(!NumberInArray){
            resultArr.push(newNum);
        }
    }

    return resultArr.sort((a, b) => a - b);
}