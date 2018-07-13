import React from 'react';
import renderer from 'react-test-renderer';
import { View } from 'react-native';

import Lightbox from '..';

jest.mock('react-native-simple-animators', () => 'Animator');

// Fixes _bezier is not a function bug
jest.useFakeTimers();

describe('Lightbox', () => {
  it('renders with all props', () => {
    const component = renderer.create(
      <Lightbox>
        <View />
      </Lightbox>,
    );

    expect(component).toMatchSnapshot();
  });

  it('renders with minimum required props', () => {
    const component = renderer.create(<Lightbox />);

    expect(component).toMatchSnapshot();
  });

  it('should handle animateOut', () => {
    const component = renderer.create(<Lightbox />);
    const instance = component.getInstance();

    instance.animateOut();

    expect(instance.state.shouldAnimateOut).toBe(true);
  });

  it('should handle onBack', () => {
    const component = renderer.create(<Lightbox />);
    const instance = component.getInstance();

    instance.onBack();
  });
});
