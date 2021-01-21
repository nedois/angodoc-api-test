import React, { useState, useEffect, useCallback } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import axios from "axios";

import useIsMountedRef from "../../../../hooks/useIsMountedRef";
import { API_BASE_URL } from "../../../../config";
import Page from "../../../../components/Page";
import Header from "../Header";
import LoadingScreen from "../../../../components/LoadingScreen";
import Results from "./Results";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: "100%",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    }
}));

function DocumentListView() {
    const classes = useStyles();
    const isMountedRef = useIsMountedRef();
    const [documents, setDocuments] = useState(null);

    const getDocuments = useCallback(() => {
        axios.get(API_BASE_URL + "/documents").then(response => {
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
        <Page className={classes.root} title="Lista dos documentos">
            <Container>
                <Header pageTitle="Todos documentos" />
                    <Box mt={3}>
                        <Results documents={documents} />
                    </Box>
            </Container>
        </Page>
    );
}

export default DocumentListView;
