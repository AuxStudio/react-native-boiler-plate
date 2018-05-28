# React-native boiler-plate

A react-native, redux, redux-saga and firebase project.

* [Style guide](./docs/STYLE_GUIDE.md)
* [Setup guide](./docs/SETUP_GUIDE.md)
* [VSCode snippets](./snippets.json) for sagas, stylesheet, component index, dumb, functional and container components (makes life _waaay_ easier)
* [Troubleshooting](./docs/TROUBLESHOOTING.md)

Feel free to [get in touch](mailto:shaun@aux.co.za) if you have questions or suggestions :)

# TODOS

* Setup project to handle multiple Firebase apps (development and production). Remove config.environment and associated code.

* Fastlane
  -- Screenshots
* CodePush integration
* Testing (unit testing, component testing, E2E)
* Continuous integration

## FUTURE

* Consider react-native-navigation (apparently a performance improvement since it's native).
  -- Not very stable. Waiting for V2.
* Consider reselect selector library.
* Write generator script to generate project in one go (could save up to 3 hrs).

## ENHANCEMENTS

* FileSystem sagas and services (moveFile, deleteFile etc)
* Phone authentication
* Password reset in-app (fully fledged)

# DEPLOYMENT

To deploy to the stores, use:

```shell
cd android
fastlane beta
```

and

```shell
cd ios
fastlane beta
```
