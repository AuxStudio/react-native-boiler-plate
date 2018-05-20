import { StyleSheet } from 'react-native';

import styleConstants from '../../styleConstants';

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
    backgroundColor: styleConstants.colors.dividerColor,
  },
  icon: {
    fontSize: styleConstants.fonts.sizes.icon,
    color: styleConstants.colors.primaryText,
  },
});

export default styles;
