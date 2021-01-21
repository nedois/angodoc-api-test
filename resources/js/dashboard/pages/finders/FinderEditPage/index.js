import React, { useState, useEffect, useCallback } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";

import axios from "@dashboard/utils/axios";
import useIsMountedRef from "@dashboard/hooks/useIsMountedRef";
import { API_URL } from "@dashboard/constants";
import Header from "@dashboard/components/Header";
import Page from "@dashboard/components/Page";
import { FINDERS } from "@dashboard/routes/uris";
import LoadingScreen from "@dashboard/components/LoadingScreen";
import FinderEditForm from "./FinderEditForm";

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
        label: "Encontradores",
        to: FINDERS.URI
    },
    {
        label: "Editar encontrador",
        active: true
    }
];

function FinderEditPage({ match }) {
    const classes = useStyles();
    const isMountedRef = useIsMountedRef();
    const [finder, setFinder] = useState(null);
    const { id } = match.params;

    const getFinder = useCallback(() => {
        axios.get(`${API_URL}/finders/${id}`).then(response => {
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
        <Page className={classes.root} title={`Editar encontrador ${finder.attributes.first_name}`}>
            <Container>
                <Header
                    title={`Editar encontrador ${finder.attributes.first_name}`}
                    breadcrumbItems={breadcrumbItems}
                />
                <Box mt={2}>
                    <FinderEditForm finder={finder} id={id} />
                </Box>
            </Container>
        </Page>
    );
}

export default FinderEditPage;
