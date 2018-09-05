interface BloomFilterContainer {
    getValue(index: number): boolean, 
    setValue(index: number): void
}

export default class BloomFilter {
    storage: BloomFilterContainer;

    // Bloom filter size directly affects the likelihood of false positives.
    // The bigger the size the lower the likelihood of false positives.
    constructor(public size = 100) {
        this.storage = this.createStore(size);
    }

    insert(item: string) : void {
        const hashValues = this.getHashValues(item);

        // Set each hashValue index to true.
        hashValues.forEach(val => this.storage.setValue(val));
    }

    mayContain(item: string) : boolean {
        const hashValues = this.getHashValues(item);

        for (let hashIndex = 0; hashIndex < hashValues.length; hashIndex += 1) {
            if (!this.storage.getValue(hashValues[hashIndex])) {
                // We know that the item was definitely not inserted.
                return false;
            }
        }

        // The item may or may not have been inserted.
        return true;
    }

    /**
     * Creates the data store for our filter.
     * We use this method to generate the store in order to
     * encapsulate the data itself and only provide access
     * to the necessary methods.
     */
    createStore(size: number) : BloomFilterContainer {
        const storage: boolean[] = [];

        // Initialize all indexes to false
        for (let storageCellIndex = 0; storageCellIndex < size; storageCellIndex += 1) {
            storage.push(false);
        }

        const storageInterface : BloomFilterContainer = {
            getValue(index) {
                return storage[index];
            },
            setValue(index) {
                storage[index] = true;
            },
        };

        return storageInterface;
    }

    hash1(item: string) : number {
        let hash = 0;

        for (let charIndex = 0; charIndex < item.length; charIndex += 1) {
            const char = item.charCodeAt(charIndex);
            hash = (hash << 5) + hash + char;
            hash &= hash; // Convert to 32bit integer
            hash = Math.abs(hash);
        }

        return hash % this.size;
    }

    hash2(item: string) : number {
        let hash = 5381;

        for (let charIndex = 0; charIndex < item.length; charIndex += 1) {
            const char = item.charCodeAt(charIndex);
            hash = (hash << 5) + hash + char; /* hash * 33 + c */
        }

        return Math.abs(hash % this.size);
    }

    hash3(item: string) : number {
        let hash = 0;

        for (let charIndex = 0; charIndex < item.length; charIndex += 1) {
            const char = item.charCodeAt(charIndex);
            hash = (hash << 5) - hash;
            hash += char;
            hash &= hash; // Convert to 32bit integer
        }

        return Math.abs(hash % this.size);
    }

    /**
     * Runs all 3 hash functions on the input and returns an array of results.
     *
     */
    getHashValues(item: string) : number[] {
        return [
            this.hash1(item),
            this.hash2(item),
            this.hash3(item),
        ];
    }
}
