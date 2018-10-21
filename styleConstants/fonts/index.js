import colors from '../colors';

const fonts = {};

// Font families
fonts.families = {
  primary: {
    fontFamily: 'System',
  },
  medium: {
    fontFamily: 'System',
  },
  secondary: {
    fontFamily: 'System',
  },
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
    ...fonts.families.medium,
    fontSize: fonts.sizes.large,
    color: colors.primaryText,
  },
  heading: {
    ...fonts.families.medium,
    fontSize: fonts.sizes.regular,
    color: colors.primaryText,
  },
  paragraph: {
    ...fonts.families.primary,
    fontSize: fonts.sizes.regular,
    color: colors.primaryText,
  },
  small: {
    ...fonts.families.primary,
    fontSize: fonts.sizes.small,
    color: colors.primaryText,
  },
  extraSmall: {
    ...fonts.families.medium,
    fontSize: fonts.sizes.verySmall,
    color: colors.primaryText,
  },
};

export default fonts;
