import GraphVertex from "./GraphVertex";

export interface EdgeKey<T> {
    start: T,
    end: T,
    toString(stringifier?: (key: T) => string): string
}

export default class GraphEdge<T> {
    private _key: EdgeKey<T> = {
        start: this.startVertex.getKey(),
        end: this.endVertex.getKey(),
        toString(stringifier = (v: T) => v.toString()) : string {
            return `${stringifier(this.start)}_${stringifier(this.end)}`;
        }
    }

    constructor(
        public startVertex: GraphVertex<T>,
        public endVertex: GraphVertex<T>,
        public weight = 0
    ) {
    }

    getKey(): EdgeKey<T> {
        return this._key;
    }

    reverse(): GraphEdge<T> {
        const tmp = this.startVertex;
        this.startVertex = this.endVertex;
        this.endVertex = tmp;

        return this;
    }

    // TODO: maybe should honor vertex's toString ?
    toString(stringifier?: (value: EdgeKey<T>) => string): string {
        return stringifier ? stringifier(this.getKey()) : JSON.stringify(this.getKey());
    }
}
