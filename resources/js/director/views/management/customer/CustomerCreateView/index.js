import React from "react";
import { useSelector } from "react-redux";
import { Box, Container, makeStyles } from "@material-ui/core";

import Page from "../../../../components/Page";
import CustomerCreateForm from "./CustomerCreateForm";
import Header from "../Header";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: "100%",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    }
}));

function CustomerCreateView(props) {
    const classes = useStyles();
    const { user } = useSelector(state => state.account);

    return (
        <Page className={classes.root} title="Cadastrar funcionário">
            <Container>
                <Header pageTitle="Cadastrar" />
                <Box mt={2}>
                    <CustomerCreateForm agency={user.agency} />
                </Box>
            </Container>
        </Page>
    );
}

export default CustomerCreateView;
