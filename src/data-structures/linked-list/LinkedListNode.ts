export default class LinkedListNode<T> {
    constructor(
        public value: T,
        public next: LinkedListNode<T> = null
    ) {
    }

    toString(stringifier?: (value: T) => string): string {
        return stringifier ? stringifier(this.value) : `${this.value}`;
    }
}
  