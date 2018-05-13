# Style guide

This guide extends:

* [AirBNB Javascript style guide](https://github.com/airbnb/javascript)
* [Idiomatic Javascript style guide](https://github.com/rwaldron/idiomatic.js/)
* [AirBNB React JSX guide](https://github.com/airbnb/javascript/tree/master/react)

Readability is very important. Code should appear like it has been written by one person and conform to the most popular industry standards to allow for easier integration and onboarding of new team members.

This is a working guide and is not set in stone. If you have any suggestions/improvements, let’s [hear them](mailto:shaun@aux.co.za).

## Code linting

To enforce consistency, we use Prettier and ESLint. Each project should contain our generic config files for these tools which otherwise can be found [here](./.prettierrc) and [here](./.eslintrc.json). Copy these to your root folder.

To set these tools up with VSCode:

* Prettier (easy, install the VSCode extension and enable formatOnSave in userSettings)
* [ESLint](https://github.com/airbnb/javascript/issues/1589#issuecomment-344097023)

## Directory structure:

```
src
	assets
	fonts
	images
	icons
		index.js
	components
		Example
			Example.js	// presentational component
			ExampleContainer.js	// business logic (optional)
			index.js	// import and export
			styles.js
	config
	containers
	scenes
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
	App.js
```

## Redux actions

We use the [Flux Standard Action](https://github.com/redux-utilities/flux-standard-action) as a standard for our redux actions.

## Save hair, read these tips:

### Files

* All imports at the top of the file with external imports listed first, then internal (utils, config, styles, styleConstants, components).

### Components

* Wherever possible, use stateless, functional components, e.g. function(props) { return ( <View /> )}.
* If you find yourself rewriting UI code more than once, it should be a component.
* Do not name your components after part of the state they connect to or the role they play, e.g. GuestProfilePhoto (a circular image) should be called CircularImage to maximise code reuse.
* The same goes for props, e.g. userImage prop should be named imageSourceURL.
* Components should only be given the props that they need. Object destructuring is handy for this, e.g. function ({ imagePhotoURL }) { return ( <CircularImage imagePhotoURL={imagePhotoURL} )}
* Presentational components should not contain any business logic.
* Presentational components should be wired up to Storybook (TODO).
* Components should be able to manage state internally where possible to allow for testing in Storybook and unit testing.

### Containers

* These are React components that purely handle logic and either do not render anything or they render children only.

### Services and sagas

* Every service should have a saga.
* If you're going to couple sagas (see ./sagas/auth/linkUserWithCredential), that's okay, but make sure the individual sagas are available individually (ie. linkUserWithCredential and signInAnonymously are in separate files).
* Sagas should not implicitly yield (put) an action. Use the nextAction convention (see all sagas). This allows for much better customisablility when calling sagas.

### Firebase

* Do not use arrays in Firebase. Use objects indexed by IDs.

### Lists

* When you need to iterate through lists of data, create static IDs before hand.
