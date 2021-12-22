export async function all(promises: Promise<unknown>[]) {
  const results = [];

  for (const p of promises) {
    results.push(await p);
  }

  return results;
}
