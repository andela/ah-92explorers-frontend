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
