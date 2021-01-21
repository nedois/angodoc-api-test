import React from 'react';

function Logo(props) {
  return (
    <img
      alt="Logo"
      src="/img/logo.svg"
      {...props}
    />
  );
}

export default Logo;
