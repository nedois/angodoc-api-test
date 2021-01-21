import React, { useState, useEffect, useCallback } from "react";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";

import axios from "@dashboard/utils/axios";
import useIsMountedRef from "@dashboard/hooks/useIsMountedRef";
import { API_URL } from "@dashboard/constants";
import Header from "@dashboard/components/Header";
import Page from "@dashboard/components/Page";
import { DOCUMENTS } from "@dashboard/routes/uris";
import LoadingScreen from "@dashboard/components/LoadingScreen";
import FinderCard from "@dashboard/components/FinderCard";
import DocumentEditForm from "./DocumentEditForm";

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
        label: "Editar documento",
        active: true
    }
];

function DocumentEditPage({ match }) {
    const classes = useStyles();
    const isMountedRef = useIsMountedRef();
    const [document, setDocument] = useState(null);
    const { id } = match.params;

    const getDocument = useCallback(() => {
        axios.get(`${API_URL}/documents/${id}?include=finder`).then(response => {
            if (isMountedRef.current) {
                setDocument(response.data);
            }
        });
    }, [isMountedRef]);

    useEffect(() => {
        getDocument();
    }, [getDocument]);

    if (!document) {
        return <LoadingScreen />;
    }

    return (
        <Page className={classes.root} title={`Editar documento ${document.data.attributes.reference}`}>
            <Container>
                <Header title={`Editar documento ${document.data.attributes.reference}`} breadcrumbItems={breadcrumbItems} />
                <Box mt={2}>
                    <Grid container spacing={3}>
                        <Grid item lg={8} sx={12}>
                            <DocumentEditForm document={document.data} id={id} />
                        </Grid>
                        <Grid item lg={4} sx={12}>
                            <FinderCard finder={document.included[0]} />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Page>
    );
}

export default DocumentEditPage;
