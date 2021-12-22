import { delay } from './delay';

export const echo = async (msg: string, ms: number) => {
  await delay(ms);
  return msg;
};
