import reducer from '..';
import initialState from '../initialState';

describe('navigationReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle PUSH_PAGE', () => {
    const page = 'test';
    const payload = { page };

    const action = {
      type: 'PUSH_PAGE',
      payload,
    };

    expect(reducer(undefined, action).pages).toEqual([page]);
  });

  describe('should handle POP_PAGE', () => {
    it('should work', () => {
      const page = 'test';
      const state = {
        pages: [page],
      };

      const action = {
        type: 'POP_PAGE',
      };

      expect(reducer(state, action).pages).toEqual([]);
    });

    it('should work with empty state', () => {
      const action = {
        type: 'POP_PAGE',
      };

      expect(reducer(undefined, action).pages).toEqual([]);
    });
  });

  describe('should handle RESET_PAGES', () => {
    it('should work', () => {
      const page1 = 'test1';
      const page2 = 'test2';
      const page3 = 'test3';
      const state = {
        pages: [page1, page2],
      };

      const action = {
        type: 'RESET_PAGES',
        payload: {
          page: page3,
        },
      };

      expect(reducer(state, action).pages).toEqual([page3]);
    });

    it('should work with empty state', () => {
      const page = 'test';
      const action = {
        type: 'RESET_PAGES',
        payload: {
          page,
        },
      };

      expect(reducer(undefined, action).pages).toEqual([page]);
    });
  });

  describe('should handle REPLACE_PAGE', () => {
    it('should work', () => {
      const page1 = 'test1';
      const page2 = 'test2';
      const page3 = 'test3';
      const state = {
        pages: [page1, page2],
      };

      const action = {
        type: 'REPLACE_PAGE',
        payload: {
          page: page3,
        },
      };

      expect(reducer(state, action).pages).toEqual([page1, page3]);
    });

    it('should work with empty state', () => {
      const page = 'test';
      const action = {
        type: 'RESET_PAGES',
        payload: {
          page,
        },
      };

      expect(reducer(undefined, action).pages).toEqual([page]);
    });
  });
});
