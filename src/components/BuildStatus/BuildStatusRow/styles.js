import { StyleSheet } from 'react-native';

import { fonts } from '../../../static/styleConstants';

const styles = StyleSheet.create({
  text: {
    ...fonts.types.small,
  },
  boldText: {
    ...fonts.families.medium,
  },
});

export default styles;
