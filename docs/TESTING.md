# Process

## Unit testing

We use [Jest](https://facebook.github.io/jest/) for unit testing.

### Conventions

- All test files should end in `.test.js`, e.g. `Example.test.js`.
- All test files should be located in the `__tests__` folder within the component folder as per the [style guide](./STYLE_GUIDE.md#directory-structure).
- When writing tests for components, be sure to test all the props as well as testing that the component works when no required props are passed in.
- If the component you are testing has class methods, test those (especially if it involves updating state).
