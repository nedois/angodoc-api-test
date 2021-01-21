import React, { useState, useEffect, useCallback } from "react";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import axios from "axios";

import useIsMountedRef from "../../../../hooks/useIsMountedRef";
import { API_BASE_URL } from "../../../../config";
import Page from "../../../../components/Page";
import Header from "../Header";
import LoadingScreen from "../../../../components/LoadingScreen";
import FinderCard from "./FinderCard";
import DocumentsCard from "./DocumentsCard";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: "100%",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    }
}));

function FinderDetailsView(props) {
    const classes = useStyles();
    const isMountedRef = useIsMountedRef();
    const [finder, setFinder] = useState(null);
    const { id } = props.match.params;

    const getFinder = useCallback(() => {
        axios
            .get(`${API_BASE_URL}/finders/${id}`, {
                params: { withDocuments: true }
            })
            .then(response => {
                if (isMountedRef.current) {
                    setFinder(response.data.data);
                }
            });
    }, [isMountedRef]);

    useEffect(() => {
        getFinder();
    }, [getFinder]);

    if (!finder) {
        return <LoadingScreen />;
    }

    return (
        <Page className={classes.root} title={`Detalhes de ${finder.full_name}`}>
            <Container>
                <Header pageTitle={`Detalhes de ${finder.full_name}`} />
                <Box mt={2}>
                    <Grid container spacing={3}>
                        <Grid item lg={4} sx={12}>
                            <FinderCard finder={finder} />
                        </Grid>
                        <Grid item lg={8} sx={12}>
                            <DocumentsCard documents={finder.documents} />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Page>
    );
}

export default FinderDetailsView;
