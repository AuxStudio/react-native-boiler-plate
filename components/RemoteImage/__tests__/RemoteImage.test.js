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
/* eslint-enable */
