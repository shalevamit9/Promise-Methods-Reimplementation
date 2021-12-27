import { expect } from 'chai';
import { delay } from '../../src/async-lib/delay';
import { race } from '../../src/async-lib/race';

describe('race module', () => {
  context('#race', () => {
    it('should exist', () => {
      expect(race).to.be.a('function');
      expect(race).to.be.instanceOf(Function);
    });

    it('should return the first promise to finish', async () => {
      const pending = [
        delay(500).then(() => 'first'),
        delay(200).then(() => 'second'),
        delay(900).then(() => 'third')
      ];

      const result = await race(pending);
      expect(result).to.be.equal('second');
    });

    it('should run at most 210 ms', async () => {
      const start = Date.now();
      const pending = [
        delay(500).then(() => 'first'),
        delay(200).then(() => 'second'),
        delay(900).then(() => 'third')
      ];

      await race(pending);
      const end = Date.now();
      expect(end - start).to.be.lessThanOrEqual(210);
    });

    it('should throw an error', async () => {
      try {
        await race([
          delay(500).then(() => 'first'),
          delay(200).then(() => {
            throw new Error('race failed');
          }),
          delay(900).then(() => 'third')
        ]);
      } catch (err: unknown) {
        expect((err as Error).message).to.be.equal('race failed');
      }
    });
  });
});
