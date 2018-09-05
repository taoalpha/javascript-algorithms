import DisjointSetItem from './DisjointSetItem';
import MixMap from '../../utils/mix-map/MixMap';

export default class DisjointSet<K, V> {
    items: MixMap<K, DisjointSetItem<K, V>> = new MixMap();
    constructor(public keyCallback: (value: V) => K = value => value as any) {
    }

    makeSet(itemValue: V) : DisjointSet<K, V> {
        const disjointSetItem = new DisjointSetItem(itemValue, this.keyCallback);

        if (!this.items.has(disjointSetItem.getKey())) {
            // Add new item only in case if it not presented yet.
            this.items.set(disjointSetItem.getKey(), disjointSetItem);
        }

        return this;
    }

    /**
     * Find set representation node.
     */
    find(itemValue: V) : K {
        const templateDisjointItem = new DisjointSetItem(itemValue, this.keyCallback);

        // Try to find item itself;
        const requiredDisjointItem = this.items.get(templateDisjointItem.getKey());

        if (!requiredDisjointItem) {
            return null;
        }

        return requiredDisjointItem.getRoot().getKey();
    }

    /**
     * Union by rank.
     *
     */
    union(valueA: V, valueB: V) : DisjointSet<K, V> {
        const rootKeyA = this.find(valueA);
        const rootKeyB = this.find(valueB);

        if (rootKeyA === null || rootKeyB === null) {
            throw new Error('One or two values are not in sets');
        }

        if (rootKeyA === rootKeyB) {
            // In case if both elements are already in the same set then just return its key.
            return this;
        }

        const rootA = this.items.get(rootKeyA);
        const rootB = this.items.get(rootKeyB);

        if (rootA.getRank() < rootB.getRank()) {
            // If rootB's tree is bigger then make rootB to be a new root.
            rootB.addChild(rootA);

            return this;
        }

        // If rootA's tree is bigger then make rootA to be a new root.
        rootA.addChild(rootB);

        return this;
    }

    inSameSet(valueA: V, valueB: V) : boolean {
        const rootKeyA = this.find(valueA);
        const rootKeyB = this.find(valueB);

        if (rootKeyA === null || rootKeyB === null) {
            throw new Error('One or two values are not in sets');
        }

        return rootKeyA === rootKeyB;
    }
}
