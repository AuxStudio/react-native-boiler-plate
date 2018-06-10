import React from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes, Text } from 'react-native';
import Menu, { MenuItem } from 'react-native-material-menu';
import { Touchable } from 'react-native-simple-components';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

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

  state = {};

  setMenuRef = (ref) => {
    this.menu = ref;
  };

  menu = null;

  showMenu = () => {
    this.menu.show();
  };

  selectOption = (option) => {
    if (this.props.handlePress) {
      this.props.handlePress(option);
    }
    this.hideMenu();
  };

  hideMenu = () => {
    this.menu.hide();
  };

  render() {
    const menuButtonComponent = (
      <Touchable onPress={this.showMenu} style={styles.menuButton}>
        <Icon name="menu" style={styles.menuButtonIcon} />
      </Touchable>
    );

    return (
      <Menu
        ref={this.setMenuRef}
        button={menuButtonComponent}
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
