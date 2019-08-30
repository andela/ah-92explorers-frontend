import React from 'react';

const Messages = ({ success, error, file }) => {
  switch (true) {
    case success !== undefined:
      return (
        <div className="successBox">
          { success }
        </div>
      );
    case error !== undefined:
      if (error === 'unauthorised to use this resource, please signup/login') {
        localStorage.clear();
        window.location = '/login';
      }
      return (
        <div className="errorBox">
          { error }
        </div>
      );
    case file !== undefined:
      return (
        <div className="errorBox">
          { file }
        </div>
      );
    default:
      return (
        <div style={{ display: 'none' }} className="Nothing">
          Nothing
        </div>
      );
  }
};

export default Messages;
