import colors from './colors';

const fonts = {};

// Font families
fonts.families = {
  primary: 'Arial',
  secondary: 'Arial',
};

// Font sizes
fonts.sizes = {
  large: 24,
  regular: 17,
  small: 15,
  verySmall: 11,
  icon: 24,
};

// Font types
fonts.types = {
  title: {
    fontFamily: fonts.families.primary,
    fontSize: fonts.sizes.large,
    color: colors.primaryText,
  },
};

export default fonts;
