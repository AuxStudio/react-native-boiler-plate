# React-native style guide

This guide extends:

* [AirBNB Javascript style guide](https://github.com/airbnb/javascript)
* [Idiomatic Javascript style guide](https://github.com/rwaldron/idiomatic.js/)
* [AirBNB React JSX guide](https://github.com/airbnb/javascript/tree/master/react)

Readability is very important. Code should appear like it has been written by one person and conform to the most popular industry standards to allow for easier integration and onboarding of new team members.

This is a working guide and is not set in stone. If you have any suggestions/improvements, let’s [hear them](mailto:shaun@aux.co.za).

## Code linting

To enforce consistency, we use Prettier and ESLint. Each project should contain our generic config files for these tools which otherwise can be found [here](./.prettierrc) and [here](./.eslintrc.json).

## Directory structure:

```
src
	assets
		fonts
		images
		icons
			index.js
	components
		Button
			index.js
			styles.js
    config
	containers
		Home.js
    navigation
	reducers
		auth.js
	sagas
		index.js
		auth.js
	services
		auth
			index.js
    store
    styleConstants
		index.js
		dimensions.js
		colors.js
		fonts.js
	utils
		Index.js
	App.js
```

## Save hair, read these tips:

* Do not use arrays in Firebase. Use objects indexed by IDs.
* Wherever possible, use stateless, functional components, e.g. function(props) { return ( <Thing /> )}.
* If you find yourself rewriting UI code more than once, it should be a component.
* Do not name your components after part of the state they connect to or the role they play, e.g. GuestProfilePhoto (a circular image) should be called CircularImage to maximise code reuse.
* The same goes for props, e.g. userImage prop should be named imageSourceURL.
* Components should only be given the props that they need. Object destructuring is handy for this, e.g. function ({ imagePhotoURL }) { return ( <CircularImage imagePhotoURL={imagePhotoURL} )}
* Presentational components should not contain any business logic.
* Presentational components should be wired up to Storybook.
* Components should be able to manage state internally where possible to allow for testing in Storybook.
