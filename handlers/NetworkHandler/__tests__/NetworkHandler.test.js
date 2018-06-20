import React from 'react';
import renderer from 'react-test-renderer';

import { NetworkHandler } from '../';

describe('NetworkHandler', () => {
  it('renders with all props', () => {
    expect(
      renderer.create(<NetworkHandler dispatch={jest.fn()} realtimeDatabaseMode />),
    ).toMatchSnapshot();
  });

  it('renders with minimum required props', () => {
    expect(renderer.create(<NetworkHandler dispatch={jest.fn()} />)).toMatchSnapshot();
  });
});

describe('NetworkHandler', () => {
  let spy;
  const dispatch = jest.fn();

  it('calls addNetInfoEventListener on componentDidMount', () => {
    spy = jest.spyOn(NetworkHandler.prototype, 'addNetInfoEventListener');

    renderer.create(<NetworkHandler dispatch={dispatch} />);

    expect(spy).toHaveBeenCalled();
  });

  it('calls removeNetInfoEventListener on componentWillUnmount', () => {
    const lifecycleSpy = jest.spyOn(NetworkHandler.prototype, 'componentWillUnmount');
    spy = jest.spyOn(NetworkHandler.prototype, 'removeNetInfoEventListener');
    const instance = renderer.create(<NetworkHandler dispatch={dispatch} />);

    instance.unmount();

    expect(lifecycleSpy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });

  afterEach(() => {
    if (spy) {
      spy.mockReset();
    }
  });
});

// calls removeNet...  on unmount
// dispatches change action on simulated change
// calls goOffline on simulated change
// goOffline dispatch matches snapshot
// calls goOnline on simulated change
// goOnline dispatch matches snapshot
