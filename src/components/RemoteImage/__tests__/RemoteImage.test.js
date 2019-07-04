import React from 'react';
import renderer from 'react-test-renderer';

import RemoteImage from '..';

describe('RemoteImage', () => {
  const spies = [];
  const source = { uri: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png' };

  describe('renders', () => {
    it('renders with minimum required props', () => {
      const component = renderer.create(<RemoteImage />);

      expect(component).toMatchSnapshot();
    });

    it('renders the normal state', () => {
      const component = renderer.create(<RemoteImage source={source} />);

      expect(component).toMatchSnapshot();
    });

    it('renders the loading state', () => {});

    it('renders the error state', () => {});
  });

  describe('methods', () => {
    it('should handle setHasError', () => {
      const component = renderer.create(<RemoteImage />);
      const instance = component.getInstance();

      instance.setHasError(true);

      expect(instance.state.hasError).toEqual(true);
    });

    it('should handle setIsLoading', () => {
      const component = renderer.create(<RemoteImage />);
      const instance = component.getInstance();

      instance.setIsLoading(true);

      expect(instance.state.isLoading).toEqual(true);
    });
  });

  afterEach(() => {
    spies.forEach((spy) => {
      if (spy) {
        spy.mockClear();
      }
    });
  });
});
