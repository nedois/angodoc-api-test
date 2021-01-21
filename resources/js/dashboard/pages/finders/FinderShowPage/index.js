import React, { useState, useEffect, useCallback } from "react";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";

import useIsMountedRef from "@dashboard/hooks/useIsMountedRef";
import { API_URL } from "@dashboard/constants";
import { FINDERS, ERRORS } from "@dashboard/routes/uris";
import Page from "@dashboard/components/Page";
import Header from "@dashboard/components/Header";
import LoadingScreen from "@dashboard/components/LoadingScreen";
import DocumentsCard from "@dashboard/components/DocumentsCard";
import FinderCard from "./FinderCard";

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
        label: "Detalhes do encontrador",
        active: true
    }
];

function FinderShowPage(props) {
    const classes = useStyles();
    const isMountedRef = useIsMountedRef();
    const [finder, setFinder] = useState(null);
    const history = useHistory();
    const { id } = props.match.params;

    const getFinder = useCallback(() => {
        axios
            .get(`${API_URL}/finders/${id}?include=creator,documents,agency`)
            .then(response => {
                if (isMountedRef.current) {
                    setFinder(response.data);
                }
            })
            .catch(({ response }) => {
                if (response.status === 404) {
                    history.push(ERRORS.NOT_FOUND_URI);
                }
            });
    }, [isMountedRef]);

    useEffect(() => {
        getFinder();
    }, [getFinder]);

    if (!finder) {
        return <LoadingScreen />;
    }
    console.log(finder);
    return (
        <Page
            className={classes.root}
            title={`Detalhes de ${finder.data.attributes.first_name} ${finder.data.attributes.last_name}`}
        >
            <Container>
                <Header
                    title={`Detalhes de ${finder.data.attributes.first_name} ${finder.data.attributes.last_name}`}
                    breadcrumbItems={breadcrumbItems}
                />
                <Box mt={2}>
                    <Grid container spacing={3}>
                        <Grid item lg={4} sx={12}>
                            <FinderCard finder={finder} />
                        </Grid>
                        <Grid item lg={8} sx={12}>
                            <DocumentsCard documents={finder.included} />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Page>
    );
}

export default FinderShowPage;
