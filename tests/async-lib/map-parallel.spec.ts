import { expect } from 'chai';
import { delay } from '../../src/async-lib/delay';
import { mapParallel } from '../../src/async-lib/map-parallel';
import { random } from '../../src/utils/random';

describe('map-parallel module', () => {
  context('#mapParallel', () => {
    it('should exist', () => {
      expect(mapParallel).to.be.a('function');
      expect(mapParallel).to.be.instanceOf(Function);
    });

    it('should map promises with an array of upper-case resolved strings - asynchronous parallel', async () => {
      const pending = [
        delay(1000).then(() => 'first'),
        delay(100).then(() => 'second'),
        delay(1500).then(() => 'third')
      ];

      const results = await mapParallel(pending, async (p) => {
        const str = (await p) as string;
        await delay(random(1000, 500));
        return str.toUpperCase();
      });

      expect(results).to.deep.equal(['FIRST', 'SECOND', 'THIRD']);
    });

    it('should map strings with an array of upper-case strings - asynchronous parallel', async () => {
      const strs = ['first', 'second', 'third'];

      const results = await mapParallel(strs, async (p) => {
        const str = (await p) as string;
        await delay(random(1000, 500));
        return str.toUpperCase();
      });

      expect(results).to.deep.equal(['FIRST', 'SECOND', 'THIRD']);
    });

    it('should run at most 1010 ms', async () => {
      const strs = ['first', 'second', 'third'];
      const start = Date.now();
      await mapParallel(strs, async (val) => {
        const str = val as string;
        await delay(random(1000));
        return str.toUpperCase();
      });
      const end = Date.now();

      expect(end - start).to.be.lessThanOrEqual(1010);
    });

    it('should throw an error', async () => {
      try {
        await mapParallel(['first', 'second', 'third'], async () => {
          throw new Error('filter parallel failed');
        });
      } catch (err: unknown) {
        expect((err as Error).message).to.be.equal('filter parallel failed');
      }
    });
  });
});
