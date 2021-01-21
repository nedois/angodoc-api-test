import React, { useState, useEffect, useCallback } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import { useSnackbar } from "notistack";

import axios from "@dashboard/utils/axios";
import Page from "@dashboard/components/Page";
import useIsMountedRef from "@dashboard/hooks/useIsMountedRef";
import Header from "@dashboard/components/Header";
import Results from "./Results";
import { API_URL } from "@dashboard/constants";

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
        label: "Agências"
    },
    {
        label: "Todas agências",
        active: true
    }
];

function AgencyListView() {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const isMountedRef = useIsMountedRef();

    const [agencies, setAgencies] = useState([]);
    const [query, setQuery] = useState("");
    const [agenciesCount, setAgenciesCount] = useState(1);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [orderBy, setOrderBy] = useState("name");

    const params = {
        "page[page]": page,
        "page[limit]": limit,
        sort: orderBy,
        ...(query && { "filter[name]": query })
    };

    const getAgencies = useCallback(() => {
        axios
            .get(`${API_URL}/agencies?include=director`, { params })
            .then(response => {
                setAgencies(response.data.data);
                setAgenciesCount(parseInt(response.data.meta.page.total));
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                enqueueSnackbar(error.message, {
                    variant: "error"
                });
            });
    }, [isMountedRef, page, orderBy, page, limit, query]);

    useEffect(() => {
        getAgencies();
    }, [getAgencies]);

    return (
        <Page className={classes.root} title="Lista das agências">
            <Container>
                <Header title="Lista das agências" breadcrumbItems={breadcrumbItems} />
                <Box mt={3}>
                    <Results
                        page={parseInt(page)}
                        agenciesCount={agenciesCount}
                        agencies={agencies}
                        setPage={setPage}
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

export default AgencyListView;
