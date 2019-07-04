import { StyleSheet } from 'react-native';

import styleConstants from '../../../styleConstants';

const styles = StyleSheet.create({
  text: {
    ...styleConstants.fonts.types.small,
  },
  boldText: {
    ...styleConstants.fonts.families.medium,
  },
});

export default styles;
