import { StyleSheet } from 'react-native';

import styleConstants from '../../styleConstants';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: styleConstants.colors.transBlack,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignSelf: 'center',
    backgroundColor: styleConstants.colors.white,
    paddingVertical: styleConstants.dimensions.spacing.vertical,
    paddingHorizontal: styleConstants.dimensions.spacing.horizontal,
    borderRadius: styleConstants.dimensions.borderRadius,
  },
  iconContainer: {
    position: 'absolute',
    top: styleConstants.dimensions.spacing.vertical * 2,
    right: styleConstants.dimensions.spacing.horizontal,
  },
  icon: {
    fontSize: styleConstants.fonts.sizes.icon,
    color: styleConstants.colors.white,
  },
});

export default styles;
