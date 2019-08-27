import validateInput from '../../../middleware/validations/login';


describe('Login frontend validation', () => {
  it('Should return errors when email is empty', () => {
    const data = { email: '', password: '@Dggadee245' };
    const response = validateInput(data);
    expect(response).toEqual({
      errors: {
        email: 'Email is required',
      },
      isValid: false,
    });
  });

  it('Should return errors when email is invalid', () => {
    const data = { email: 'hello', password: '@Dggadee245' };
    const response = validateInput(data);
    expect(response).toEqual({
      errors: {
        email: 'Email is invalid',
      },
      isValid: false,
    });
  });

  it('Should return errors when password is empty', () => {
    const data = { email: 'eric@gmail.com', password: '' };
    const response = validateInput(data);
    expect(response).toEqual({
      errors: {
        password: 'Password is required',
      },
      isValid: false,
    });
  });

  it('Should return incorrect password or email', () => {
    const data = { email: 'eric@gmail.com', password: '123456' };
    const response = validateInput(data);
    expect(response).toEqual({
      errors: {
        password: 'Incorrect Email or Password',
      },
      isValid: false,
    });
  });
});
