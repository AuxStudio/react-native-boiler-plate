import React from 'react';
import renderer from 'react-test-renderer';
import { View } from 'react-native';

import Menu from '..';

const OPTIONS = [
  {
    text: 'Test',
  },
  {
    text: 'Disabled',
    disabled: true,
  },
];

describe('Menu', () => {
  let spy;

  it('renders with all props', () => {
    expect(
      renderer.create(
        <Menu
          options={OPTIONS}
          handlePress={jest.fn()}
          iconName="chevron-left"
          iconStyle={{ color: 'red' }}
          iconContainerStyle={{ backgroundColor: 'blue' }}
          itemTextStyle={{ color: 'red' }}
          itemContainerStyle={{ backgroundColor: 'blue' }}
          containerStyle={{ backgroundColor: 'green' }}
        />,
      ),
    ).toMatchSnapshot();
  });

  it('renders a Menu with minimum required props', () => {
    expect(renderer.create(<Menu options={OPTIONS} handlePress={jest.fn()} />)).toMatchSnapshot();
  });

  it('calls setMenuRef on componentDidMount', () => {
    spy = jest.spyOn(Menu.prototype, 'setMenuRef');

    renderer.create(
      <Menu
        options={OPTIONS}
        handlePress={jest.fn()}
        itemTextStyle={{ color: 'red' }}
        itemContainerStyle={{ backgroundColor: 'blue' }}
        containerStyle={{ backgroundColor: 'green' }}
      />,
    );
    expect(spy).toHaveBeenCalled();
  });

  afterEach(() => {
    if (spy) {
      spy.mockClear();
    }
  });
});
