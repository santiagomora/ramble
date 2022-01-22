export function rangeHelper(start: number, end: number)
{
    return Array(end - start + 1).fill(0).map((e, i) => start + i);
}