import React, { useState, useEffect, useCallback } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import { useSnackbar } from "notistack";
import axios from "@dashboard/utils/axios";
import useIsMountedRef from "@dashboard/hooks/useIsMountedRef";

import { API_URL } from "@dashboard/constants";
import Page from "@dashboard/components/Page";
import Header from "@dashboard/components/Header";
import { FINDERS } from "@dashboard/routes/uris";

import FindersTable from "./FindersTable";

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
        label: "Recursos"
    },
    {
        label: "Encontradores",
        to: FINDERS.URI
    },
    {
        label: "Todos encontradores",
        active: true
    }
];

function FinderListPage() {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const isMountedRef = useIsMountedRef();

    const [finders, setFinders] = useState([]);
    const [findersCount, setFindersCount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [orderBy, setOrderBy] = useState("-first_name");
    const [currentTab, setCurrentTab] = useState("index");
    const [query, setQuery] = useState("");

    const params = {
        "page[page]": page,
        "page[limit]": limit,
        sort: orderBy,
        ...(query && currentTab === "index" && { "filter[biOrName]": query }),
        ...(query && currentTab === "only_trashed" && { "filter[only_trashed]": "" }),
        ...(query && currentTab === "only_recovered" && { "filter[only_recovered]": "" })
    };

    const getFinders = useCallback(() => {
        axios
            .get(`${API_URL}/finders`, { params })
            .then(response => {
                setFindersCount(parseInt(response.data.meta.page.total));
                setFinders(response.data.data);
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
        getFinders();
    }, [getFinders]);

    return (
        <Page className={classes.root} title="Lista dos encontradores">
            <Container>
                <Header title="Todos encontradores" breadcrumbItems={breadcrumbItems} />
                <Box mt={3}>
                    <FindersTable
                        findersCount={findersCount}
                        finders={finders}
                        page={parseInt(page)}
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

export default FinderListPage;
