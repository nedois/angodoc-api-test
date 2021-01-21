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
import AgencyCard from "@dashboard/components/AgencyCard";
import DocumentCard from "@dashboard/components/DocumentCard";
import useAuth from "@dashboard/hooks/useAuth";
import DocumentCardActions from "./DocumentCardActions";

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
        label: "Detalhes do documento",
        active: true
    }
];

function DocumentShowPage({ match }) {
    const classes = useStyles();
    const isMountedRef = useIsMountedRef();
    const [document, setDocument] = useState(null);
    const [isRecovered, setIsRecovered] = useState(document && document.recovered_at);
    const { id } = match.params;
    const { user } = useAuth();

    const getDocument = useCallback(() => {
        axios.get(`${API_URL}/documents/${id}?include=agency,finder`).then(response => {
            if (isMountedRef.current) {
                setDocument(response.data);
                setIsRecovered(response.data.data.attributes.recovered_at);
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
        <Page className={classes.root} title={`Detalhes do documento ${document.data.attributes.reference}`}>
            <Container>
                <Header
                    title={`Detalhes do documento ${document.data.attributes.reference}`}
                    breadcrumbItems={breadcrumbItems}
                    actionButtonTo={user.role != "administrador" ? DOCUMENTS.CREATE_URI : null}
                    actionButtonLabel="Registar documento"
                />
                <Box mt={2}>
                    <Grid container spacing={3}>
                        <Grid container spacing={3}>
                            <Grid item lg={4} sx={12}>
                                <DocumentCard document={document.data}>
                                    <DocumentCardActions
                                        id={document.data.id}
                                        documentAgencyId={document.included[1].id}
                                        setIsRecovered={setIsRecovered}
                                        isRecovered={isRecovered}
                                        isDeleted={document.data.attributes.deleted_at && true}
                                    />
                                </DocumentCard>
                            </Grid>
                            <Grid item lg={4} sx={12}>
                                <AgencyCard agency={document.included[1]} />
                            </Grid>
                            <Grid item lg={4} sx={12}>
                                <FinderCard finder={document.included[0]} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Page>
    );
}

export default DocumentShowPage;
