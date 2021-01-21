import React, { Suspense, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

import generalRoutes from "./general.routes";
import managementRoutes from "./management.routes";

const routesConfig = [...managementRoutes, ...generalRoutes];

const renderRoutes = routes =>
    routes ? (
        <Suspense fallback={<LoadingScreen />}>
            <Switch>
                {routes.map((route, i) => {
                    const Guard = route.guard || Fragment;
                    const Layout = route.layout || Fragment;
                    const Component = route.component;

                    return (
                        <Route
                            key={i}
                            path={route.path}
                            exact={route.exact}
                            render={props => (
                                <Guard>
                                    <Layout>
                                        {route.routes ? (
                                            renderRoutes(route.routes)
                                        ) : (
                                            <Component {...props} />
                                        )}
                                    </Layout>
                                </Guard>
                            )}
                        />
                    );
                })}
            </Switch>
        </Suspense>
    ) : null;

function Routes() {
    return renderRoutes(routesConfig);
}

export default Routes;
