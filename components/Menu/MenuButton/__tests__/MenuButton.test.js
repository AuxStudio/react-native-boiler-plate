/* eslint-disable import/first */
import React from 'react';
import renderer from 'react-test-renderer';

import MenuButton from '../';

it('renders a MenuButton', () => {
  expect(renderer.create(<MenuButton handlePress={jest.fn()} />)).toMatchSnapshot();
});

it('renders a MenuButton with minimum required props', () => {
  expect(renderer.create(<MenuButton />)).toMatchSnapshot();
});
/* eslint-enable */
