import { StyleSheet } from 'react-native';

import { colors, fonts } from '../../static/styleConstants';

const styles = StyleSheet.create({
  container: {},
  image: {},
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.dividerColor,
  },
  icon: {
    fontSize: fonts.sizes.icon,
    color: colors.primaryText,
  },
});

export default styles;
