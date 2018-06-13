# Process

## Unit testing

We use [Jest](https://facebook.github.io/jest/) and [react-test-renderer](https://reactjs.org/docs/test-renderer.html) for unit testing.

### Conventions

- All test files should end in `.test.js`, e.g. `Example.test.js`.
- All test files should be located in the `__tests__` folder within the component folder as per the [style guide](./STYLE_GUIDE.md#directory*structure).
- When writing tests for components, be sure to test all the props as well as testing that the component works when no required props are passed in.
- When writing tests for classes, test its methods and check that the state is updating. If any internal components are dependent on that state, test that they are doing what they should be doing.
- Don't bother writing tests for services, this introduces too much boilerplate and the code ends up being trivial. We can assume the standard libraries work.
- When writing tests for classes, list your snapshot tests at the top of the file and your instance/root tests at the bottom, ie.

```js
// Snapshot test
it('renders a SmartImage', () => {
  expect(
    renderer.create(
      <SmartImage
        source={IMAGE_SOURCE_LOCAL}
        iconStyle={{ color: 'red' }}
        style={{ backgroundColor: 'blue' }}
        loaderColor="green"
      />,
    ),
  ).toMatchSnapshot();
});

// Another snapshot test
it('renders a SmartImage with no props', () => {
  expect(renderer.create(<SmartImage />)).toMatchSnapshot();
});

// Instance and root test
it('renders a SmartImage with offline error', () => {
  const component = renderer.create(<SmartImage source={IMAGE_SOURCE_LOCAL} />);
  const { root } = component; // used to inspect the component tree, ie. finding components by testID
  const instance = component.getInstance(); // used to set and inspect props/state

  expect(component).toMatchSnapshot();

  // Set offline error
  instance.setError({
    nativeEvent: {
      error: 'The Internet connection appears to be offline.',
    },
  });
  expect(instance.state.hasError).toBe(true);
  expect(instance.state.isOffline).toBe(true);
  expect(instance.state.isLoading).toBe(false);

  // Should now see icon
  const icon = root.findByProps({ testID: 'icon' });
  expect(icon).toBeDefined();
  expect(icon.props.name).toBe('signal-cellular-off');
});
```

### Testing sagas

Don't be alarmed when looking at these tests, there are distinct patterns.

#### Patterns

- Testing the saga without a nextAction and without a response from the api
- Testing the saga without a nextAction and with a response from the api
- Testing the saga with a nextAction and without a response from the api
- Testing the saga with a nextAction and with a response from the api
- Testing the saga when an error is thrown from the api

#### Note

You will notice that we JSON.stringify the results in our expect functions. JSON.stringify is necessary here otherwise our mock function and real function comparison fail and we really don't care if they're not the same, we're just testing that the correct calls and puts happen.
