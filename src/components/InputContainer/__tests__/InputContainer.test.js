import React from 'react';
import renderer from 'react-test-renderer';

import InputContainer from '..';

describe('InputContainer', () => {
  it('renders with minimum required props', () => {
    expect(renderer.create(<InputContainer />)).toMatchSnapshot();
  });
});
