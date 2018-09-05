export default function factorialRecursive(number: number): number {
    return number > 1 ? number * factorialRecursive(number - 1) : 1;
}
