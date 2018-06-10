/* eslint-disable import/first */
import React from 'react';
import renderer from 'react-test-renderer';

import Menu from '../Menu';

const OPTIONS = [
  {
    text: 'Test',
  },
  {
    text: 'Disabled',
    disabled: true,
  },
];

/*
 TODO

  Find a way to test showMenu, selectOption and hideMenu
*/
it('renders a Menu', () => {
  expect(
    renderer.create(
      <Menu
        options={OPTIONS}
        handlePress={jest.fn()}
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

it('renders a Menu and sets the menu ref', () => {
  const component = renderer.create(
    <Menu
      options={OPTIONS}
      handlePress={jest.fn()}
      itemTextStyle={{ color: 'red' }}
      itemContainerStyle={{ backgroundColor: 'blue' }}
      containerStyle={{ backgroundColor: 'green' }}
    />,
  );
  const instance = component.getInstance();

  instance.setMenuRef('test');
  expect(instance.menu).toBe('test');
});
/* eslint-enable */
