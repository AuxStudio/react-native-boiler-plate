import { StyleSheet } from 'react-native';

import { colors, dimensions, fonts } from '../../static/styleConstants';

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.transBlack,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignSelf: 'center',
    backgroundColor: colors.white,
    paddingVertical: dimensions.spacing.vertical,
    paddingHorizontal: dimensions.spacing.horizontal,
    borderRadius: dimensions.borderRadius,
  },
  iconContainer: {
    position: 'absolute',
    top: dimensions.spacing.vertical * 2,
    right: dimensions.spacing.horizontal,
  },
  icon: {
    fontSize: fonts.sizes.icon,
    color: colors.white,
  },
});

export default styles;
