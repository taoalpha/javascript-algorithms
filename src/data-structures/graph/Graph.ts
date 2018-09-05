import GraphVertex from "./GraphVertex";
import MixMap from "../../utils/mix-map/MixMap";
import GraphEdge, { EdgeKey } from "./GraphEdge";

export default class Graph<T> {
    edges: MixMap<EdgeKey<T>, GraphEdge<T>> = new MixMap();
    vertices: MixMap<T, GraphVertex<T>>  = new MixMap();

    constructor(public isDirected = false) {
    }

    addVertex(newVertex: GraphVertex<T>) : Graph<T> {
        this.vertices.set(newVertex.getKey(), newVertex);

        return this;
    }

    getVertexByKey(vertexKey: T) : GraphVertex<T> {
        return this.vertices.get(vertexKey);
    }

    getNeighbors(vertex: GraphVertex<T>) : GraphVertex<T>[] {
        return vertex.getNeighbors();
    }

    getAllVertices() : GraphVertex<T>[] {
        return this.vertices.values();
    }

    getAllEdges() : GraphEdge<T>[] {
        return this.edges.values();
    }

    addEdge(edge: GraphEdge<T>) : Graph<T> {
        // Try to find and end start vertices.
        let startVertex = this.getVertexByKey(edge.startVertex.getKey());
        let endVertex = this.getVertexByKey(edge.endVertex.getKey());

        // Insert start vertex if it wasn't inserted.
        if (!startVertex) {
            this.addVertex(edge.startVertex);
            startVertex = this.getVertexByKey(edge.startVertex.getKey());
        }

        // Insert end vertex if it wasn't inserted.
        if (!endVertex) {
            this.addVertex(edge.endVertex);
            endVertex = this.getVertexByKey(edge.endVertex.getKey());
        }

        // Check if edge has been already added.
        if (this.edges.has(edge.getKey())) {
            throw new Error('Edge has already been added before');
        } else {
            this.edges.set(edge.getKey(), edge);
        }

        // Add edge to the vertices.
        if (this.isDirected) {
            // If graph IS directed then add the edge only to start vertex.
            startVertex.addEdge(edge);
        } else {
            // If graph ISN'T directed then add the edge to both vertices.
            startVertex.addEdge(edge);
            endVertex.addEdge(edge);
        }

        return this;
    }

    deleteEdge(edge: GraphEdge<T>) : void {
        // Delete edge from the list of edges.
        if (this.edges.has(edge.getKey())) {
            this.edges.delete(edge.getKey());
        } else {
            throw new Error('Edge not found in graph');
        }

        // Try to find and end start vertices and delete edge from them.
        const startVertex = this.getVertexByKey(edge.startVertex.getKey());
        const endVertex = this.getVertexByKey(edge.endVertex.getKey());

        startVertex.deleteEdge(edge);
        endVertex.deleteEdge(edge);
    }

    findEdge(startVertex: GraphVertex<T>, endVertex: GraphVertex<T>) : GraphEdge<T> {
        const vertex = this.getVertexByKey(startVertex.getKey());

        if (!vertex) {
            return null;
        }

        return vertex.findEdge(endVertex);
    }

    findVertexByKey(vertexKey: T) : GraphVertex<T> {
        if (this.vertices.has(vertexKey)) {
            return this.vertices.get(vertexKey);
        }

        return null;
    }

    getWeight() : number {
        return this.getAllEdges().reduce((weight, graphEdge) => {
            return weight + graphEdge.weight;
        }, 0);
    }

    /**
     * Reverse all the edges in directed graph.
     */
    reverse() : Graph<T> {
        this.getAllEdges().forEach(edge => {
            // Delete straight edge from graph and from vertices.
            this.deleteEdge(edge);

            // Reverse the edge.
            edge.reverse();

            // Add reversed edge back to the graph and its vertices.
            this.addEdge(edge);
        });

        return this;
    }

    getVerticesIndices() : MixMap<T, number> {
        const verticesIndices: MixMap<T, number> = new MixMap();
        this.getAllVertices().forEach((vertex, index) => {
            verticesIndices.set(vertex.getKey(), index);
        });

        return verticesIndices;
    }

    getAdjacencyMatrix() : number[][] {
        const vertices = this.getAllVertices();
        const verticesIndices = this.getVerticesIndices();

        // Init matrix with infinities meaning that there is no ways of
        // getting from one vertex to another yet.
        const adjacencyMatrix = Array(vertices.length).fill(null).map(() => {
            return Array(vertices.length).fill(Infinity);
        });

        // Fill the columns.
        vertices.forEach((vertex, vertexIndex) => {
            vertex.getNeighbors().forEach((neighbor) => {
                const neighborIndex = verticesIndices.get(neighbor.getKey());
                adjacencyMatrix[vertexIndex][neighborIndex] = this.findEdge(vertex, neighbor).weight;
            });
        });

        return adjacencyMatrix;
    }

    toString() : string {
        return this.vertices.keys().toString();
    }
}
