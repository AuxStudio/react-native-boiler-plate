import React from 'react';
import renderer from 'react-test-renderer';

import RemoteImage from '..';

const IMAGE_SOURCE = 'https://d3iw72m71ie81c.cloudfront.net/male-47.jpg';

describe('RemoteImage', () => {
  it('renders with all props', () => {
    expect(
      renderer.create(
        <RemoteImage
          source={{ uri: IMAGE_SOURCE }}
          borderRadius={10}
          iconStyle={{ color: 'red' }}
          style={{ backgroundColor: 'blue' }}
          loaderColor="green"
        />,
      ),
    ).toMatchSnapshot();
  });

  it('renders with minimum required props', () => {
    expect(renderer.create(<RemoteImage />)).toMatchSnapshot();
  });

  it('renders and toggles loading', () => {
    const component = renderer.create(<RemoteImage source={{ uri: IMAGE_SOURCE }} />);
    const instance = component.getInstance();

    instance.setLoading(false);

    expect(instance.state.isLoading).toBe(false);
    expect(component).toMatchSnapshot();
  });

  it('renders with error', () => {
    const component = renderer.create(<RemoteImage source={{ uri: IMAGE_SOURCE }} />);
    const instance = component.getInstance();

    instance.setError();

    expect(instance.state.hasError).toBe(true);
    expect(instance.state.isLoading).toBe(false);
    expect(component).toMatchSnapshot();
  });
});
