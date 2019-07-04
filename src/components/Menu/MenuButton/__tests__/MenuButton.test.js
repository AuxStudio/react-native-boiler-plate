import React from 'react';
import renderer from 'react-test-renderer';

import MenuButton from '..';

describe('MenuButton', () => {
  it('renders with all props', () => {
    expect(
      renderer.create(
        <MenuButton
          iconName="chevron-left"
          iconStyle={{ color: 'red' }}
          iconContainerStyle={{ backgroundColor: 'blue' }}
          handlePress={jest.fn()}
        />,
      ),
    ).toMatchSnapshot();
  });

  it('renders with minimum required props', () => {
    expect(renderer.create(<MenuButton />)).toMatchSnapshot();
  });
});
