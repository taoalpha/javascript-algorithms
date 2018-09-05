import { CompareFunction } from "../comparator/Comparator";

interface Item<V> {
    value: V,
    index: number
}

export default class MixMap<K, V> {
    private _map: Map<Object, Item<V>> = new Map();
    private _hashMap: {} = {};
    private _boolMap: Item<V>[] = [];
    private _array: Item<V>[] = [];
    private _keys: K[] = [];

    constructor(map?: any) { 
        if (map) Object.keys(map).forEach(key => this.set(key as any, map[key]));
    }

    set(key: K, value: V) : void {
        this._keys.push(key);
        let index = this._keys.length - 1;
        if (typeof key === "number") {
            this._array[key] = {value, index};
        } else if (typeof key === "string" || typeof key === "symbol") {
            this._hashMap[key as string | symbol] = { value, index };
        } else if (typeof key === "boolean") {
            this._boolMap[Number(key)] = {value, index};
        } else {
            this._map.set(key as Object, {value, index});
        }
    }

    private _get(key: K): Item<V> {
        let value: Item<V>;
        if (typeof key === "number") {
            value = this._array[key];
        } else if (typeof key === "string" || typeof key === "symbol") {
            value = this._hashMap[key as string | symbol];
        } else if (typeof key === "boolean") {
            value = this._boolMap[Number(key)];
        } else {
            value = this._map.get(key as Object);
        }

        return value;
    }

    get(key: K): V {
        let value = this._get(key);
        return value ? value.value : undefined
    }

    has(key: K) : boolean {
        if (typeof key === "number") {
            return Object.hasOwnProperty.call(this._array, key);
        } else if (typeof key === "string" || typeof key === "symbol") {
            return Object.hasOwnProperty.call(this._hashMap, key);
        } else if (typeof key === "boolean") {
            return Object.hasOwnProperty.call(this._boolMap, Number(key));
        } else {
            return this._map.has(key as Object);
        }
    }

    delete(key: K) : void {
        let value = this._get(key);
        if (typeof key === "number") {
            delete this._array[key];
        } else if (typeof key === "string" || typeof key === "symbol") {
            delete this._hashMap[key as string | symbol];
        } else if (typeof key === "boolean") {
            delete this._boolMap[Number(key)];
        } else {
            this._map.delete(key as Object);
        }

        this._keys.splice(value.index, 1);
    }

    keys(): K[] {
        return this._keys;
    }

    values(): V[] {
        return this._keys.map(key => this.get(key));
    }

    isEqual(map: MixMap<K, V>, isEqual = (a: V, b: V) : boolean => a === b): boolean {
        if (!(map instanceof MixMap)) return false;

        return map.keys().every(key => isEqual(map.get(key), this.get(key)));
    }

    toJSON(jsonifier?: (keys: K[]) => any) : any {
        let res: any = {};
        if (jsonifier) return jsonifier(this.keys());
        try {
            this.keys().forEach(key => {
                res[key as any] = this.get(key);
            })
        } catch(e) {}
        return res;
    }
}
