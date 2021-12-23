export async function filterParallel(
  iterable: (Promise<unknown> | unknown)[],
  cb: (item: unknown) => Promise<unknown>
) {
  const results = [];
  const pending = Array.from(iterable, (item) => cb(item));

  for (const [i, p] of pending.entries()) {
    if ((await p) === true) results.push(iterable[i]);
  }

  return typeof iterable === 'string' ? results.join('') : results;
}
