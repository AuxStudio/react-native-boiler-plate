/* eslint-disable import/first */
import React from 'react';
import renderer from 'react-test-renderer';
import { View } from 'react-native';

import Modal from '../Modal';

it('renders a Modal', () => {
  expect(
    renderer.create(
      <Modal isVisible handleClose={jest.fn()}>
        <View />
      </Modal>,
    ),
  ).toMatchSnapshot();
});

it('renders a Modal with minimum required props', () => {
  expect(
    renderer.create(
      <Modal>
        <View />
      </Modal>,
    ),
  ).toMatchSnapshot();
});
/* eslint-enable */
