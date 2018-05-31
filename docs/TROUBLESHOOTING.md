# Troubleshooting guide

This is a work in progress. The idea is to log solutions to common problems.

## uploadFile android failed with 'Unhandled Promise rejection...'

### Solution

Clear cache and data of Google Play Store and Google Play Services.

### Other notes

Occured after a Google Play Services update. Also noticed 'Google Play Services are updating' in all apps that used Google Maps.

## WTF, my text is super large on iOS

The user has enabled 'Large Accessibility Sizes' in their settings.

### Solution

Add `Text.defaultProps.allowFontScaling = false` to `./App.js` and be sure to import `Text`.
