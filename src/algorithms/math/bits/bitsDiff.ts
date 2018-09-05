import countSetBits from './countSetBits';

/**
 * Counts the number of bits that need to be change in order
 * to convert numberA to numberB.
 *
 */
export default function bitsDiff(numberA: number, numberB: number): number {
    return countSetBits(numberA ^ numberB);
}
