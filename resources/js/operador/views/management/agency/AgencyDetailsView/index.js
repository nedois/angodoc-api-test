import React, { useState, useEffect, useCallback } from "react";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import axios from "axios";

import useIsMountedRef from "../../../../hooks/useIsMountedRef";
import { API_BASE_URL } from "../../../../config";
import Page from "../../../../components/Page";
import Header from "../Header";
import LoadingScreen from "../../../../components/LoadingScreen";
import AgencyCard from "./AgencyCard";
import DocumentsCard from "./DocumentsCard";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: "100%",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    }
}));

function AgencyDetailsView(props) {
    const classes = useStyles();
    const isMountedRef = useIsMountedRef();
    const [agency, setAgency] = useState(null);
    const { id } = props.match.params;

    const getAgency = useCallback(() => {
        axios
            .get(`${API_BASE_URL}/agencies/${id}`, {
                params: { withDocuments: true }
            })
            .then(response => {
                if (isMountedRef.current) {
                    setAgency(response.data.data);
                }
            });
    }, [isMountedRef]);

    useEffect(() => {
        getAgency();
    }, [getAgency]);

    if (!agency) {
        return <LoadingScreen />;
    }

    return (
        <Page className={classes.root} title={`Detalhes da ${agency.name}`}>
            <Container>
                <Header pageTitle={`Detalhes da ${agency.name}`} />
                <Box mt={2}>
                    <Grid container spacing={3}>
                        <Grid item lg={4} sx={12}>
                            <AgencyCard agency={agency} />
                        </Grid>
                        <Grid item lg={8} sx={12}>
                            <DocumentsCard documents={agency.documents} />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Page>
    );
}

export default AgencyDetailsView;
