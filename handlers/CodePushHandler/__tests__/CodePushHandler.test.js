import React from 'react';
import renderer from 'react-test-renderer';

import { CodePushHandler } from '..';

describe('CodePushHandler', () => {
  const spies = [];
  const dispatch = jest.fn();
  const backgroundState = 'inactive';
  const foregroundState = 'active';
  const codePushStatus = 1;
  const codePushDownloadProgress = { bytesReceived: 100, totalBytes: 500 };

  describe('renders', () => {
    it('renders with minimum required props', () => {
      const component = renderer.create(<CodePushHandler dispatch={dispatch} />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('methods', () => {
    it('should handle syncCodePush', () => {
      const component = renderer.create(<CodePushHandler dispatch={dispatch} />);
      const instance = component.getInstance();

      instance.syncCodePush();
    });

    it('should handle handleAppStateChange', () => {
      spies[0] = jest.spyOn(CodePushHandler.prototype, 'syncCodePush');
      const component = renderer.create(<CodePushHandler dispatch={dispatch} />);
      const instance = component.getInstance();

      instance.handleAppStateChange(backgroundState);
      instance.handleAppStateChange(foregroundState);

      expect(spies[0]).toHaveBeenCalled();
    });

    it('should handle setAppState', () => {
      const component = renderer.create(<CodePushHandler dispatch={dispatch} />);
      const instance = component.getInstance();

      instance.setAppState(backgroundState);

      expect(instance.state.appState).toEqual(backgroundState);
    });

    it('should handle setCodePushStatus', () => {
      const component = renderer.create(<CodePushHandler dispatch={dispatch} />);
      const instance = component.getInstance();

      instance.setCodePushStatus(codePushStatus);

      expect(dispatch).toHaveBeenCalled();
      expect(dispatch).toMatchSnapshot();
    });

    it('should handle setCodePushDownloadProgress', () => {
      const component = renderer.create(<CodePushHandler dispatch={dispatch} />);
      const instance = component.getInstance();

      instance.setCodePushDownloadProgress(codePushDownloadProgress);

      expect(dispatch).toHaveBeenCalled();
      expect(dispatch).toMatchSnapshot();
    });
  });

  describe('lifecycle methods', () => {
    it('should call syncCodePush in componentDidMount', () => {
      spies[0] = jest.spyOn(CodePushHandler.prototype, 'syncCodePush');
      renderer.create(<CodePushHandler dispatch={dispatch} />);

      expect(spies[0]).toHaveBeenCalled();
    });

    it('should call syncCodePush if no codePushStatus in componentDidUpdate', () => {
      spies[0] = jest.spyOn(CodePushHandler.prototype, 'syncCodePush');
      const component = renderer.create(
        <CodePushHandler codePushStatus={codePushStatus} dispatch={dispatch} />,
      );

      component.update(<CodePushHandler dispatch={dispatch} />);

      expect(spies[0]).toHaveBeenCalled();
    });
  });

  afterEach(() => {
    spies.forEach((spy) => {
      if (spy) {
        spy.mockClear();
      }
    });
    dispatch.mockClear();
  });
});
