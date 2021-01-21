import React, { useState, useEffect, useCallback } from "react";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import axios from "@dashboard/utils/axios";

import useIsMountedRef from "@dashboard/hooks/useIsMountedRef";
import Page from "@dashboard/components/Page";
import Header from "@dashboard/components/Header";
import LoadingScreen from "@dashboard/components/LoadingScreen";
import AgencyCard from "./AgencyCard";
import DocumentsCard from "@dashboard/components/DocumentsCard";
import { API_URL } from "@dashboard/constants";

const breadcrumbItems = [
    {
        label: "Recursos"
    },
    {
        label: "Agências",
        active: true
    }
];

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: "100%",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    }
}));

function AgencyDetailsView({ match }) {
    const classes = useStyles();
    const isMountedRef = useIsMountedRef();
    const { id } = match.params;
    const [documents, setDocuments] = useState([]);
    const [agency, setAgency] = useState([]);

    const getDocuments = useCallback(() => {
        axios.get(`${API_URL}/agencies/${id}?include=documents`).then(response => {
            if (isMountedRef.current) {
                setAgency(response.data.data);
                setDocuments(response.data.included)
            }
        });
    }, [isMountedRef]);

    useEffect(() => {
        getDocuments();
    }, [getDocuments]);

    if (!documents) {
        return <LoadingScreen />;
    }

    return (
        <Page className={classes.root} title="Detalhes da agência">
            <Container>
                <Header title="Detalhes da agência" breadcrumbItems={breadcrumbItems} />
                <Box mt={2}>
                    <Grid container spacing={3}>
                        <Grid item lg={4} sx={12}>
                            <AgencyCard agency={agency} />
                        </Grid>
                        <Grid item lg={8} sx={12}>
                            <DocumentsCard documents={documents} />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Page>
    );
}

export default AgencyDetailsView;
