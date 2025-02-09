function generateOrderNumberCode(totalOrders: number): string {
  return totalOrders.toString().padStart(6, '0');
}

function getRandomValueFromArray<T>(array: T[]): T | undefined {
  if (array.length === 0) {
    return undefined; // Retorna undefined si el array está vacío
  }
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export { generateOrderNumberCode, getRandomValueFromArray };
