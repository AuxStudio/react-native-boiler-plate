import prepareNextAction from '..';

describe('prepareNextAction', () => {
  it('should return a valid action from true response and nextAction with no payload', () => {
    expect(
      prepareNextAction(
        {
          meta: {
            nextAction: {
              type: 'test',
            },
          },
        },
        true,
      ),
    ).toEqual({
      type: 'test',
      payload: {},
    });
  });

  it('should return a valid action from null response and nextAction with payload', () => {
    expect(
      prepareNextAction(
        {
          meta: {
            nextAction: {
              type: 'test',
              payload: {
                foo: 'bar',
              },
            },
          },
        },
        null,
      ),
    ).toEqual({
      type: 'test',
      payload: {
        foo: 'bar',
      },
    });
  });

  it('should return a valid action from true response and nextAction with payload', () => {
    expect(
      prepareNextAction(
        {
          meta: {
            nextAction: {
              type: 'test',
              payload: {
                foo: 'bar',
              },
            },
          },
        },
        true,
      ),
    ).toEqual({
      type: 'test',
      payload: {
        foo: 'bar',
      },
    });
  });

  it('should return a valid action from response as payload and nextAction with no payload', () => {
    expect(
      prepareNextAction(
        {
          meta: {
            nextAction: {
              type: 'test',
            },
          },
        },
        {
          foo: 'bar',
        },
      ),
    ).toEqual({
      type: 'test',
      payload: {
        foo: 'bar',
      },
    });
  });

  it('should return a valid action from response as payload and nextAction with payload', () => {
    expect(
      prepareNextAction(
        {
          meta: {
            nextAction: {
              type: 'test',
              payload: {
                metaFoo: 'bar',
              },
            },
          },
        },
        {
          responseFoo: 'bar',
        },
      ),
    ).toEqual({
      type: 'test',
      payload: {
        responseFoo: 'bar',
        metaFoo: 'bar',
      },
    });
  });

  it('should return a valid action from response as payload and nextAction with payload and nextAction payload should take priority', () => {
    expect(
      prepareNextAction(
        {
          meta: {
            nextAction: {
              type: 'test',
              payload: {
                foo: 'metaBar',
              },
            },
          },
        },
        {
          foo: 'responseBar',
        },
      ),
    ).toEqual({
      type: 'test',
      payload: {
        foo: 'metaBar',
      },
    });
  });

  it('should not return anything if the meta data is null', () => {
    expect(
      prepareNextAction(
        {
          meta: null,
        },
        true,
      ),
    ).toBe(null);
  });

  it('should not return anything if there is no nextAction on the meta data', () => {
    expect(
      prepareNextAction(
        {
          meta: {
            nextAction: null,
          },
        },
        true,
      ),
    ).toBe(null);
  });
});
