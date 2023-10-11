export function generateRandomNumbersArray(
  amount = 0,
  max = 10,
  excludedIndexes = [],
) {
  if (!amount) {
    return [];
  }

  const numbers: Set<number> = new Set();
  const excluded: Set<number> = new Set(excludedIndexes);

  while (numbers.size < amount) {
    const randomNumber = Math.floor(Math.random() * max) + 1;
    if (!excluded.has(randomNumber)) {
      numbers.add(randomNumber);
    }
  }

  return [...numbers];
}
