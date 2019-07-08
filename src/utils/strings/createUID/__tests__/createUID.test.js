import createUID from '..';

describe('createUID', () => {
  it('creates a unique ID', () => {
    const UID1 = createUID();
    const UID2 = createUID();

    expect(UID1).not.toBeNull();
    expect(UID1).not.toBe(UID2);
  });
});
