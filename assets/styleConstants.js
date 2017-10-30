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

styleConstants.primary = "#E91E63";
styleConstants.darkPrimary = "#C2185B";
styleConstants.lightPrimary = "#F8BBD0";
styleConstants.secondary = "#00BCD4";
styleConstants.darkSecondary = "#0097A7";
styleConstants.lightSecondary = "#00BCD4";
styleConstants.white = "#FFFFFF";
styleConstants.primaryText = "#212121";
styleConstants.secondaryText = "#757575";
styleConstants.dividerColor = "#BDBDBD";

/* DIMENSIONS */

const { width, height } = Dimensions.get("window");

styleConstants.windowWidth = width;
styleConstants.windowHeight = height;

/* SHADOWS */

// Elevation does not work on Android V4 so we add a border as a fallback
const isEarlyAndroidOrIOS =
    (Platform.OS === "Android" && Platform.Version <= 19) ||
    Platform.OS === "ios";

styleConstants.smallShadow = {
    elevation: 2,
    borderWidth: isEarlyAndroidOrIOS ? 1 : 0,
    borderColor: isEarlyAndroidOrIOS ? styleConstants.veryLightGrey : null,

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
    borderWidth: isEarlyAndroidOrIOS ? 1 : 0,
    borderColor: isEarlyAndroidOrIOS ? styleConstants.veryLightGrey : null,

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
    borderWidth: isEarlyAndroidOrIOS ? 1 : 0,
    borderColor: isEarlyAndroidOrIOS ? styleConstants.veryLightGrey : null,

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
