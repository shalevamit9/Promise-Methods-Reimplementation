import { expect } from 'chai';
import { all } from '../../src/async-lib/all';
import { delay } from '../../src/async-lib/delay';

describe('all module', () => {
  context('#all', () => {
    it('should exist', () => {
      expect(all).to.be.a('function');
      expect(all).to.be.instanceOf(Function);
    });

    it('should await all pending promises', async () => {
      const pending = [
        delay(500).then(() => '500 ms'),
        delay(1500).then(() => '1500 ms')
      ];

      const results = await all(pending);
      expect(results).to.deep.equal(['500 ms', '1500 ms']);
    });

    it('should run at most 1510 ms', async () => {
      const start = Date.now();
      const pending = [
        delay(500).then(() => '500 ms'),
        delay(1500).then(() => '1500 ms')
      ];

      await all(pending);
      const end = Date.now();
      expect(end - start).to.be.lessThanOrEqual(1510);
    });

    it('should throw an error', async () => {
      try {
        const pending = [
          delay(500).then(() => {
            throw new Error('my error');
          }),
          delay(500).then(() => 'success')
        ];

        await all(pending);
      } catch (err: unknown) {
        expect((err as Error).message).to.be.equal('my error');
      }
    });
  });
});
