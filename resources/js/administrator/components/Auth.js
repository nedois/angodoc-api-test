import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import SplashScreen from "../components/SplashScreen";
import { setUserData, logout } from "../actions/accountActions";
import authService from "../services/authService";

function Auth({ children }) {
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            authService.setAxiosInterceptors({
                onLogout: () => dispatch(logout())
            });

            await dispatch(setUserData());

            setLoading(false);
        };

        initAuth();
    }, [dispatch]);

    if (isLoading) {
        return <SplashScreen />;
    }

    return children;
}

Auth.propTypes = {
    children: PropTypes.any
};

export default Auth;
