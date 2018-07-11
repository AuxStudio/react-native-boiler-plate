import React from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes, Text } from 'react-native';
import Menu, { MenuItem } from 'react-native-material-menu';

import styles from './styles';

import MenuButton from './MenuButton';

export default class MenuComponent extends React.Component {
  constructor(props) {
    super(props);

    this.setMenuRef = this.setMenuRef.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.selectOption = this.selectOption.bind(this);
    this.hideMenu = this.hideMenu.bind(this);

    this.menu = null;

    this.state = {};
  }

  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
      }),
    ).isRequired,
    handlePress: PropTypes.func.isRequired,
    iconName: PropTypes.string,
    iconStyle: Text.propTypes.style,
    iconContainerStyle: ViewPropTypes.style,
    itemTextStyle: Text.propTypes.style,
    itemContainerStyle: ViewPropTypes.style,
    containerStyle: ViewPropTypes.style,

    buttonTestID: PropTypes.string,
  };

  static defaultProps = {};

  setMenuRef(ref) {
    this.menu = ref;
  }

  showMenu() {
    this.menu.show();
  }

  selectOption(option) {
    const { handlePress } = this.props;

    if (handlePress) {
      handlePress(option);
    }
    this.hideMenu();
  }

  hideMenu() {
    this.menu.hide();
  }

  render() {
    const {
      iconName,
      iconStyle,
      iconContainerStyle,
      containerStyle,
      options,
      itemTextStyle,
      itemContainerStyle,
      buttonTestID,
    } = this.props;

    return (
      <Menu
        ref={this.setMenuRef}
        button={
          <MenuButton
            handlePress={this.showMenu}
            iconName={iconName}
            iconStyle={iconStyle}
            style={iconContainerStyle}
            testID={buttonTestID}
          />
        }
        style={[styles.container, containerStyle]}
      >
        {options &&
          options.map((option) => {
            return (
              <MenuItem
                testID={`menu.item.${option.text}`}
                key={option.text}
                onPress={() => this.selectOption(option)}
                disabled={option.disabled}
                textStyle={[styles.itemText, itemTextStyle]}
                style={[styles.itemContaier, itemContainerStyle]}
              >
                {option.text}
              </MenuItem>
            );
          })}
      </Menu>
    );
  }
}
