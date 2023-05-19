import { labelGenerator } from '../utils/utils';

describe('utils tests', () => {
  it('should generate a label', async() => {
    const now = new Date().getTime().toString();
    const result = labelGenerator();

    expect(result).toBe(now);
  });
});
