import log from '@ajar/marker';

export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function delayTest() {
  log.red('before delay');
  await delay(3000);
  log.blue('after delay');
}
