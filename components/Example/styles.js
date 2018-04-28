import { StyleSheet } from 'react-native';

import styleConstants from '../../styleConstants';

const styles = StyleSheet.create({
  container: {
    padding: styleConstants.dimensions.padding.small,
  },
  titleText: {
    ...styleConstants.fonts.title,
    color: styleConstants.colors.primaryText,
  },
});

export default styles;
