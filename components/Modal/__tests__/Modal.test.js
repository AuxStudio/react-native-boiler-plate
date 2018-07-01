import React from 'react';
import renderer from 'react-test-renderer';
import { View } from 'react-native';

import Modal from '..';

describe('Modal', () => {
  it('renders with all props', () => {
    expect(
      renderer.create(
        <Modal isVisible handleClose={jest.fn()}>
          <View />
        </Modal>,
      ),
    ).toMatchSnapshot();
  });

  it('renders with minimum required props', () => {
    expect(
      renderer.create(
        <Modal>
          <View />
        </Modal>,
      ),
    ).toMatchSnapshot();
  });
});
