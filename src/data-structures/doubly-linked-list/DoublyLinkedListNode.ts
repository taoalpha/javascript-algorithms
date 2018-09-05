export default class DoublyLinkedListNode<T> {
    constructor(
        public value: T,
        public next: DoublyLinkedListNode<T> = null,
        public previous: DoublyLinkedListNode<T> = null
    ) {
    }

    toString(stringifier? : (value: T) => string) : string {
        return stringifier ? stringifier(this.value) : `${this.value}`;
    }
}
