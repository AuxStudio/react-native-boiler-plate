import { Dimensions, Platform } from "react-native";

const styleConstants = {};

/* FONT SIZES */

styleConstants.largeFont = 32;
styleConstants.regularFont = 18;
styleConstants.smallFont = 16;
styleConstants.verySmallFont = 12;
styleConstants.iconFont = 24;

/* COLOURS */

styleConstants.primary = "#0094d4";
styleConstants.lightTransPrimary = "rgba(0, 148, 212, 0.50)";
styleConstants.darkTransPrimary = "rgba(0, 148, 212, 0.75)";
styleConstants.secondary = "#f8a900";
styleConstants.lightTransSecondary = "rgba(248, 167, 0, 0.50)";
styleConstants.darkTransSecondary = "rgba(248, 167, 0, 0.75)";
styleConstants.grey = "#808092";
styleConstants.lightGrey = "#b0b3cf";
styleConstants.veryLightGrey = "#EAEAEA";
styleConstants.white = "#ffffff";
styleConstants.lightTransparent = "rgba(0, 0, 0, 0.33)";
styleConstants.mediumTransparent = "rgba(0, 0, 0, 0.50)";
styleConstants.darkTransparent = "rgba(0, 0, 0, 0.67)";
styleConstants.black = "#000000";
styleConstants.danger = "#d32f2f";
styleConstants.success = "#69b532";

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
