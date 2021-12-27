import { expect } from 'chai';
import { delay } from '../../src/async-lib/delay';
import { props } from '../../src/async-lib/props';

describe('props module', () => {
  context('#props', () => {
    it('should exist', () => {
      expect(props).to.be.a('function');
      expect(props).to.be.instanceOf(Function);
    });

    it('should return an object with resolved values', async () => {
      const pendingObj = {
        first: delay(1000).then(() => 'first promise'),
        second: delay(500).then(() => 'second promise')
      };

      const results = await props(pendingObj);
      expect(results).to.deep.equal({
        first: 'first promise',
        second: 'second promise'
      });
    });

    it('should run at most 1010 ms', async () => {
      const start = Date.now();
      const pendingObj = {
        first: delay(1000).then(() => 'first promise'),
        second: delay(500).then(() => 'second promise')
      };

      await props(pendingObj);
      const end = Date.now();
      expect(end - start).to.be.lessThanOrEqual(1010);
    });

    it('should throw an error', async () => {
      try {
        await props({
          first: delay(500).then(() => 'first promise'),
          second: delay(500).then(() => {
            throw new Error('props failed');
          })
        });
      } catch (err: unknown) {
        expect((err as Error).message).to.be.equal('props failed');
      }
    });
  });
});
