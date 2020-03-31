import React, { Component } from 'react';

var UserProfile = (function() {
  var email_id = "";

  var getEmail = function() {
    return email_id;    // Or pull this from cookie/localStorage
  };

  var setEmail = function(email) {
    email_id = email;     
    // Also set this in cookie/localStorage
  };

  return {
    getEmail: getEmail,
    setEmail: setEmail
  }

})();

export default UserProfile;