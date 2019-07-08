import React from 'react';
import renderer from 'react-test-renderer';
import codePush from 'react-native-code-push';

import { CodePushStatusContainer } from '..';

describe('CodePushStatusContainer', () => {
  describe('renders', () => {
    it('renders with minimum required props', () => {
      const component = renderer.create(<CodePushStatusContainer />);

      expect(component).toMatchSnapshot();
    });

    it('renders the up to date state', () => {
      const component = renderer.create(
        <CodePushStatusContainer codePushSyncStatus={codePush.SyncStatus.UP_TO_DATE} />,
      );

      expect(component).toMatchSnapshot();
    });

    it('renders the update ready state', () => {
      const component = renderer.create(
        <CodePushStatusContainer codePushSyncStatus={codePush.SyncStatus.UPDATE_INSTALLED} />,
      );

      expect(component).toMatchSnapshot();
    });

    it('renders the checking for updates state', () => {
      const component = renderer.create(
        <CodePushStatusContainer codePushSyncStatus={codePush.SyncStatus.CHECKING_FOR_UPDATE} />,
      );

      expect(component).toMatchSnapshot();
    });

    it('renders the downloading update state', () => {
      const codePushDownloadProgress = { receivedBytes: 100, totalBytes: 200 };
      const component = renderer.create(
        <CodePushStatusContainer
          codePushSyncStatus={codePush.SyncStatus.DOWNLOADING_PACKAGE}
          codePushDownloadProgress={codePushDownloadProgress}
        />,
      );

      expect(component).toMatchSnapshot();
    });
  });
});
