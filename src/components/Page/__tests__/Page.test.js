import React from 'react';
import renderer from 'react-test-renderer';

import Page from '..';

describe('Page', () => {
  describe('renders', () => {
    it('renders', () => {
      const component = renderer.create(<Page />);

      expect(component).toMatchSnapshot();
    });

    it('renders the verticalCenter styles', () => {
      const component = renderer.create(<Page verticalCenter />);

      expect(component).toMatchSnapshot();
    });

    it('renders the horizontalCenter styles', () => {
      const component = renderer.create(<Page horizontalCenter />);

      expect(component).toMatchSnapshot();
    });
  });
});
