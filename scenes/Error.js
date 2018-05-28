import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Page, InfoBlock } from 'react-native-simple-components';

import styleConstants from '../styleConstants';

export class Error extends React.Component {
  static propTypes = {
    message: PropTypes.string,
  };

  static defaultProps = {
    message: 'Something went wrong.',
  };

  state = {};

  render() {
    const { message } = this.props;

    return (
      <Page
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: styleConstants.dimensions.spacing.vertical,
          paddingHorizontal: styleConstants.dimensions.spacing.horizontal,
        }}
      >
        <InfoBlock title="Error" description={message} />
      </Page>
    );
  }
}

export default connect()(Error);
