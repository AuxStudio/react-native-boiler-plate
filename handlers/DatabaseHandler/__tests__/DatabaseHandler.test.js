import React from 'react';
import renderer from 'react-test-renderer';

import { DatabaseHandler } from '../';

it('renders a DatabaseHandler', () => {
  expect(renderer.create(<DatabaseHandler dispatch={jest.fn()} authenticated />)).toMatchSnapshot();
});

it('renders a DatabaseHandler with minimum required props', () => {
  expect(renderer.create(<DatabaseHandler dispatch={jest.fn()} />)).toMatchSnapshot();
});

describe('handles its methods', () => {
  let spy;
  const dispatch = jest.fn();

  it('dispatches listenForData on mount if authenticated', () => {
    spy = jest.spyOn(DatabaseHandler.prototype, 'listenForData');

    renderer.create(<DatabaseHandler dispatch={dispatch} authenticated />);

    expect(spy).toHaveBeenCalled();
  });

  it('does not dispatch listenForData on mount if not authenticated', () => {
    spy = jest.spyOn(DatabaseHandler.prototype, 'listenForData');

    renderer.create(<DatabaseHandler dispatch={dispatch} />);

    expect(spy).not.toHaveBeenCalled();
  });

  afterEach(() => {
    if (spy) {
      spy.mockReset();
    }
  });
});
