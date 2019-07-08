import { StyleSheet } from 'react-native';

import { dimensions } from '../../../static/styleConstants';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: dimensions.spacing.vertical,
    paddingHorizontal: dimensions.spacing.horizontal,
  },
});

export default styles;
