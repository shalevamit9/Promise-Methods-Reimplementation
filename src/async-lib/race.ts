export async function race(promises: Promise<unknown>[]) {
  return await new Promise((resolve) => {
    promises.forEach(async (p) => {
      resolve(await p);
    });
  });
}
