import MixMap from '../../utils/mix-map/MixMap';

export default class TrieNode {
    children: MixMap<string, TrieNode> = new MixMap();
    constructor(public character: string, public isCompleteWord: boolean = false) {
    }

    getChild(character: string): TrieNode {
        return this.children.get(character);
    }

    addChild(character: string, isCompleteWord: boolean = false) : TrieNode {
        if (!this.children.has(character)) {
            this.children.set(character, new TrieNode(character, isCompleteWord));
        }

        const childNode = this.children.get(character);

        // In cases similar to adding "car" after "carpet" we need to mark "r" character as complete.
        childNode.isCompleteWord = childNode.isCompleteWord || isCompleteWord;

        return childNode;
    }

    removeChild(character: string): TrieNode {
        const childNode = this.getChild(character);

        // Delete childNode only if:
        // - childNode has NO children,
        // - childNode.isCompleteWord === false.
        if (
            childNode
            && !childNode.isCompleteWord
            && !childNode.hasChildren()
        ) {
            this.children.delete(character);
        }

        return this;
    }

    hasChild(character: string): boolean {
        return this.children.has(character);
    }

    /**
     * Check whether current TrieNode has children or not.
     */
    hasChildren(): boolean {
        return this.children.keys().length !== 0;
    }

    suggestChildren() : string[] {
        return [...this.children.keys()];
    }

    toString(): string {
        let childrenAsString = this.suggestChildren().toString();
        childrenAsString = childrenAsString ? `:${childrenAsString}` : '';
        const isCompleteString = this.isCompleteWord ? '*' : '';

        return `${this.character}${isCompleteString}${childrenAsString}`;
    }
}
