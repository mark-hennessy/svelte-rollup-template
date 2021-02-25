import { sayHi } from '~/utils/stringUtils';

describe('stringUtils', () => {
  it('sayHi', () => {
    expect(sayHi()).toBeUndefined();
  });
});
