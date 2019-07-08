import { StyleSheet, Platform } from 'react-native';

import { colors } from '../../static/styleConstants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: colors.white,
    paddingTop: Platform.OS === 'ios' ? 22 : 0,
  },
});

export default styles;
