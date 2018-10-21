import { StyleSheet, Platform } from 'react-native';

import styleConstants from '../../styleConstants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: styleConstants.colors.white,
    paddingTop: Platform.OS === 'ios' ? 22 : 0,
  },
});

export default styles;
