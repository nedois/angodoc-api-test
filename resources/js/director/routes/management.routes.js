import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
import { APP_URL } from "../config";
import AuthGuard from "../components/AuthGuard";

import DashboardLayout from "../layouts/DashboardLayout";

const managementRoutes = [
    {
        exact: true,
        layout: DashboardLayout,
        path: APP_URL + "/recursos/documentos",
        guard: AuthGuard,
        component: lazy(() =>
            import("../views/management/document/DocumentListView")
        )
    },
    {
        exact: true,
        layout: DashboardLayout,
        path: APP_URL + "/recursos/documentos/criar-novo-documento",
        guard: AuthGuard,
        component: lazy(() =>
            import("../views/management/document/DocumentCreateView")
        )
    },
    {
        exact: true,
        layout: DashboardLayout,
        path: APP_URL + "/recursos/documentos/todos-documentos-nessa-agencia",
        guard: AuthGuard,
        component: lazy(() =>
            import("../views/management/document/DocumentAgencyListView")
        )
    },
    {
        exact: true,
        layout: DashboardLayout,
        path: APP_URL + "/recursos/documentos/:id",
        guard: AuthGuard,
        component: lazy(() =>
            import("../views/management/document/DocumentDetailsView")
        )
    },
    {
        exact: true,
        layout: DashboardLayout,
        path: APP_URL + "/recursos/documentos/:id/editar",
        guard: AuthGuard,
        component: lazy(() =>
            import("../views/management/document/DocumentEditView")
        )
    },
    {
        exact: true,
        layout: DashboardLayout,
        path: APP_URL + "/recursos/encontradores",
        guard: AuthGuard,
        component: lazy(() =>
            import("../views/management/finder/FinderListView")
        )
    },
    {
        exact: true,
        layout: DashboardLayout,
        path: APP_URL + "/recursos/encontradores/:id",
        guard: AuthGuard,
        component: lazy(() =>
            import("../views/management/finder/FinderDetailsView")
        )
    },
    {
        exact: true,
        layout: DashboardLayout,
        path: APP_URL + "/recursos/encontradores/:id/editar",
        guard: AuthGuard,
        component: lazy(() =>
            import("../views/management/finder/FinderEditView")
        )
    },
    {
        exact: true,
        layout: DashboardLayout,
        path: APP_URL + "/recursos/agencias",
        guard: AuthGuard,
        component: lazy(() =>
            import("../views/management/agency/AgencyListView")
        )
    },
    {
        exact: true,
        layout: DashboardLayout,
        path: APP_URL + "/recursos/agencias/:id",
        guard: AuthGuard,
        component: lazy(() =>
            import("../views/management/agency/AgencyDetailsView")
        )
    },
    {
        exact: true,
        layout: DashboardLayout,
        path: APP_URL + "/recursos/agencias/:id/editar",
        guard: AuthGuard,
        component: lazy(() =>
            import("../views/management/agency/AgencyEditView")
        )
    },
    {
        exact: true,
        layout: DashboardLayout,
        path: APP_URL + "/gestao-do-sistema/funcionarios",
        guard: AuthGuard,
        component: lazy(() =>
            import("../views/management/customer/CustomerAgencyListView")
        )
    },
    {
        exact: true,
        layout: DashboardLayout,
        path: APP_URL + "/gestao-do-sistema/funcionarios/novo-funcionario",
        guard: AuthGuard,
        component: lazy(() =>
            import("../views/management/customer/CustomerCreateView")
        )
    },
    {
        exact: true,
        layout: DashboardLayout,
        path: APP_URL + "/gestao-do-sistema/funcionarios/:id",
        guard: AuthGuard,
        component: lazy(() =>
            import("../views/management/customer/CustomerDetailsView")
        )
    },
    {
        exact: true,
        layout: DashboardLayout,
        path: APP_URL + "/gestao-do-sistema/funcionarios/:id/editar",
        guard: AuthGuard,
        component: lazy(() =>
            import("../views/management/customer/CustomerEditView")
        )
    }
];

export default managementRoutes;
