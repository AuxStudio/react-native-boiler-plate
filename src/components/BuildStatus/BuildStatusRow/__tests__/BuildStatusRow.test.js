import React from 'react';
import renderer from 'react-test-renderer';

import BuildStatusRow from '..';

describe('BuildStatusRow', () => {
  const labelText = 'Foo';
  const valueText = 'Bar';

  describe('renders', () => {
    it('renders', () => {
      const component = renderer.create(
        <BuildStatusRow labelText={labelText} valueText={valueText} />,
      );

      expect(component).toMatchSnapshot();
    });
  });
});
