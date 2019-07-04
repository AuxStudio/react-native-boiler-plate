import React from 'react';
import renderer from 'react-test-renderer';

import PageLoader from '..';

describe('PageLoader', () => {
  describe('renders', () => {
    it('renders', () => {
      const component = renderer.create(<PageLoader />);

      expect(component).toMatchSnapshot();
    });
  });
});
