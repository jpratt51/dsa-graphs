class Node {
    constructor(value, adjacent = new Set()) {
        this.value = value;
        this.adjacent = adjacent;
    }
}

class Graph {
    constructor() {
        this.nodes = new Set();
    }

    // this function accepts a Node instance and adds it to the nodes property on the graph
    addVertex(vertex) {
        this.nodes.add(vertex);
    }

    // this function accepts an array of Node instances and adds them to the nodes property on the graph
    addVertices(vertexArray) {
        for (let vertex of vertexArray) {
            this.addVertex(vertex);
        }
    }

    // this function accepts two vertices and updates their adjacent values to include the other vertex
    addEdge(v1, v2) {
        v1.adjacent.add(v2);
        v2.adjacent.add(v1);
    }

    // this function accepts two vertices and updates their adjacent values to remove the other vertex
    removeEdge(v1, v2) {
        v1.adjacent.delete(v2);
        v2.adjacent.delete(v1);
    }

    // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
    removeVertex(vertex) {
        if (this.nodes.has(vertex)) {
            for (let edge in vertex.adjacent) {
                edge.adjacent.delete(vertex);
            }
            this.nodes.delete(vertex);
        }
    }

    // this function returns an array of Node values using DFS
    depthFirstSearch(start) {
        let toVisitStack = [start];
        let seen = new Set(toVisitStack);
        let values = [];

        while (toVisitStack.length > 0) {
            let currVertex = toVisitStack.pop();

            for (let vertex of currVertex.adjacent) {
                if (!seen.has(vertex)) {
                    toVisitStack.push(vertex);
                    seen.add(vertex);
                }
            }
        }
        seen.forEach((vertex) => values.push(vertex.value));
        return values;
    }

    // this function returns an array of Node values using BFS
    breadthFirstSearch(start) {
        let toVisitQueue = [start];
        let seen = new Set(toVisitQueue);
        let values = [];

        while (toVisitQueue.length > 0) {
            let currVertex = toVisitQueue.shift();

            for (let vertex of currVertex.adjacent) {
                if (!seen.has(vertex)) {
                    toVisitQueue.push(vertex);
                    seen.add(vertex);
                }
            }
        }
        seen.forEach((vertex) => values.push(vertex.value));
        return values;
    }
}

let graph = new Graph();
let S = new Node("S");
let P = new Node("P");
let U = new Node("U");
let X = new Node("X");
let Q = new Node("Q");
let Y = new Node("Y");
let V = new Node("V");
let R = new Node("R");
let W = new Node("W");
let T = new Node("T");

graph.addVertices([S, P, U, X, Q, Y, V, R, W, T]);

graph.addEdge(S, P);
graph.addEdge(S, U);

graph.addEdge(P, X);
graph.addEdge(U, X);

graph.addEdge(P, Q);
graph.addEdge(U, V);

graph.addEdge(X, Q);
graph.addEdge(X, Y);
graph.addEdge(X, V);

graph.addEdge(Q, R);
graph.addEdge(Y, R);

graph.addEdge(Y, W);
graph.addEdge(V, W);

graph.addEdge(R, T);
graph.addEdge(W, T);

graph.depthFirstSearch(S);

module.exports = { Graph, Node };
