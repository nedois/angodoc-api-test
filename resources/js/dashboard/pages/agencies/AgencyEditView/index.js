import React, { useState, useEffect, useCallback } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import axios from "axios";

import useIsMountedRef from "@dashboard/hooks/useIsMountedRef";
import { API_URL } from "@dashboard/config";
import Page from "@dashboard/components/Page";
import LoadingScreen from "@dashboard/components/LoadingScreen";
import AgencyEditForm from "./AgencyEditForm";
// import Header from "../Header";

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
        label: "Agências"
    },
    {
        label: "Editar agência",
        active: true
    }
];

function AgencyEditView(props) {
    const classes = useStyles();
    const isMountedRef = useIsMountedRef();
    const [agency, setAgency] = useState(null);
    const { id } = props.match.params;

    const getAgency = useCallback(() => {
        axios.get(`${API_URL}/agencies/${id}`).then(response => {
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
        <Page className={classes.root} title={`Editar agência ${agency.attributes.name}`}>
            <Container>
                <Header title={`Editar agência ${agency.attributes.name}`} breadcrumbItems={breadcrumbItems} />
                <Box mt={2}>
                    <AgencyEditForm agency={agency} />
                </Box>
            </Container>
        </Page>
    );
}

export default AgencyEditView;
