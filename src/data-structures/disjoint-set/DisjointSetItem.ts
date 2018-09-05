import MixMap from "../../utils/mix-map/MixMap";

export default class DisjointSetItem<K, V> {
    parent: DisjointSetItem<K, V> = null;
    children: MixMap<K, DisjointSetItem<K, V>> = new MixMap();

    constructor(public value: V, public keyCallback: (value: V) => K = value => value as any) {
    }

    getKey() : K {
        // Allow user to define custom key generator.
        if (this.keyCallback) {
            return this.keyCallback(this.value);
        }

        // Otherwise use value as a key by default.
        return this.value as any;
    }

    getRoot() : DisjointSetItem<K, V> {
        return this.isRoot() ? this : this.parent.getRoot();
    }

    isRoot() : boolean {
        return this.parent === null;
    }

    /**
     * Rank basically means the number of all descendants.
     */
    getRank() : number {
        if (this.getChildren().length === 0) {
            return 0;
        }

        let rank = 0;

        this.getChildren().forEach(child => {
            // Count child itself.
            rank += 1;

            // Also add all children of current child.
            rank += child.getRank();
        });

        return rank;
    }

    getChildren() : DisjointSetItem<K, V>[] {
        return this.children.values();
    }

    setParent(parentItem: DisjointSetItem<K, V>, forceSettingParentChild: boolean = true) : DisjointSetItem<K, V> {
        this.parent = parentItem;
        if (forceSettingParentChild) {
            parentItem.addChild(this);
        }

        return this;
    }

    addChild(childItem: DisjointSetItem<K, V>) : DisjointSetItem<K, V> {
        this.children.set(childItem.getKey(), childItem);
        childItem.setParent(this, false);

        return this;
    }
}
