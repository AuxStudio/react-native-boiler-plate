import { Dimensions, Platform } from "react-native";

const styleConstants = {};

/* FONT FAMILIES */

// styleConstants.primaryFont = {
//     fontFamily: "Montserrat-Regular",
// };
// styleConstants.secondaryFont = {
//     fontFamily: "Lora-Regular",
// };

/* FONT SIZES */

styleConstants.largeFont = 32;
styleConstants.regularFont = 18;
styleConstants.smallFont = 16;
styleConstants.verySmallFont = 12;
styleConstants.iconFont = 24;

/* COLOURS */

styleConstants.primary = "#3D84A8";
styleConstants.lightPrimary = "#46CDCF";
styleConstants.darkPrimary = "#48466D";
styleConstants.secondary = "#88304E";
styleConstants.lightSecondary = "#E23E57";
styleConstants.darkSecondary = "#522546";
styleConstants.white = "#FFFFFF";
styleConstants.transWhite = "rgba(255, 255, 255, 0.70)";
styleConstants.transBlack = "rgba(0, 0, 0, 0.70)";
styleConstants.primaryText = "#212121";
styleConstants.secondaryText = "#757575";
styleConstants.dividerColor = "#E0E0E0";
styleConstants.success = "#4caf50";
styleConstants.danger = "#d32f2f";

/* DIMENSIONS */

const { width, height } = Dimensions.get("window");

styleConstants.windowWidth = width;
styleConstants.windowHeight = height;

/* SHADOWS */

// Elevation does not work on Android V4 so we add a border as a fallback
const isEarlyAndroid = Platform.OS === "Android" && Platform.Version <= 19;

styleConstants.smallShadow = {
    elevation: 2,
    borderWidth: isEarlyAndroid ? 1 : 0,
    borderColor: isEarlyAndroid ? styleConstants.veryLightGrey : null,

    // iOS
    shadowColor: styleConstants.black,
    shadowOpacity: 0.17,
    shadowRadius: 2,
    shadowOffset: {
        height: 1,
        width: 0,
    },
};

styleConstants.regularShadow = {
    elevation: 6,
    borderWidth: isEarlyAndroid ? 1 : 0,
    borderColor: isEarlyAndroid ? styleConstants.veryLightGrey : null,

    // iOS
    shadowColor: styleConstants.black,
    shadowOpacity: 0.33,
    shadowRadius: 2,
    shadowOffset: {
        height: 1,
        width: 0,
    },
};

styleConstants.largeShadow = {
    elevation: 12,
    borderWidth: isEarlyAndroid ? 1 : 0,
    borderColor: isEarlyAndroid ? styleConstants.veryLightGrey : null,

    // iOS
    shadowColor: styleConstants.black,
    shadowOpacity: 0.33,
    shadowRadius: 4,
    shadowOffset: {
        height: 2,
        width: 0,
    },
};

export default styleConstants;
