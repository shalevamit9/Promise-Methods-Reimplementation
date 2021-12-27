import { expect } from 'chai';
import { delay } from '../../src/async-lib/delay';
import { some } from '../../src/async-lib/some';

describe('some module', () => {
  context('#some', () => {
    it('should exist', () => {
      expect(some).to.be.a('function');
      expect(some).to.be.instanceOf(Function);
    });

    it('should return the two most fast promise to finish', async () => {
      const pending = [
        delay(500).then(() => 'first'),
        delay(200).then(() => 'second'),
        delay(900).then(() => 'third')
      ];

      const result = await some(pending, 2);
      expect(result).to.deep.equal(['second', 'first']);
    });

    it('should return the five most fast promise to finish', async () => {
      const pending = [
        delay(500).then(() => 1),
        delay(200).then(() => 2),
        delay(900).then(() => 3),
        delay(100).then(() => 4),
        delay(300).then(() => 5),
        delay(700).then(() => 6),
        delay(600).then(() => 7)
      ];

      const result = await some(pending, 5);
      expect(result).to.deep.equal([4, 2, 5, 1, 7]);
    });

    it('should run at most 510 ms', async () => {
      const start = Date.now();
      const pending = [
        delay(500).then(() => 'first'),
        delay(200).then(() => 'second'),
        delay(900).then(() => 'third')
      ];

      await some(pending, 2);
      const end = Date.now();
      expect(end - start).to.be.lessThanOrEqual(510);
    });

    it('should throw an error', async () => {
      try {
        await some(
          [
            delay(500).then(() => {
              throw new Error('some failed');
            }),
            delay(200).then(() => 'second'),
            delay(900).then(() => 'third')
          ],
          2
        );
      } catch (err: unknown) {
        expect((err as Error).message).to.be.equal('some failed');
      }
    });
  });
});
