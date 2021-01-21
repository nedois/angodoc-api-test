import React, { useState, useEffect, useCallback } from "react";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import axios from "axios";

import useIsMountedRef from "../../../../hooks/useIsMountedRef";
import { API_BASE_URL } from "../../../../config";
import Page from "../../../../components/Page";
import Header from "../Header";
import LoadingScreen from "../../../../components/LoadingScreen";
import FinderCard from "../FinderCard";
import AgencyCard from "../AgencyCard";
import DocumentCard from "./DocumentCard";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: "100%",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    }
}));

function DocumentDetailsView(props) {
    const classes = useStyles();
    const isMountedRef = useIsMountedRef();
    const [document, setDocument] = useState(null);
    const { id } = props.match.params;

    const getDocument = useCallback(() => {
        axios.get(`${API_BASE_URL}/documents/${id}`).then(response => {
            if (isMountedRef.current) {
                setDocument(response.data.data);
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
        <Page className={classes.root} title={`Documento ${document.reference}`}>
            <Container>
                <Header pageTitle={`Documento ${document.reference}`} />
                <Box mt={2}>
                    <Grid container spacing={3}>
                        <Grid item lg={4} sx={12}>
                            <DocumentCard document={document} />
                        </Grid>
                        <Grid item lg={4} sx={12}>
                            <AgencyCard agency={document.agency} />
                        </Grid>
                        <Grid item lg={4} sx={12}>
                            <FinderCard finder={document.found_by} />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Page>
    );
}

export default DocumentDetailsView;
