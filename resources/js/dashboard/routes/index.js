import React, { Suspense, Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import LoadingScreen from "@dashboard/components/LoadingScreen";

const renderRoutes = (role, routes = []) => {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <Switch>
                {routes.map((route, i) => {
                    const Layout = route.layout || Fragment;
                    const Component = route.component;

                    if (route.onlyFor && !route.onlyFor.includes(role)) {
                        return null;
                    }

                    return (
                        <Route
                            key={i}
                            path={route.path}
                            exact={route.exact}
                            render={props => (
                                <Layout>
                                    {route.routes ? renderRoutes(role, route.routes) : <Component {...props} />}
                                </Layout>
                            )}
                        />
                    );
                })}
            </Switch>
        </Suspense>
    );
};
export default renderRoutes;
