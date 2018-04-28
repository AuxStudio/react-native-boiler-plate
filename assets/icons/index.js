import createIconSet from 'react-native-vector-icons/lib/create-icon-set';

const glyphMap = {
  google: 59651,
  facebook: 59659,
};

const Icon = createIconSet(glyphMap, 'AppIcons', 'AppIcons.ttf');

export default Icon;
