import React from 'react';

export default class Validator {
  static validateUsername(info) {
    const fields = Object.keys(info);
    let usernameError;
    for (const key of fields) {
      if (info[key].length < 5 || info[key].length > 15) {
        return (usernameError = (
          <ul>
            <li>Username should be more than 3 characters</li>
            <li>Username should be less than 15 characters</li>
          </ul>
        ));
      }
    }
    return usernameError;
  }

  static validatePassoword(info) {
    const fields = Object.keys(info);
    let passwordError;
    const pwdRegex = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
    for (const key of fields) {
      if (pwdRegex.test(info[key]) === false) {
        return (passwordError = (
          <ul>
            <li>Password should be 8 characters </li>
            <li>Password should not be alphanumeric </li>
            <li>Password should have atleast a digit and special character</li>
            <li>Password should have an uppercase and lowercase letter </li>
          </ul>
        ));
      }
    }
    return passwordError;
  }

  static validateEmail(info) {
    const fields = Object.keys(info);
    let emailError;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    for (const key of fields) {
      if (emailRegex.test(info[key]) === false) {
        return (emailError = (
          <ul>
            <li>Please enter a valid email address</li>
            <li> e.g yournames@yahoo.com </li>
          </ul>
        ));
      }
    }
    return emailError;
  }
}
