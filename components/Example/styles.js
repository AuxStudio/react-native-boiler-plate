import { StyleSheet } from 'react-native';

import styleConstants from '../../styleConstants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: styleConstants.dimensions.padding.small,
  },
  titleText: {
    ...styleConstants.fonts.types.title,
    color: styleConstants.colors.primaryText,
  },
});

export default styles;
