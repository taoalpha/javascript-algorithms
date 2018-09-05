import BinarySearchTreeNode from './BinarySearchTreeNode';
import Comparator, { CompareFunction } from '../../../utils/comparator/Comparator';

export default class BinarySearchTree<T> {
    root: BinarySearchTreeNode<T> = null;
    nodeComparator: Comparator;
    constructor(nodeValueCompareFunction: CompareFunction = undefined) {
        this.root = new BinarySearchTreeNode(null, nodeValueCompareFunction);

        // Steal node comparator from the root.
        this.nodeComparator = this.root.nodeComparator;
    }

    insert(value: T): BinarySearchTreeNode<T> {
        return this.root.insert(value);
    }

    contains(value: T) : boolean {
        return this.root.contains(value);
    }

    remove(value: T) : boolean {
        return this.root.remove(value);
    }

    toString() : string {
        return this.root.toString();
    }
}
