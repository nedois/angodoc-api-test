import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
import DocsLayout from "@dashboard/layouts/DocsLayout";
import DashboardLayout from "@dashboard/layouts/DashboardLayout";

import * as LINKS from "./uris";

const routes = [
    {
        exact: true,
        layout: DashboardLayout,
        path: LINKS.ERRORS.NOT_FOUND_URI,
        component: lazy(() => import("@dashboard/pages/errors/NotFoundPage"))
    },
    /**
     * DOCS LINKS
     */
    {
        path: LINKS.DOCS.URI,
        layout: DocsLayout,
        routes: [
            {
                exact: true,
                path: LINKS.DOCS.URI,
                component: () => <Redirect to={LINKS.DOCS.WELCOME_URI} />
            },
            {
                exact: true,
                path: LINKS.DOCS.WELCOME_URI,
                component: lazy(() => import("@dashboard/pages/docs/WelcomePage"))
            }
        ]
    },
    /**
     * DASHBOARD LINKS
     */
    {
        path: LINKS.APP.URI,
        layout: DashboardLayout,
        routes: [
            {
                exact: true,
                path: LINKS.APP.URI,
                component: () => <Redirect to={LINKS.APP.OVERVIEW_URI} />
            },
            {
                exact: true,
                path: LINKS.APP.OVERVIEW_URI,
                component: lazy(() => import("@dashboard/pages/app/OverviewPage"))
            },
            {
                exact: true,
                path: LINKS.DOCUMENTS.URI,
                component: lazy(() => import("@dashboard/pages/documents/DocumentListPage"))
            },
            {
                onlyFor: ["operador", "diretor"],
                exact: true,
                path: LINKS.DOCUMENTS.CREATE_URI,
                component: lazy(() => import("@dashboard/pages/documents/DocumentCreatePage"))
            },
            {
                exact: true,
                path: `${LINKS.DOCUMENTS.URI}/:id`,
                component: lazy(() => import("@dashboard/pages/documents/DocumentShowPage"))
            },
            {
                exact: true,
                path: `${LINKS.DOCUMENTS.URI}/:id/editar`,
                component: lazy(() => import("@dashboard/pages/documents/DocumentEditPage"))
            },
            {
                exact: true,
                path: LINKS.PROFILE.URI,
                component: lazy(() => import("@dashboard/pages/profile/ProfileShowPage"))
            },
            {
                exact: true,
                path: LINKS.FINDERS.URI,
                component: lazy(() => import("@dashboard/pages/finders/FinderListPage"))
            },
            {
                exact: true,
                path: `${LINKS.FINDERS.URI}/:id`,
                component: lazy(() => import("@dashboard/pages/finders/FinderShowPage"))
            },
            {
                exact: true,
                path: `${LINKS.FINDERS.URI}/:id/editar`,
                component: lazy(() => import("@dashboard/pages/finders/FinderEditPage"))
            },
            {
                exact: true,
                path: `${LINKS.USERS.URI}`,
                component: lazy(() => import("@dashboard/pages/users/UserListPage"))
            },
            {
                onlyFor: ["diretor"],
                exact: true,
                path: `${LINKS.USERS.URI}/registar`,
                component: lazy(() => import("@dashboard/pages/users/UserCreatePage"))
            },
            {
                onlyFor: ["administrador", "diretor"],
                exact: true,
                path: `${LINKS.USERS.URI}/:id/editar`,
                component: lazy(() => import("@dashboard/pages/users/UserEditPage"))
            },
            {
                exact: true,
                path: `${LINKS.USERS.URI}/:id`,
                component: lazy(() => import("@dashboard/pages/users/UserShowPage"))
            },
            {
                onlyFor: ["administrador"],
                exact: true,
                path: `${LINKS.AGENCIES.URI}`,
                component: lazy(() => import("@dashboard/pages/agencies/AgencyListView"))
            },
            // {
            //     onlyFor: ["administrador"],
            //     exact: true,
            //     path: `${LINKS.AGENCIES.CREATE_URI}`,
            //     component: lazy(() => import("@dashboard/pages/agencies/AgencyCreateView"))
            // },
            {
                exact: true,
                path: `${LINKS.AGENCIES.URI}/minha-agencia`,
                component: lazy(() => import("@dashboard/pages/agencies/AgencyDetailsView/myAgency"))
            },
            {
                onlyFor: ["diretor"],
                exact: true,
                path: `${LINKS.AGENCIES.URI}/minha-agencia/editar`,
                component: lazy(() => import("@dashboard/pages/agencies/AgencyEditView/editMyAgency"))
            },
            {
                path: "*",
                component: () => <Redirect to={LINKS.ERRORS.NOT_FOUND_URI} />
            }
        ]
    },
    {
        path: "*",
        routes: [
            {
                component: () => <Redirect to={LINKS.ERRORS.NOT_FOUND_URI} />
            }
        ]
    }
];

export default routes;
