export type CompareResult = -1 | 0 | 1;
export type CompareRequest = any;
export type CompareFunction = (a: CompareRequest, b: CompareRequest) => CompareResult;

export default class Comparator {
    private compare: CompareFunction;

    constructor(compareFunction?: CompareFunction) {
        this.compare = compareFunction || Comparator.defaultCompareFunction;
    }

    static defaultCompareFunction(a: CompareRequest, b: CompareRequest): CompareResult {
        if (a === b) {
            return 0;
        }

        return a < b ? -1 : 1;
    }

    equal(a: CompareRequest, b: CompareRequest): boolean {
        return this.compare(a, b) === 0;
    }

    lessThan(a: CompareRequest, b: CompareRequest): boolean {
        return this.compare(a, b) < 0;
    }

    greaterThan(a: CompareRequest, b: CompareRequest): boolean {
        return this.compare(a, b) > 0;
    }

    lessThanOrEqual(a: CompareRequest, b: CompareRequest): boolean {
        return this.lessThan(a, b) || this.equal(a, b);
    }

    greaterThanOrEqual(a: CompareRequest, b: CompareRequest): boolean {
        return this.greaterThan(a, b) || this.equal(a, b);
    }

    reverse(): void {
        const compareOriginal = this.compare;
        this.compare = (a, b) => compareOriginal(b, a);
    }
}
