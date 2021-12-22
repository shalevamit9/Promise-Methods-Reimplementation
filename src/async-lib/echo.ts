import log from '@ajar/marker';
import { delay } from './delay';

export const echo = async (msg: string, ms: number) => {
  log.yellow(`--> start ${msg}`);
  await delay(ms);
  log.blue(`finish <-- ${msg}`);
  return msg;
};
