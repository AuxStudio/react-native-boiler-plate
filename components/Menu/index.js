import React from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes, Text } from 'react-native';
import Menu, { MenuItem } from 'react-native-material-menu';

import styles from './styles';

import MenuButton from './MenuButton';

export default class MenuComponent extends React.Component {
  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
      }),
    ).isRequired,
    handlePress: PropTypes.func.isRequired,
    itemTextStyle: Text.propTypes.style,
    itemContainerStyle: ViewPropTypes.style,
    containerStyle: ViewPropTypes.style,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.setMenuRef = this.setMenuRef.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.selectOption = this.selectOption.bind(this);
    this.hideMenu = this.hideMenu.bind(this);

    this.menu = null;

    this.state = {};
  }

  setMenuRef(ref) {
    this.menu = ref;
  }

  showMenu() {
    this.menu.show();
  }

  selectOption(option) {
    if (this.props.handlePress) {
      this.props.handlePress(option);
    }
    this.hideMenu();
  }

  hideMenu() {
    this.menu.hide();
  }

  render() {
    return (
      <Menu
        ref={this.setMenuRef}
        button={<MenuButton handlePress={this.showMenu} />}
        style={[styles.container, this.props.containerStyle]}
      >
        {this.props.options &&
          this.props.options.map((option) => {
            return (
              <MenuItem
                key={option.text}
                onPress={() => this.selectOption(option.text)}
                disabled={option.disabled}
                textStyle={[styles.itemText, this.props.itemTextStyle]}
                style={[styles.itemContaier, this.props.itemContainerStyle]}
              >
                {option.text}
              </MenuItem>
            );
          })}
      </Menu>
    );
  }
}
