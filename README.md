# React-native boiler-plate

A react-native, redux, redux-saga and firebase project.

* [Style guide](./STYLE_GUIDE.md)
* [Setup guide](./SETUP_GUIDE.md)
* [VSCode snippets](./snippets.json) for sagas, stylesheet, component index, dumb, functional and container components (makes life _waaay_ easier)
* [Troubleshooting](./TROUBLESHOOTING.md)

Feel free to [get in touch](mailto:shaun@aux.co.za) if you have questions or suggestions :)

# TODOS

* Add components for external deps
* SnackbarHandler
* Work on a method of handling action's nextAction payloads (ie. one batch action with a bunch of sequential actions that depend on payloads returned by the previous action)
* Style the troubleshooting guide
* Performance improvements:
  * Consider react-native-navigation
  * App state caching (for first opens)
  * Add a launch screen
  * Add notes to move images to app package (Xcode asset catalog and Android drawable folder)
  * Remote image caching (react-native-fast-image)
  * Optimise images and use JPEG where possible
  * Track unnecessary renders (renderCountProp from react-redux)
    -- react-native-slowlog
    -- Track state and prop changes in componentWillUpdate and lodash difference
  * Consider reselect selector library
  * Track performance results in a spreadsheet
  * Test reducers performance (redux-log-slow-reducers)
  * Measure and minimise overdraw (number of times pixels have been redrawn)
* Add Firebase CLI setup
* Add TOC to SETUP_GUIDE and STYLE_GUIDE
* Add version control (react-native-version)
* Add a CHANGELOG
* Add terminology doc eg. ref (!node)
* Add push notifications setup
* Fastlane integration
* CodePush integration
* Testing
* Continuous integration

# ENHANCEMENTS

* LocationHandler permissions handling could be more robust?
* System messages management (array of messages displayed sequentially)
* FileSystem sagas and services (moveFile, deleteFile etc)
* Phone authentication
* Password reset in-app (fully fledged)
* Write script to generate project in one go (saves up to 3 hrs)
