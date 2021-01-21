import React, { useState, useEffect, useCallback } from "react";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import axios from "axios";

import useIsMountedRef from "../../../../hooks/useIsMountedRef";
import { API_BASE_URL } from "../../../../config";
import Page from "../../../../components/Page";
import Header from "../Header";
import LoadingScreen from "../../../../components/LoadingScreen";
import UserCard from "./UserCard";
import AgencyCard from "./AgencyCard";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: "100%",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    }
}));

function CustomerDetailsView(props) {
    const classes = useStyles();
    const isMountedRef = useIsMountedRef();
    const [user, setUser] = useState(null);
    const { id } = props.match.params;

    const getUser = useCallback(() => {
        axios
            .get(`${API_BASE_URL}/users/${id}`)
            .then(response => {
                if (isMountedRef.current) {
                    setUser(response.data);
                }
            });
    }, [isMountedRef]);

    useEffect(() => {
        getUser();
    }, [getUser]);

    if (!user) {
        return <LoadingScreen />;
    }

    return (
        <Page className={classes.root} title={`Detalhes de ${user.full_name}`}>
            <Container>
                <Header pageTitle={`Detalhes de ${user.full_name}`} />
                <Box mt={2}>
                    <Grid container spacing={3}>
                        <Grid item lg={4} sx={12}>
                            <UserCard user={user} />
                        </Grid>
                        <Grid item lg={8} sx={12}>
                            <AgencyCard agency={user.agency} />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Page>
    );
}

export default CustomerDetailsView;
