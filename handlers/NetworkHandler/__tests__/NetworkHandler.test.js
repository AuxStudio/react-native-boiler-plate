import React from 'react';
import renderer from 'react-test-renderer';

import { NetworkHandler } from '../';

it('renders a NetworkHandler', () => {
  expect(
    renderer.create(<NetworkHandler dispatch={jest.fn()} realtimeDatabaseMode />),
  ).toMatchSnapshot();
});

it('renders a NetworkHandler with minimum required props', () => {
  expect(renderer.create(<NetworkHandler dispatch={jest.fn()} />)).toMatchSnapshot();
});
