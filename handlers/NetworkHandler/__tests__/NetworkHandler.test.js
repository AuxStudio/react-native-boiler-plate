import React from 'react';
import renderer from 'react-test-renderer';

import { NetworkHandler } from '..';

describe('NetworkHandler', () => {
  let spy;
  const dispatch = jest.fn();

  it('renders with all props', () => {
    expect(renderer.create(<NetworkHandler dispatch={jest.fn()} />)).toMatchSnapshot();
  });

  it('renders with minimum required props', () => {
    expect(renderer.create(<NetworkHandler dispatch={jest.fn()} />)).toMatchSnapshot();
  });

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

  it('updates the store with connection info when WIFI connection', () => {
    const component = renderer.create(<NetworkHandler dispatch={dispatch} />);
    const instance = component.getInstance();
    const connectionInfo = {
      type: 'wifi',
      effectiveType: '4g',
    };

    instance.handleConnectionChange(connectionInfo);
    expect(dispatch).toMatchSnapshot();
  });

  it('updates the store with connection info and goes online when WIFI connection', () => {
    spy = jest.spyOn(NetworkHandler.prototype, 'enableNetwork');
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

  it('updates the store with connection info and goes offline when no connection', () => {
    spy = jest.spyOn(NetworkHandler.prototype, 'disableNetwork');
    const component = renderer.create(<NetworkHandler dispatch={dispatch} />);
    const instance = component.getInstance();
    const connectionInfo = {
      type: 'none',
    };

    instance.handleConnectionChange(connectionInfo);
    expect(spy).toHaveBeenCalled();
    expect(dispatch).toMatchSnapshot();
  });

  it('updates the store with connection info and goes offline when 2g connection', () => {
    spy = jest.spyOn(NetworkHandler.prototype, 'disableNetwork');
    const component = renderer.create(<NetworkHandler dispatch={dispatch} />);
    const instance = component.getInstance();
    const connectionInfo = {
      type: 'cellular',
      effectiveType: '2g',
    };

    instance.handleConnectionChange(connectionInfo);
    expect(spy).toHaveBeenCalled();
    expect(dispatch).toMatchSnapshot();
  });

  afterEach(() => {
    if (spy) {
      spy.mockClear();
    }
  });
});
