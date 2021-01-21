import React, { useState, useEffect, useCallback } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import { useSnackbar } from "notistack";

import axios from "@dashboard/utils/axios";
import useIsMountedRef from "@dashboard/hooks/useIsMountedRef";
import useAuth from "@dashboard/hooks/useAuth";
import { API_URL } from "@dashboard/constants";
import Page from "@dashboard/components/Page";
import Header from "@dashboard/components/Header";
import { DOCUMENTS } from "@dashboard/routes/uris";

import DocumentsTable from "./DocumentsTable";

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
        label: "Documentos",
        to: DOCUMENTS.URI
    },
    {
        label: "Todos documentos angodoc",
        active: true
    }
];

function DocumentListPage() {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const isMountedRef = useIsMountedRef();
    const { user } = useAuth();

    const [documents, setDocuments] = useState([]);
    const [docsCount, setDocsCount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [orderBy, setOrderBy] = useState("-created_at");
    const [currentTab, setCurrentTab] = useState("index");
    const [query, setQuery] = useState("");

    const params = {
        "page[page]": page,
        "page[limit]": limit,
        sort: orderBy,
        ...(currentTab === "index" && { "filter[reference]": query || "" }),
        ...(currentTab === "only_trashed" && { "filter[only_trashed]": query || "" }),
        ...(currentTab === "only_recovered" && { "filter[only_recovered]": query || "" })
    };

    const getDocuments = useCallback(() => {
        axios
            .get(`${API_URL}/documents?include=creator,finder,agency`, { params })
            .then(response => {
                setDocsCount(parseInt(response.data.meta.page.total));
                setDocuments(response.data.data);
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
        getDocuments();
    }, [getDocuments]);

    return (
        <Page className={classes.root} title="Lista dos documentos">
            <Container>
                <Header
                    title="Todos documentos"
                    breadcrumbItems={breadcrumbItems}
                    actionButtonTo={user.role != "administrador" ? DOCUMENTS.CREATE_URI : null}
                    actionButtonLabel="Registar documento"
                />
                <Box mt={3}>
                    <DocumentsTable
                        page={parseInt(page)}
                        docsCount={docsCount}
                        documents={documents}
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

export default DocumentListPage;
