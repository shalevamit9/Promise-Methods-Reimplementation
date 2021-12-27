import { expect } from 'chai';
import { delay } from '../../src/async-lib/delay';

describe('delay module', () => {
  context('#delay', () => {
    it('should exist', () => {
      expect(delay).to.be.a('function');
      expect(delay).to.be.instanceOf(Function);
    });

    it('should wait at least 500ms', async () => {
      const start = Date.now();
      await delay(500);
      const end = Date.now();
      expect(end - start).to.be.greaterThanOrEqual(500);
    });
  });
});
