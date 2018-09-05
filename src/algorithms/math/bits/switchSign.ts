/**
 * Switch the sign of the number using "Twos Complement" approach.
 */
export default function switchSign(number: number): number {
  return ~number + 1;
}
