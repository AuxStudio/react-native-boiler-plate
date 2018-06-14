import React from 'react';
import renderer from 'react-test-renderer';

import { AuthHandler } from '../';

it('renders a AuthHandler', () => {
  expect(renderer.create(<AuthHandler dispatch={jest.fn()} />)).toMatchSnapshot();
});
