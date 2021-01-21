import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
import { APP_URL } from "../config";
import AuthGuard from "../components/AuthGuard";

import DashboardLayout from "../layouts/DashboardLayout";
import HomeView from "../views/pages/HomeView";

const generalRoutes = [
    {
        exact: true,
        layout: DashboardLayout,
        path: APP_URL + "/dashboard",
        guard: AuthGuard,
        component: lazy(() => import("../views/pages/HomeView"))
    },
    {
        exact: true,
        path: APP_URL + "/404",
        layout: DashboardLayout,
        guard: AuthGuard,
        component: lazy(() => import("../views/pages/Error404View"))
    },
    {
        exact: true,
        path: APP_URL + "/login",
        component: lazy(() => import("../views/auth/LoginView"))
    },
    {
        path: "*",
        routes: [
            {
                exact: true,
                path: APP_URL + "/dashboard",
                layout: DashboardLayout,
                component: HomeView
            },
            {
                component: () => <Redirect to={APP_URL + "/404"} />
            }
        ]
    }
];

export default generalRoutes;
