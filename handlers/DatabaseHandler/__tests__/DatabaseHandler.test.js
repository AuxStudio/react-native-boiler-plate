import React from 'react';
import renderer from 'react-test-renderer';

import { DatabaseHandler } from '../';

it('renders a DatabaseHandler', () => {
  expect(renderer.create(<DatabaseHandler dispatch={jest.fn()} authenticated />)).toMatchSnapshot();
});

it('renders a DatabaseHandler with minimum required props', () => {
  expect(renderer.create(<DatabaseHandler dispatch={jest.fn()} />)).toMatchSnapshot();
});
