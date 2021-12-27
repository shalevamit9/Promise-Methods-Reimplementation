import { expect } from 'chai';
import { filterSeries } from '../../src/async-lib/filter-series';
import { delay } from '../../src/async-lib/delay';

describe('filter-series module', () => {
  context('#filterSeries', () => {
    it('should exist', () => {
      expect(filterSeries).to.be.a('function');
      expect(filterSeries).to.be.instanceOf(Function);
    });

    it('should filter non alphabetic characters - asynchronous serial', async () => {
      const word = await filterSeries('G<4!e3ro0ni1mo', async (char) => {
        const c = char as string;
        await delay(100);
        return /^[A-Za-z]+$/.test(c);
      });

      expect(word).to.be.equal('Geronimo');
    });

    it('should run at least 1400 ms', async () => {
      const start = Date.now();
      await filterSeries('G<4!e3ro0ni1mo', async (char) => {
        const c = char as string;
        await delay(100);
        return /^[A-Za-z]+$/.test(c);
      });
      const end = Date.now();

      expect(end - start).to.be.greaterThanOrEqual(1400);
    });

    it('should throw an error', async () => {
      try {
        await filterSeries('G<4!e3ro0ni1mo', async () => {
          throw new Error('filter series failed');
        });
      } catch (err: unknown) {
        expect((err as Error).message).to.be.equal('filter series failed');
      }
    });
  });
});
