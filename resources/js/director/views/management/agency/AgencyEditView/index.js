import React, { useState, useEffect, useCallback } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import axios from "axios";

import useIsMountedRef from "../../../../hooks/useIsMountedRef";
import { API_BASE_URL } from "../../../../config";
import Page from "../../../../components/Page";
import LoadingScreen from "../../../../components/LoadingScreen";
import AgencyEditForm from "./AgencyEditForm";
import Header from "../Header";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: "100%",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    }
}));

function AgencyEditView(props) {
    const classes = useStyles();
    const isMountedRef = useIsMountedRef();
    const [agency, setAgency] = useState(null);
    const { id } = props.match.params;

    const getAgency = useCallback(() => {
        axios.get(`${API_BASE_URL}/agencies/${id}`).then(response => {
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
        <Page className={classes.root} title="Editar agência">
            <Container>
                <Header
                    pageTitle={`Editar agência: ${agency.name}`}
                />
                <Box mt={2}>
                    <AgencyEditForm agency={agency} id={id} />
                </Box>
            </Container>
        </Page>
    );
}

export default AgencyEditView;
