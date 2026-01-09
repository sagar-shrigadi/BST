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
let newArr = randomArrayLessThan100();
let sortedArr = newArr.sort((a , b) => a - b);
console.log(sortedArr);
tree.root = tree.buildTree(sortedArr);
prettyPrint(tree.root);