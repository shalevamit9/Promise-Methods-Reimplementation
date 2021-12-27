import { expect } from 'chai';
import { delay } from '../../src/async-lib/delay';
import { mapSeries } from '../../src/async-lib/map-series';
import { random } from '../../src/utils/random';

describe('map-series module', () => {
  context('#mapSeries', () => {
    it('should exist', () => {
      expect(mapSeries).to.be.a('function');
      expect(mapSeries).to.be.instanceOf(Function);
    });

    it('should map strings with an array of upper-case strings - asynchronous series', async () => {
      const strs = ['first', 'second', 'third'];
      const results = await mapSeries(strs, async (p) => {
        const str = (await p) as string;
        await delay(random(1000, 500));
        return str.toUpperCase();
      });

      expect(results).to.deep.equal(['FIRST', 'SECOND', 'THIRD']);
    });

    it('should run at least 1500 ms', async () => {
      const strs = ['first', 'second', 'third'];
      const start = Date.now();
      await mapSeries(strs, async (val) => {
        const str = val as string;
        await delay(500);
        return str.toUpperCase();
      });
      const end = Date.now();

      expect(end - start).to.be.greaterThanOrEqual(1500);
    });

    it('should throw an error', async () => {
      try {
        await mapSeries(['first', 'second', 'third'], async () => {
          throw new Error('filter series failed');
        });
      } catch (err: unknown) {
        expect((err as Error).message).to.be.equal('filter series failed');
      }
    });
  });
});
