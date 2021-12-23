export function some(iterable: Promise<unknown>[], count: number) {
  return new Promise((resolve, reject) => {
    const results: unknown[] = [];
    let successfullCount = 0;

    iterable = iterable.map((item) => {
      if (item instanceof Promise) return item;
      return Promise.resolve(item);
    });

    iterable.forEach((item) => {
      item
        .then((resolvedItem) => {
          successfullCount++;
          results.push(resolvedItem);
          if (successfullCount === count) resolve(results);
        })
        .catch(reject);
    });
  });
}
