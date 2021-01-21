import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "react-perfect-scrollbar/dist/css/styles.css";
import "react-quill/dist/quill.snow.css";
import "nprogress/nprogress.css";

import React from "react";
import { render } from "react-dom";
// import { Provider } from "react-redux";
import { enableES5 } from "immer";

// import store from "@dashboard/store";
import { SettingsProvider } from "@dashboard/contexts/SettingsContext";
import { AuthProvider } from "@dashboard/contexts/AuthContext";
import App from "@dashboard/App";

const element = document.getElementById("app");

if (element) {
    enableES5();

    const { user, role, agency } = { ...element.dataset };
    const auth = { ...JSON.parse(user), role, agency: { ...JSON.parse(agency) } };

    render(
        // <Provider store={store}>
        <SettingsProvider>
            <AuthProvider auth={auth}>
                <App />
            </AuthProvider>
        </SettingsProvider>,
        // </Provider>
        element
    );
}
