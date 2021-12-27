export async function reduce(
  iterable: (Promise<unknown> | unknown)[],
  cb: (accumulator: unknown, item: unknown) => Promise<unknown>,
  initial: unknown
) {
  let aggregator = initial !== undefined ? initial : iterable.shift();

  for (const item of iterable) {
    aggregator = await cb(aggregator, item);
  }

  return aggregator;
}
