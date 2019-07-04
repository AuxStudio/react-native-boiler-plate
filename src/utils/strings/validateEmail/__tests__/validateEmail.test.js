import validateEmail from '..';

describe('validateEmail()', () => {
  it('should work', () => {
    expect(validateEmail()).toBe(false);
    expect(validateEmail('shaun@aux.co.za')).toBe(true);
    expect(validateEmail('shaun')).toBe(false);
    expect(validateEmail('shaun.co.za')).toBe(false);
    expect(validateEmail('@aux.co.za')).toBe(false);
    expect(validateEmail('shaun@aux')).toBe(false);
  });
});
