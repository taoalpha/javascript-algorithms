import LinkedList from '../linked-list/LinkedList';
import GraphEdge from './GraphEdge';
import { CompareResult } from '../../utils/comparator/Comparator';
import LinkedListNode from '../linked-list/LinkedListNode';

export default class GraphVertex<T> {
    edges: LinkedList<GraphEdge<T>> = new LinkedList(this.edgeComparator);

    constructor(public value: T) {
        if (value === undefined) {
            throw new Error('Graph vertex must have a value');
        }
    }

    private edgeComparator(edgeA: GraphEdge<T>, edgeB: GraphEdge<T>): CompareResult {
        if (edgeA.startVertex === edgeB.startVertex && edgeA.endVertex === edgeB.endVertex) {
            return 0;
        }

        return edgeA.toString() < edgeB.toString() ? -1 : 1;
    };

    addEdge(edge: GraphEdge<T>) : GraphVertex<T> {
        this.edges.append(edge);

        return this;
    }

    deleteEdge(edge: GraphEdge<T>) {
        this.edges.delete(edge);
    }

    getNeighbors() : GraphVertex<T>[] {
        const edges = this.edges.toArray();

        const neighborsConverter = (node: LinkedListNode<GraphEdge<T>>) => {
            return node.value.startVertex === this ? node.value.endVertex : node.value.startVertex;
        };

        // Return either start or end vertex.
        // For undirected graphs it is possible that current vertex will be the end one.
        return edges.map(neighborsConverter);
    }

    getEdges() : GraphEdge<T>[] {
        return this.edges.toArray().map(linkedListNode => linkedListNode.value);
    }

    getDegree() : number {
        return this.edges.toArray().length;
    }

    hasEdge(requiredEdge: GraphEdge<T>) : boolean {
        const edgeNode = this.edges.find({
            criteria: edge => edge === requiredEdge,
        });

        return !!edgeNode;
    }

    hasNeighbor(vertex: GraphVertex<T>) : boolean {
        const vertexNode = this.edges.find({
            criteria: edge => edge.startVertex === vertex || edge.endVertex === vertex,
        });

        return !!vertexNode;
    }

    findEdge(vertex: GraphVertex<T>) : GraphEdge<T> {
        const edgeFinder = (edge) => {
            return edge.startVertex === vertex || edge.endVertex === vertex;
        };

        const edge = this.edges.find({ criteria: edgeFinder });

        return edge ? edge.value : null;
    }

    getKey() : T {
        return this.value;
    }

    deleteAllEdges() : GraphVertex<T> {
        this.getEdges().forEach(edge => this.deleteEdge(edge));

        return this;
    }

    toString(stringifier?: (value: T) => string) : string {
        return stringifier ? stringifier(this.value) : `${this.value}`;
    }
}
