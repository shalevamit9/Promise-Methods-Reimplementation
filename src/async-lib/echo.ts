import { delay } from './delay.js';

export const echo = async (msg: string, ms: number) => {
  await delay(ms);
  return msg;
};
