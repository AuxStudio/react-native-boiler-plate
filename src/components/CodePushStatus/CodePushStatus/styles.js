import { StyleSheet } from 'react-native';

import { colors, dimensions, fonts } from '../../../static/styleConstants';

const ICON_SIZE = 20;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: dimensions.spacing.vertical / 2,
    paddingHorizontal: dimensions.spacing.horizontal / 2,
    borderRadius: dimensions.borderRadius,
  },
  text: {
    flex: 1,
    textAlign: 'center',
    ...fonts.types.small,
  },
  loader: {
    marginRight: dimensions.spacing.horizontal / 2,
  },
  icon: {
    fontSize: ICON_SIZE,
    color: colors.success,
    marginRight: dimensions.spacing.horizontal / 2,
  },
  warningIcon: {
    fontSize: ICON_SIZE,
    color: colors.danger,
    marginRight: dimensions.spacing.horizontal / 2,
  },
});

export default styles;
