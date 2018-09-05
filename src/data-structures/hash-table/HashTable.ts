import LinkedList from '../linked-list/LinkedList';
import LinkedListNode from '../linked-list/LinkedListNode';

// Hash table size directly affects on the number of collisions.
// The bigger the hash table size the less collisions you'll get.
// For demonstrating purposes hash table size is small to show how collisions
// are being handled.
const defaultHashTableSize = 32;

interface HashNode<T> {
    key: string,
    value: T
}

export default class HashTable<T> {
  // Create hash table of certain size and fill each bucket with empty linked list.
  buckets: LinkedList<HashNode<T>>[] = [];

  // Just to keep track of all actual keys in a fast way.
  private keys: {
    [key: string]: number
  } = {};

  constructor(hashTableSize: number = defaultHashTableSize) {
    this.buckets = Array(hashTableSize).fill(null).map(() => new LinkedList());
  }

  /**
   * Converts key string to hash number.
   */
  hash(key: string) : number {
    // For simplicity reasons we will just use character codes sum of all characters of the key
    // to calculate the hash.
    //
    // But you may also use more sophisticated approaches like polynomial string hash to reduce the
    // number of collisions:
    //
    // hash = charCodeAt(0) * PRIME^(n-1) + charCodeAt(1) * PRIME^(n-2) + ... + charCodeAt(n-1)
    //
    // where charCodeAt(i) is the i-th character code of the key, n is the length of the key and
    // PRIME is just any prime number like 31.
    const hash = Array.from(key).reduce(
      (hashAccumulator, keySymbol) => (hashAccumulator + keySymbol.charCodeAt(0)),
      0,
    );

    // Reduce hash number so it would fit hash table size.
    return hash % this.buckets.length;
  }

  set(key: string, value: T) : void {
    const keyHash = this.hash(key);
    this.keys[key] = keyHash;
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({ criteria: nodeValue => nodeValue.key === key });

    if (!node) {
      // Insert new node.
      bucketLinkedList.append({ key, value });
    } else {
      // Update value of existing node.
      node.value.value = value;
    }
  }

  delete(key: string) : LinkedListNode<HashNode<T>> {
    const keyHash = this.hash(key);
    delete this.keys[key];
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({ criteria: nodeValue => nodeValue.key === key });

    if (node) {
      return bucketLinkedList.delete(node.value);
    }

    return null;
  }

  get(key: string) : T {
    const bucketLinkedList = this.buckets[this.hash(key)];
    const node = bucketLinkedList.find({ criteria: nodeValue => nodeValue.key === key });

    return node ? node.value.value : undefined;
  }

  has(key: string) : boolean {
    return Object.hasOwnProperty.call(this.keys, key);
  }

  getKeys() : string[] {
    return Object.keys(this.keys);
  }
}
