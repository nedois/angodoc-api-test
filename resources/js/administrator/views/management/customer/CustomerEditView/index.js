import React, { useState, useEffect, useCallback } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import axios from "axios";

import useIsMountedRef from "../../../../hooks/useIsMountedRef";
import { API_BASE_URL } from "../../../../config";
import Page from "../../../../components/Page";
import LoadingScreen from "../../../../components/LoadingScreen";
import CustomerEditForm from "./CustomerEditForm";
import Header from "../Header";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: "100%",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    }
}));

function CustomerEditView(props) {
    const classes = useStyles();
    const isMountedRef = useIsMountedRef();
    const [customer, setCustomer] = useState(null);
    const { id } = props.match.params;

    const getCustomer = useCallback(() => {
        axios.get(`${API_BASE_URL}/users/${id}`).then(response => {
            if (isMountedRef.current) {
                setCustomer(response.data);
            }
        });
    }, [isMountedRef]);

    useEffect(() => {
        getCustomer();
    }, [getCustomer]);

    if (!customer) {
        return <LoadingScreen />;
    }

    return (
        <Page className={classes.root} title="Editar funcionário">
            <Container>
                <Header
                    pageTitle={`Editar funcionário: ${customer.full_name}`}
                />
                <Box mt={2}>
                    <CustomerEditForm customer={customer} id={id} />
                </Box>
            </Container>
        </Page>
    );
}

export default CustomerEditView;
