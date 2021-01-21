import React, { useState, useEffect, useCallback } from "react";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import axios from "axios";

import useIsMountedRef from "../../../../hooks/useIsMountedRef";
import { API_BASE_URL } from "../../../../config";
import Page from "../../../../components/Page";
import LoadingScreen from "../../../../components/LoadingScreen";
import DocumentEditForm from "./DocumentEditForm";
import Header from "../Header";
import FinderCard from "../FinderCard";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: "100%",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    }
}));

function DocumentEditView(props) {
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
        <Page className={classes.root} title="Editar documento">
            <Container>
                <Header pageTitle={`Editar documento ${document.reference}`} />
                <Box mt={2}>
                    <Grid container spacing={3}>
                        <Grid item lg={8} sx={12}>
                            <DocumentEditForm document={document} id={id} />
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

export default DocumentEditView;
