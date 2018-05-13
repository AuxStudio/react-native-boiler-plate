# React-native boiler-plate

A react-native, redux, redux-saga and firebase project.

* [Style guide](./STYLE_GUIDE.md)
* [Setup guide](./SETUP_GUIDE.md)
* [VSCode snippets](./snippets.json) for sagas, dumb, functional and container components (makes life _waaay_ easier)
* [Troubleshooting](./TROUBLESHOOTING.md)

Feel free to [get in touch](mailto:shaun@aux.co.za) if you have questions or suggestions :)

# TODOS

* Work on a method of handling action's nextAction payloads (ie. one batch action with a bunch of sequential actions that depend on payloads returned by the previous action)
* Style the troubleshooting guide
* Add Firebase CLI setup
* Add TOC to SETUP_GUIDE and STYLE_GUIDE
* Add a CHANGELOG with version control
* Add troubleshooting doc
* Add terminology doc eg. ref (!node)
* Add push notifications setup
* Fastlane integration
* CodePush integration
* Testing
* Continuous integration

# NICE TO HAVES

* LocationHandler permissions handling could be more robust?
* System messages management (array of messages displayed sequentially)
* FileSystem sagas and services (moveFile, deleteFile etc)
* Phone authentication
* Password reset in-app (fully fledged)
* Write script to generate project in one go (saves up to 3 hrs)
