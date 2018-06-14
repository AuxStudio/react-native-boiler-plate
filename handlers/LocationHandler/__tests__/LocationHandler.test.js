import React from 'react';
import renderer from 'react-test-renderer';

import { LocationHandler } from '../';

it('renders a LocationHandler', () => {
  expect(renderer.create(<LocationHandler dispatch={jest.fn()} />)).toMatchSnapshot();
});
