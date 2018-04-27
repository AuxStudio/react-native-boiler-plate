import colors from './colors';

const fonts = {};

// Font families
fonts.primaryFontFamily = {
  fontFamily: 'Arial', // TODO: test that this works as default font
};
fonts.secondaryFontFamily = {
  fontFamily: 'Arial', // TODO: test that this works as default font
};

// Font sizes
fonts.largeFont = 24;
fonts.regularFont = 17;
fonts.smallFont = 15;
fonts.verySmallFont = 11;
fonts.iconFont = 24;

// Font types
fonts.title = {
  fontWeight: 'bold',
  color: colors.primaryText,
  fontFamily: fonts.primaryFontFamily,
  fontSize: fonts.largeFont,
};

export default fonts;
