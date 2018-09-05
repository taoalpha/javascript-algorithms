export default function countSetBits(originalNumber: number): number {
    let setBitsCount = 0;
    let number = originalNumber;

    while (number) {
        // Add last bit of the number to the sum of set bits.
        setBitsCount += number & 1;

        // Shift number right by one bit to investigate other bits.
        number >>= 1;
    }

    return setBitsCount;
}
