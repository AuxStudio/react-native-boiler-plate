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
    spy = jest.spyOn(NetworkHandler.prototype, 'removeNetInfoEventListener');
    const instance = renderer.create(<NetworkHandler dispatch={dispatch} />);

    instance.unmount();

    expect(spy).toHaveBeenCalled();
  });

  afterEach(() => {
    if (spy) {
      spy.mockReset();
    }
  });
});

// dispatches change action on simulated change
describe('NetworkHandler', () => {
  let spy;
  const dispatch = jest.fn();

  it('updates the store with connection info', () => {
    const component = renderer.create(<NetworkHandler dispatch={dispatch} realtimeDatabaseMode />);
    const instance = component.getInstance();
    const connectionInfo = {
      type: 'wifi',
      effectiveType: '4g',
    };

    instance.handleConnectionChange(connectionInfo);
    expect(dispatch).toMatchSnapshot();
  });

  it('updates the store with connection info and goes online', () => {
    spy = jest.spyOn(NetworkHandler.prototype, 'goOnline');
    const component = renderer.create(<NetworkHandler dispatch={dispatch} />);
    const instance = component.getInstance();
    const connectionInfo = {
      type: 'wifi',
      effectiveType: '4g',
    };

    instance.handleConnectionChange(connectionInfo);
    expect(spy).toHaveBeenCalled();
    expect(dispatch).toMatchSnapshot();
  });

  afterEach(() => {
    if (spy) {
      spy.mockReset();
    }
  });

  it('updates the store with connection info and goes offline', () => {
    spy = jest.spyOn(NetworkHandler.prototype, 'goOffline');
    const component = renderer.create(<NetworkHandler dispatch={dispatch} realtimeDatabaseMode />);
    const instance = component.getInstance();
    const connectionInfo = {
      type: 'none',
    };

    instance.handleConnectionChange(connectionInfo);
    expect(spy).toHaveBeenCalled();
    expect(dispatch).toMatchSnapshot();
  });

  afterEach(() => {
    if (spy) {
      spy.mockReset();
    }
  });
});
