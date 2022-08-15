


export function locations(str: string, char: string): number[] {
  const indices: number[] = []
  for(let i = 0; i < str.length; i++) {
    if (str[i] === char) indices.push(i)
  }
  return indices
}

export function rangeIncludes(value: number, sortedNumberArray: number[]): [number, number, number] {
  let idx = 0
  while (sortedNumberArray[idx] < value) idx++
  return [idx, sortedNumberArray[idx - 1] + 1, sortedNumberArray[idx]]
}