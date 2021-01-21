import React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import MomentUtils from "@date-io/moment";
import { create } from "jss";
import { SnackbarProvider } from "notistack";
import { jssPreset, StylesProvider, ThemeProvider } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import GlobalStyles from "@dashboard/components/GlobalStyles";
import ScrollReset from "@dashboard/components/ScrollReset";
import useSettings from "@dashboard/hooks/useSettings";
import { createTheme } from "@dashboard/theme";
import renderRoutes from "@dashboard/routes";
import routes from "@dashboard/routes/routes";
import useAuth from "@dashboard/hooks/useAuth";

const jss = create({ plugins: [...jssPreset().plugins] });
const history = createBrowserHistory();

const App = () => {
    const { user } = useAuth();
    const { settings } = useSettings();
    
    const theme = createTheme({
        responsiveFontSizes: settings.responsiveFontSizes,
        theme: settings.theme
    });

    return (
        <ThemeProvider theme={theme}>
            <StylesProvider jss={jss}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <SnackbarProvider dense maxSnack={3}>
                        <Router history={history}>
                            <GlobalStyles />
                            <ScrollReset />
                            {renderRoutes(user.role, routes)}
                        </Router>
                    </SnackbarProvider>
                </MuiPickersUtilsProvider>
            </StylesProvider>
        </ThemeProvider>
    );
};

export default App;
