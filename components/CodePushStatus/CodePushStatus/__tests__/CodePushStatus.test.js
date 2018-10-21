import React from 'react';
import renderer from 'react-test-renderer';

import CodePushStatus from '..';

describe('CodePushStatus', () => {
  const iconName = 'check';
  const text = 'Up to date';

  describe('renders', () => {
    it('renders', () => {
      const component = renderer.create(<CodePushStatus iconName={iconName} text={text} />);

      expect(component).toMatchSnapshot();
    });

    it('renders the loading state', () => {
      const component = renderer.create(
        <CodePushStatus iconName={iconName} text={text} isLoading />,
      );

      expect(component).toMatchSnapshot();
    });
  });
});
