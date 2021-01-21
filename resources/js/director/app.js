import "@coreui/coreui";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "react-perfect-scrollbar/dist/css/styles.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-quill/dist/quill.snow.css";
import "nprogress/nprogress.css";
import "./assets/css/prism.css";
import "./mixins/chartjs";
import "./mixins/prismjs";
import { enableES5 } from "immer";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { SettingsProvider } from "./context/SettingsContext";
import { configureStore } from "./store";
import { restoreSettings } from "./utils/settings";
import App from "./react-app";

enableES5();

const store = configureStore();
const settings = restoreSettings();

ReactDOM.render(
    <Provider store={store}>
        <SettingsProvider settings={settings}>
            <App />
        </SettingsProvider>
    </Provider>,
    document.getElementById("root")
);
