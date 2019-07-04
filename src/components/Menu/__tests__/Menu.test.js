import React from 'react';
import renderer from 'react-test-renderer';

import Menu from '..';

describe('Menu', () => {
  const spies = [];
  const handlePress = jest.fn();
  const options = [
    {
      text: 'Foo',
    },
    {
      text: 'Bar',
    },
  ];
  const ref = 'meh';

  describe('renders', () => {
    it('renders with minimum required props', () => {
      const component = renderer.create(<Menu options={options} />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('methods', () => {
    it('should handle setMenuRef', () => {
      const component = renderer.create(<Menu options={options} />);
      const instance = component.getInstance();

      instance.setMenuRef(ref);

      expect(instance.menu).toEqual(ref);
    });

    it('should handle onShowMenu', () => {
      const component = renderer.create(<Menu options={options} />);
      const instance = component.getInstance();

      instance.onShowMenu();
    });

    describe('should handle onSelectOption', () => {
      it('when handlePress is provided', () => {
        spies[0] = jest.spyOn(Menu.prototype, 'hideMenu');
        const component = renderer.create(<Menu options={options} handlePress={handlePress} />);
        const instance = component.getInstance();
        const selectedOption = options[0];

        instance.onSelectOption(selectedOption);

        expect(spies[0]).toHaveBeenCalled();
        expect(handlePress).toHaveBeenCalledWith(selectedOption);
      });

      it('when handlePress is not provided', () => {
        spies[0] = jest.spyOn(Menu.prototype, 'hideMenu');
        const component = renderer.create(<Menu options={options} />);
        const instance = component.getInstance();

        instance.onSelectOption(options[0]);

        expect(spies[0]).toHaveBeenCalled();
      });
    });

    it('should handle hideMenu', () => {
      const component = renderer.create(<Menu options={options} />);
      const instance = component.getInstance();

      instance.hideMenu();
    });
  });

  describe('actions', () => {
    it('should call onShowMenu on MenuButton press', () => {
      spies[0] = jest.spyOn(Menu.prototype, 'onShowMenu');
      const buttonTestID = 'menu.button';
      const component = renderer.create(<Menu options={options} buttonTestID={buttonTestID} />);
      const { root } = component;
      const targetComponent = root.findByProps({ testID: buttonTestID });

      targetComponent.props.handlePress();

      expect(spies[0]).toHaveBeenCalled();
    });

    it('should call onSelectOption on MenuItem button press', () => {
      // NOTE: Unable to test this because of animation
      // FIXME: Find workaround for animation
    });
  });

  afterEach(() => {
    spies.forEach((spy) => {
      if (spy) {
        spy.mockClear();
      }
    });
    handlePress.mockClear();
  });
});
