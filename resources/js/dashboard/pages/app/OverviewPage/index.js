import React from "react";
import useAuth from "@dashboard/hooks/useAuth";
import AdminOverviewPage from "./AdminOverviewPage";
import OperatorOverviewPage from "./OperatorOverviewPage";

const OverviewPage = () => {
    const { user } = useAuth();

    if (user.role === "administrador") {
        return <AdminOverviewPage user={user} />;
    } else {
        return <OperatorOverviewPage user={user} />;
    }
};

export default OverviewPage;
