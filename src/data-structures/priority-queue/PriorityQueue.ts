import MinHeap from '../heap/MinHeap';
import Comparator, { CompareResult } from '../../utils/comparator/Comparator';
import MixMap from '../../utils/mix-map/MixMap';

// It is the same as min heap except that when comparing to elements
// we take into account not element's value but rather its priority.
export default class PriorityQueue extends MinHeap {
    priorities: MixMap<any, number> = new MixMap();

    constructor() {
        super();
        this.compare = new Comparator(this.comparePriority.bind(this));
    }

    /**
     * @param {*} item
     * @param {number} [priority]
     * @return {PriorityQueue}
     */
    add(item: any, priority: number = 0) : PriorityQueue {
        this.priorities.set(item, priority);
        super.add(item);

        return this;
    }

    remove(item: any, customFindingComparator?: Comparator) : PriorityQueue {
        super.remove(item, customFindingComparator);
        this.priorities.delete(item);

        return this;
    }

    changePriority(item: any, priority: number) : PriorityQueue {
        this.remove(item, new Comparator(this.compareValue));
        this.add(item, priority);

        return this;
    }

    findByValue(item: any) : number[] {
        return this.find(item, new Comparator(this.compareValue));
    }

    hasValue(item: any) : boolean {
        return this.findByValue(item).length > 0;
    }

    comparePriority(a: any, b: any) : CompareResult {
        if (this.priorities.get(a) === this.priorities.get(b)) {
            return 0;
        }

        return this.priorities.get(a) < this.priorities.get(b) ? -1 : 1;
    }

    compareValue(a: any, b: any) : CompareResult {
        if (a === b) {
            return 0;
        }

        return a < b ? -1 : 1;
    }
}
