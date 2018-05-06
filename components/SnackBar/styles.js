import { StyleSheet } from 'react-native';

import styleConstants from '../../styleConstants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: styleConstants.colors.transBlack,
    paddingVertical: styleConstants.dimensions.padding.small,
    paddingHorizontal: styleConstants.dimensions.padding.large,
  },
  text: {
    fontSize: styleConstants.fonts.sizes.small,
    color: styleConstants.colors.white,
  },
});

export default styles;
