/* eslint-disable import/first */
import React from 'react';
import renderer from 'react-test-renderer';

import RemoteImage from '../RemoteImage';

const IMAGE_SOURCE = 'https://d3iw72m71ie81c.cloudfront.net/male-47.jpg';

it('renders a RemoteImage', () => {
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

it('renders a RemoteImage with minimum required props', () => {
  expect(renderer.create(<RemoteImage />)).toMatchSnapshot();
});

it('renders a RemoteImage and toggles loading', () => {
  const component = renderer.create(<RemoteImage source={{ uri: IMAGE_SOURCE }} />);
  const instance = component.getInstance();

  instance.setLoading(false);
  expect(instance.state.isLoading).toBe(false);
});

it('renders a RemoteImage with error', () => {
  const component = renderer.create(<RemoteImage source={{ uri: IMAGE_SOURCE }} />);
  const { root } = component;
  const instance = component.getInstance();

  instance.setError();
  expect(instance.state.hasError).toBe(true);
  expect(instance.state.isLoading).toBe(false);

  // Should now see icon
  const icon = root.findByProps({ testID: 'icon' });
  expect(icon).toBeDefined();
  expect(icon.props.name).toBe('error-outline');
});
/* eslint-enable */
