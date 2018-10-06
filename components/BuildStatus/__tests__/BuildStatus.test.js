import React from 'react';
import renderer from 'react-test-renderer';

import BuildStatus from '..';

describe('BuildStatus', () => {
  describe('renders', () => {
    it('renders with minimum required props', () => {
      const component = renderer.create(<BuildStatus />);

      expect(component).toMatchSnapshot();
    });
  });
});
