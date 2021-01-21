import React from "react";
import { Box, Container, makeStyles } from "@material-ui/core";

import Page from "@dashboard/components/Page";
import useAuth from "@dashboard/hooks/useAuth";
import MyAgencyEditForm from "./MyAgencyEditForm";
import Header from "@dashboard/components/Header";

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
        label: "Editar a minha agência",
        active: true
    }
];

function AgencyEditView() {
    const classes = useStyles();
    const { user } = useAuth();

    return (
        <Page className={classes.root} title="Editar agência">
            <Container>
                <Header title="Editar a minha agência" breadcrumbItems={breadcrumbItems} />
                <Box mt={2}>
                    <MyAgencyEditForm agency={user.agency} />
                </Box>
            </Container>
        </Page>
    );
}

export default AgencyEditView;
