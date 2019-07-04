import { StyleSheet } from 'react-native';

import styleConstants from '../../static/styleConstants';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: styleConstants.dimensions.spacing.vertical,
    paddingHorizontal: styleConstants.dimensions.spacing.horizontal,
  },
});

export default styles;
