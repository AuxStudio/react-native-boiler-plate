import { StyleSheet } from 'react-native';

import styleConstants from '../../../styleConstants';

const ICON_SIZE = 20;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: styleConstants.colors.white,
    paddingVertical: styleConstants.dimensions.spacing.vertical / 2,
    paddingHorizontal: styleConstants.dimensions.spacing.horizontal / 2,
    borderRadius: styleConstants.dimensions.borderRadius,
  },
  text: {
    flex: 1,
    textAlign: 'center',
    ...styleConstants.fonts.types.small,
  },
  loader: {
    marginRight: styleConstants.dimensions.spacing.horizontal / 2,
  },
  icon: {
    fontSize: ICON_SIZE,
    color: styleConstants.colors.success,
    marginRight: styleConstants.dimensions.spacing.horizontal / 2,
  },
  warningIcon: {
    fontSize: ICON_SIZE,
    color: styleConstants.colors.danger,
    marginRight: styleConstants.dimensions.spacing.horizontal / 2,
  },
});

export default styles;
