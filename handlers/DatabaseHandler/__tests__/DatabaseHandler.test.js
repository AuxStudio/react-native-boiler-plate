import React from 'react';
import renderer from 'react-test-renderer';

import { DatabaseHandler } from '..';

describe('DatabaseHandler', () => {
  let spy;
  const dispatch = jest.fn();

  it('renders with all props', () => {
    expect(
      renderer.create(<DatabaseHandler dispatch={jest.fn()} authenticated />),
    ).toMatchSnapshot();
  });

  it('renders with minimum required props', () => {
    expect(renderer.create(<DatabaseHandler dispatch={jest.fn()} />)).toMatchSnapshot();
  });

  it('calls syncData on componentDidMount if authenticated prop is supplied', () => {
    spy = jest.spyOn(DatabaseHandler.prototype, 'syncData');

    renderer.create(<DatabaseHandler dispatch={dispatch} authenticated />);

    expect(spy).toHaveBeenCalled();
  });

  it('does not call syncData on componentDidMount if authenticated prop is not supplied', () => {
    spy = jest.spyOn(DatabaseHandler.prototype, 'syncData');

    renderer.create(<DatabaseHandler dispatch={dispatch} />);

    expect(spy).not.toHaveBeenCalled();
  });

  afterEach(() => {
    if (spy) {
      spy.mockClear();
    }
  });
});
