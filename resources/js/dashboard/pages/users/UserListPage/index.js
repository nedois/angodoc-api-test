import React, { useState, useEffect, useCallback } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import { useSnackbar } from "notistack";
import axios from "@dashboard/utils/axios";
import useIsMountedRef from "@dashboard/hooks/useIsMountedRef";
import useAuth from "@dashboard/hooks/useAuth";

import { API_URL } from "@dashboard/constants";
import Page from "@dashboard/components/Page";
import Header from "@dashboard/components/Header";
import { USERS } from "@dashboard/routes/uris";

import UsersTable from "./UsersTable";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: "100%",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    }
}));

const breadcrumbItems = [
    {
        label: "Gestão do sistema"
    },
    {
        label: "Funcionários",
        to: USERS.URI
    },
    {
        label: "Funcionários da agência",
        active: true
    }
];

function UsersListPage() {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const isMountedRef = useIsMountedRef();
    const { user } = useAuth();

    const [users, setUsers] = useState([]);
    const [usersCount, setUsersCount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [orderBy, setOrderBy] = useState("first_name");
    const [currentTab, setCurrentTab] = useState("index");
    const [query, setQuery] = useState("");

    const params = {
        "page[page]": page,
        "page[limit]": limit,
        sort: orderBy,
        ...(currentTab === "index" && { "filter[bi]": query || "" }),
        ...(currentTab === "only_trashed" && { "filter[only_trashed]": query || "" }),
        ...(currentTab === "only_desactivated" && { "filter[only_desactivated]": query || "" })
    };

    const getUsers = useCallback(() => {
        axios
            .get(`${API_URL}/users`, { params })
            .then(response => {
                setUsersCount(parseInt(response.data.meta.page.total));
                setUsers(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                enqueueSnackbar(error.message, {
                    variant: "error"
                });
            });
    }, [isMountedRef, page, orderBy, page, limit, currentTab, query]);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return (
        <Page className={classes.root} title="Funcionários da agência">
            <Container>
                <Header
                    title="Funcionários da agência"
                    breadcrumbItems={breadcrumbItems}
                    actionButtonTo={user.role == "diretor" && USERS.CREATE_URI}
                    actionButtonLabel="Registar funcionário"
                />
                <Box mt={3}>
                    <UsersTable
                        page={parseInt(page)}
                        usersCount={usersCount}
                        users={users}
                        setPage={setPage}
                        currentTab={currentTab}
                        setCurrentTab={setCurrentTab}
                        limit={limit}
                        setLimit={setLimit}
                        orderBy={orderBy}
                        setOrderBy={setOrderBy}
                        loading={loading}
                        setLoading={setLoading}
                        query={query}
                        setQuery={setQuery}
                    />
                </Box>
            </Container>
        </Page>
    );
}

export default UsersListPage;
