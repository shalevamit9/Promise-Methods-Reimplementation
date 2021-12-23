export async function filterSeries(
  iterable: (Promise<unknown> | unknown)[] | string,
  cb: (item: unknown) => Promise<unknown>
) {
  const results = [];
  for (const item of iterable) {
    if ((await cb(item)) === true) results.push(item);
  }
  return typeof iterable === 'string' ? results.join('') : results;
}
