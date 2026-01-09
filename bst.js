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

    return resultArr;
}



let tree = new Tree();
// let newArr = randomArrayLessThan100();
// let sortedArr = newArr.sort((a , b) => a - b);
// console.log(sortedArr);
let sortedArr = [1,14,36,38,41,57,61,63,79,95];
tree.root = tree.buildTree(sortedArr);
// prettyPrint(tree.root);
// tree.insertItem(tree.root, 97);
// prettyPrint(tree.root);

tree.deleteItem(tree.root, 61);
// prettyPrint(tree.root);
tree.deleteItem(tree.root, 41);
// prettyPrint(tree.root);
tree.deleteItem(tree.root, 36);
prettyPrint(tree.root);

// console.log(tree.find(38));

// console.log(tree.levelOrderForEach((arr, node) => {
//     arr.push(node.value);
// }));

// tree.inOrder();
// tree.preOrder();
// tree.postOrder();