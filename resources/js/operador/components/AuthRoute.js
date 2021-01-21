import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { APP_URL } from "../config";

function AuthRoute({ component: Component, render, ...rest }) {
  const account = useSelector((state) => state.account);

  if (!account.user) {
    return <Redirect to={APP_URL + "/login"} />;
  }

  return render ? render({ ...rest }) : <Component {...rest} />;
}

AuthRoute.propTypes = {
  component: PropTypes.any,
  render: PropTypes.func
};

export default AuthRoute;
