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

function FinderListView() {
    const classes = useStyles();
    const isMountedRef = useIsMountedRef();
    const [finders, setFinders] = useState(null);

    const getFinders = useCallback(() => {
        axios.get(API_BASE_URL + '/finders').then(response => {
            if (isMountedRef.current) {
                setFinders(response.data.data);
            }
        });
    }, [isMountedRef]);

    useEffect(() => {
        getFinders();
    }, [getFinders]);

    if (!finders) {
        return null;
    }

    return (
        <Page className={classes.root} title="Lista dos encontradores">
            <Container>
                <Header />
                {finders && (
                    <Box mt={3}>
                        <Results finders={finders} />
                    </Box>
                )}
            </Container>
        </Page>
    );
}

export default FinderListView;
