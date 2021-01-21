import React, { useState, useEffect, useCallback } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import axios from "axios";

import useIsMountedRef from "../../../../hooks/useIsMountedRef";
import { API_BASE_URL } from "../../../../config";
import Page from "../../../../components/Page";
import LoadingScreen from "../../../../components/LoadingScreen";
import FinderEditForm from "./FinderEditForm";
import Header from "../Header";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: "100%",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    }
}));

function FinderEditView(props) {
    const classes = useStyles();
    const isMountedRef = useIsMountedRef();
    const [finder, setFinder] = useState(null);
    const { id } = props.match.params;

    const getFinder = useCallback(() => {
        axios.get(`${API_BASE_URL}/finders/${id}`).then(response => {
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
        <Page className={classes.root} title="Editar encontrador">
            <Container>
                <Header pageTitle={`Editar encontrador: ${finder.full_name}`} />
                <Box mt={2}>
                    <FinderEditForm finder={finder} id={id} />
                </Box>
            </Container>
        </Page>
    );
}

export default FinderEditView;
