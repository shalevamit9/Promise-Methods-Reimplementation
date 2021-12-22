interface PromiseObject {
  [key: string]: Promise<unknown>;
}

interface ResolvedObject {
  [key: string]: unknown;
}

export async function props(promisesObj: PromiseObject) {
  const results: ResolvedObject = {};
  for (const key in promisesObj) {
    results[key] = await promisesObj[key];
  }

  return results;
}
