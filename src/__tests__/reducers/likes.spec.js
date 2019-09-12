import { LIKE_ARTICLE, DISLIKE_ARTICLE } from '../../redux/actions/actionTypes';
import likes from '../../redux/reducers/likes';
  
  describe('Article Reducer', () => {
    it('should return payload when LIKE_ARTICLE types performed', () => {
      const payload = {
        message: 'created success',
        likes: {}, 
      };
      const initialState = {
        like: {},
      };
      const state = likes(initialState, {
        type: LIKE_ARTICLE,
        payload,
      });
      expect(state).toEqual({ like: payload });
    })
    it('should return payload when DISLIKE_ARTICLE types performed', () => {
        const payload = {
          message: 'created success',
          likes: {}, 
        };
        const initialState = {
          like: {},
        };
        const state = likes(initialState, {
          type: DISLIKE_ARTICLE,
          payload,
        });
        expect(state).toEqual({ like: payload });
      })
  });
  