export async function mapParallel(
  iterable: (Promise<unknown> | unknown)[],
  cb: (item: unknown) => Promise<unknown>
) {
  const results = [];
  const pending = Array.from(iterable, (item) => cb(item));
  for (const p of pending) {
    results.push(await p);
  }

  return results;
}
