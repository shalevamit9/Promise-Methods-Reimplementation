import { expect } from 'chai';
import { delay } from '../../src/async-lib/delay';
import { reduce } from '../../src/async-lib/reduce';

describe('reduce module', () => {
  context('#reduce', () => {
    it('should exist', () => {
      expect(reduce).to.be.a('function');
      expect(reduce).to.be.instanceOf(Function);
    });

    it('should sum the array', async () => {
      const numbers = [1, 5, 3, 6];
      const sum = await reduce(
        numbers,
        async (acc, num) => {
          return (acc as number) + (num as number);
        },
        0
      );

      expect(sum).to.be.equal(15);
    });

    it('should run at least 1500 ms', async () => {
      const start = Date.now();
      await reduce(
        [1, 2, 3],
        async (acc, num) => {
          await delay(500);
          return (acc as number) + (num as number);
        },
        0
      );
      const end = Date.now();
      expect(end - start).to.be.greaterThanOrEqual(1500);
    });

    it('should throw an error', async () => {
      try {
        await reduce(
          [1, 2, 3],
          () => {
            throw new Error('reduce failed');
          },
          0
        );
      } catch (err: unknown) {
        expect((err as Error).message).to.be.equal('reduce failed');
      }
    });
  });
});
