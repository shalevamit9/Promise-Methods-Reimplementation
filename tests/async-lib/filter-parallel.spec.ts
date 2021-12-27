import { expect } from 'chai';
import { delay } from '../../src/async-lib/delay';
import { filterParallel } from '../../src/async-lib/filter-parallel';
import { random } from '../../src/utils/random';

describe('filter-parallel module', () => {
  context('#filterParallel', () => {
    it('should exist', () => {
      expect(filterParallel).to.be.a('function');
      expect(filterParallel).to.be.instanceOf(Function);
    });

    it('should filter non alphabetic characters - asynchronous parallel', async () => {
      const word = await filterParallel('G<4!e3ro0ni1mo', async (char) => {
        const c = char as string;
        await delay(random(1000, 500));
        return /^[A-Za-z]+$/.test(c);
      });

      expect(word).to.be.equal('Geronimo');
    });

    it('should run at most 110 ms', async () => {
      const start = Date.now();
      await filterParallel('G<4!e3ro0ni1mo', async (char) => {
        const c = char as string;
        await delay(100);
        return /^[A-Za-z]+$/.test(c);
      });
      const end = Date.now();

      expect(end - start).to.be.lessThanOrEqual(110);
    });

    it('should throw an error', async () => {
      try {
        await filterParallel('G<4!e3ro0ni1mo', async () => {
          throw new Error('filter parallel failed');
        });
      } catch (err: unknown) {
        expect((err as Error).message).to.be.equal('filter parallel failed');
      }
    });
  });
});
