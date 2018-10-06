import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes, Text, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import styleConstants from '../../styleConstants';

export default class RemoteImage extends React.Component {
  constructor(props) {
    super(props);

    this.setHasError = this.setHasError.bind(this);
    this.setIsLoading = this.setIsLoading.bind(this);

    this.state = {
      isLoading: true,
      hasError: false,
    };
  }

  static propTypes = {
    source: PropTypes.shape({
      uri: PropTypes.string,
    }),
    borderRadius: PropTypes.number,
    iconStyle: Text.propTypes.style,
    style: ViewPropTypes.style,
    loaderColor: PropTypes.string,
  };

  static defaultProps = {
    loaderColor: styleConstants.colors.primaryText,
  };

  setHasError() {
    this.setState({
      hasError: true,
    });

    this.setIsLoading(false);
  }

  setIsLoading(isLoading) {
    this.setState({
      isLoading,
    });
  }

  render() {
    const { hasError, isLoading } = this.state;
    const { borderRadius, iconStyle, loaderColor, source, style } = this.props;
    const borderRadiusStyles = borderRadius && { borderRadius };
    let backgroundComponent;

    if (hasError) {
      backgroundComponent = (
        <View style={[styles.backgroundContainer, borderRadiusStyles]}>
          <Icon name="error-outline" style={[styles.icon, iconStyle]} />
        </View>
      );
    } else if (isLoading) {
      backgroundComponent = (
        <View style={[styles.backgroundContainer, borderRadiusStyles]}>
          <ActivityIndicator size="large" color={loaderColor} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FastImage
          source={source}
          style={[styles.image, borderRadiusStyles, style]}
          onLoadEnd={() => this.setIsLoading(false)}
          onError={this.setHasError}
        />
        {backgroundComponent}
      </View>
    );
  }
}
