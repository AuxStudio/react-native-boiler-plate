import { Actions } from 'react-native-router-flux';
import navigate from '..';

describe('navigate()', () => {
  const page = 'home';
  const props = {
    foo: 'bar',
  };

  describe('should handle page navigation', () => {
    it('with props', () => {
      navigate(page, props);

      expect(Actions[page]).toHaveBeenCalledWith(props);
    });

    it('without props', () => {
      navigate(page);

      expect(Actions[page]).toHaveBeenCalledWith(undefined);
    });
  });

  describe('should handle pop', () => {
    it('with props', () => {
      navigate(null, props);

      expect(Actions.pop).toHaveBeenCalled();
      expect(Actions.refresh).toHaveBeenCalledWith(props);
    });

    it('without props', () => {
      navigate();

      expect(Actions.pop).toHaveBeenCalled();
      expect(Actions.refresh).not.toHaveBeenCalled();
    });
  });

  describe('should handle reset', () => {
    it('with props', () => {
      navigate(page, props, true);

      expect(Actions.reset).toHaveBeenCalledWith({ sceneKey: page }, props);
    });

    it('without props', () => {
      navigate(page, null, true);

      expect(Actions.reset).toHaveBeenCalledWith({ sceneKey: page }, null);
    });
  });

  describe('should handle replace', () => {
    it('with props', () => {
      navigate(page, props, null, true);

      expect(Actions.replace).toHaveBeenCalledWith({ sceneKey: page }, props);
    });

    it('without props', () => {
      navigate(page, null, null, true);

      expect(Actions.replace).toHaveBeenCalledWith({ sceneKey: page }, null);
    });
  });

  afterEach(() => {
    // Otherwise these tests won't work
    jest.clearAllMocks();
  });
});
