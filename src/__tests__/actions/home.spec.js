import * as actions from '../../redux/actions/actionCreators/home';


describe('Home actions', () => {
  it('Should return getHome type', () => {
    const response = actions.getHome();
    expect(response).toEqual({
      payload: 'Authors Haven in the Blime',
      type: 'GET_HOME',
    });
  });
});
