export async function reduce(
  iterable: (Promise<unknown> | unknown)[] | string,
  cb: (accumulator: unknown, item: unknown) => Promise<unknown>,
  initial: unknown
) {
  let aggregator = initial || iterable[0];

  for (const item of iterable) {
    aggregator = await cb(aggregator, item);
  }

  return aggregator;
}
