function delay<T>(t: number, v?: T): Promise<T | undefined> {
  return new Promise((resolve) => setTimeout(() => resolve(v), t));
}

export { delay };
