export default function isPowerOfTwo(number: number): boolean {
  return (number & (number - 1)) === 0;
}
