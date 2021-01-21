import React, { useState, useEffect, useCallback } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import axios from "axios";
import Page from "../../../../components/Page";
import useIsMountedRef from "../../../../hooks/useIsMountedRef";
import Header from "./Header";
import Results from "./Results";
import { API_BASE_URL } from "../../../../config";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: "100%",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    }
}));

function CustomerListView() {
    const classes = useStyles();
    const isMountedRef = useIsMountedRef();
    const [customers, setCustomers] = useState(null);

    const getCustomers = useCallback(() => {
        axios.get(API_BASE_URL + "/users").then(response => {
            if (isMountedRef.current) {
                setCustomers(response.data.data);
            }
        });
    }, [isMountedRef]);

    useEffect(() => {
        getCustomers();
    }, [getCustomers]);

    if (!customers) {
        return null;
    }

    return (
        <Page className={classes.root} title="Lista dos funcionários">
            <Container>
                <Header />
                {customers && (
                    <Box mt={3}>
                        <Results customers={customers} />
                    </Box>
                )}
            </Container>
        </Page>
    );
}

export default CustomerListView;
