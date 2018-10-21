# Style guide

## Table of contents

1.  [Code linting](#code-linting)
2.  [Directory structure](#directory-structure)
3.  [Redux actions](#redux-actions)
4.  [Typical class structure](#typical-class-structure)
5.  [Terminology](#terminology)
6.  [Tips](#tips)
    1.  [Files](#files)
    2.  [Components](#components)
    3.  [Handlers](#handlers)
    4.  [Services and sagas](#services-and-sagas)
    5.  [Firebase](#firebase)
    6.  [Lists](#lists)
    7.  [Images](#images)
    8.  [Performance](#performance)

This guide extends:

- [AirBNB Javascript style guide](https://github.com/airbnb/javascript)
- [Idiomatic Javascript style guide](https://github.com/rwaldron/idiomatic.js/)
- [AirBNB React JSX guide](https://github.com/airbnb/javascript/tree/master/react)

Readability is very important. Code should appear like it has been written by one person and conform to the most popular industry standards to allow for easier integration and onboarding of new team members.

This is a working guide and is not set in stone. If you have any suggestions/improvements, let’s [hear them](mailto:shaun@aux.co.za).

## Code linting

To enforce consistency, we use Prettier and ESLint. Each project should contain our generic config files for these tools which otherwise can be found [here](./.prettierrc) and [here](./.eslintrc.json). Copy these to your root folder.

To set these tools up with VSCode:

- Prettier (easy, install the VSCode extension and enable formatOnSave in userSettings)
- [ESLint](https://github.com/airbnb/javascript/issues/1589#issuecomment-344097023)

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
			__tests__
				Example.test.js
			ExampleDependentComponent
				__tests__
					ExampleDependentComponent.test.js
				index.js
			index.js
			styles.js
	config
	containers
	e2e
		...
		Example.spec.js
	handlers
		AuthHandler
			__tests__
			index.js
	reducers
		appData
			__tests__
			index.js
			initialState.js
		index.js
	sagas
		analytics
			logEvent
				__tests__
				index.js
		index.js
	scenes
		pages
			Home
				__tests__
				index.js
		modals
	services
		analytics
			logEvent
				__tests__
				index.js
		index.js
	store
	styleConstants
		index.js
		dimensions
			index.js
	utils
		app
			createError
				__tests__
				indexjs
	App.js
	Router.js
```

## Redux actions

We use the [Flux Standard Action](https://github.com/redux-utilities/flux-standard-action) as a standard for our redux actions.

To dispatch actions on sagas, we use a slightly different approach. By attaching the nextAction(s) on the meta prop of each action, we can completely customise and chain our actions on the fly, without having to write more implicit sagas, i.e:

```js
this.props.dispatch({
	type: 'getAuth',
	meta: {
		nextAction: {
			type: 'SIGN_IN_USER',
			payload: {
				...
			},
			meta: {
				nextAction: {
					type: 'SET_SYSTEM_MESSAGE',
					payload: {
						message: 'Sign in successful'
					}
				}
			}
		}
	}
})
```

## Importing

We follow the following order wrt importing modules:

1. External files
2. Global files
3. Local files
4. Components

```js
import { View } from 'react-native';
...

import utils from '../../utils';
...

import styles from './styles';
...

import CodePushStatus from '../../components/CodePushStatus';
...
```

## Typical class structure

We follow the typical order set out in eslint react/sort-comp except that the constructor should be placed at the top of the class. This serves as self-documentation.

```js
export default class ExampleClass extends React.Component {
	constructor(props) {
		// custom method bindings

		// values available to the class, e.g. this.ref

		this.state = {}
	}

	static get propTypes() {
		...
	}

	static defaultProps = {
		...
	}

	// life cycle methods

	// custom methods

	render() {
		...
	}
}
```

## Terminology

Some common terminology that we use.

- Ref - refers to a reference in a database
- Handler - refers to a container component that handles a part of the app's logic, e.g. AuthHandler dispatches the getAuth action.

## Save hair, read these tips:

### Files

- All imports at the top of the file with external imports listed first, then internal (utils, config, styles, styleConstants, components).

### Components

- Wherever possible, use stateless, functional components, e.g. function(props) { return ( <View /> )}.
- If you find yourself rewriting UI code more than once, it should be a component.
- Do not name your components after part of the state they connect to or the role they play, e.g. GuestProfilePhoto (a circular image) should be called CircularImage to maximise code reuse.
- The same goes for props, e.g. userImage prop should be named imageSourceURL.
- Components should only be given the props that they need. Object destructuring is handy for this, e.g. function ({ imagePhotoURL }) { return ( <CircularImage imagePhotoURL={imagePhotoURL} )}
- Presentational components should not contain any business logic.
- Presentational components should be wired up to Storybook.
- Components should be able to manage state internally where possible to allow for testing in Storybook and unit testing.
- Parent components should control a child's layout, i.e. margin should come from a parent component.

### Handlers

- These are React container components that purely handle logic and either do not render anything or they render children only.

### Services and sagas

- Every service should have a saga.
- If you're going to couple sagas (see ./sagas/auth/linkUserWithCredential), that's okay, but make sure the individual sagas are available individually (ie. linkUserWithCredential and signInAnonymously are in separate files).
- Sagas should not implicitly yield (put) an action. Use the nextAction convention (see all sagas). This allows for much better customisablility when calling sagas.

### Firebase

- Avoid manipulating the Firebase database via the console. It's much safer (and faster) to use the cli.
- Do not use arrays in Firebase. Use objects indexed by IDs.

### Lists

- When you need to iterate through lists of data, create static IDs before hand.

### Images

- Store images in the XCode asset catalog and android/app/src/main/res/drawable folder and require them with { uri: IMAGE_NAME }. This greatly improves image performance.
- For remote images, use the RemoteImage component. This will handle image caching and improve image performance.
- Optimise/compress images and use JPEG where possible.

### Performance

- Use a launch screen (it improves perceived loading time)
- Track renders in each component you create (they should make sense)
- Track state and prop changes in componentWillUpdate and lodash difference
- Measure and minimise overdraw (number of times pixels have been redrawn) (android only - developer options - debug GPU overdraw)
- Track performance results in a spreadsheet
