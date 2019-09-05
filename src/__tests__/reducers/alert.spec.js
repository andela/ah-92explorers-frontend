import reducer from '../../redux/reducers/alert';

import {
  SET_ALERT, REMOVE_ALERT
} from '../../redux/actions/actionTypes';


describe('Testing Reducers Action type SET_ALERT', () => {
  test(' Reducer should be ', () => {
    const action = { type: SET_ALERT, payload: {} };
    expect(reducer([{}], action)).toEqual([{},{}]);
  });

  test(' Reducer should be', () => {
    const action = { type: REMOVE_ALERT, payload: { } };
    expect(reducer([{}], action)).toEqual([{}]);
  });
});

