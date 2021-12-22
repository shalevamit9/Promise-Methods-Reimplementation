export async function mapSeries(
  iterable: (Promise<unknown> | unknown)[] | string,
  cb: (item: unknown) => Promise<unknown>
) {
  const results = [];
  for (const item of iterable) {
    results.push(await cb(item));
  }

  return typeof iterable === 'string' ? results.join('') : results;
}
