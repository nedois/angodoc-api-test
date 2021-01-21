import React, { useState, useEffect, useCallback } from "react";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import axios from "@dashboard/utils/axios";

import useIsMountedRef from "@dashboard/hooks/useIsMountedRef";
import Page from "@dashboard/components/Page";
import Header from "@dashboard/components/Header";
import LoadingScreen from "@dashboard/components/LoadingScreen";
import MyAgencyCard from "./MyAgencyCard";
import DocumentsCard from "@dashboard/components/DocumentsCard";
import { API_URL } from "@dashboard/constants";

const breadcrumbItems = [
    {
        label: "Recursos"
    },
    {
        label: "Agências"
    },
    {
        label: "Minha agência",
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

function AgencyDetailsView() {
    const classes = useStyles();
    const isMountedRef = useIsMountedRef();
    const [documents, setDocuments] = useState(null);

    const getDocuments = useCallback(() => {
        axios.get(`${API_URL}/documents?filter[reference]`).then(response => {
            if (isMountedRef.current) {
                setDocuments(response.data.data);
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
        <Page className={classes.root} title="Detalhes da minha agência">
            <Container>
                <Header title="Detalhes da minha agência" breadcrumbItems={breadcrumbItems} />
                <Box mt={2}>
                    <Grid container spacing={3}>
                        <Grid item lg={4} sx={12}>
                            <MyAgencyCard />
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
