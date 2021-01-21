import React from "react";
import PropTypes from "prop-types";
import { Box, Container, makeStyles } from "@material-ui/core";
import Page from "@dashboard/components/Page";
import Header from "@dashboard/components/Header";
import AdminOverview from "@dashboard/components/AdminOverview";

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
        label: "Geral"
    },
    {
        label: "Visão geral",
        active: true
    }
];

const AdminOverviewPage = ({ user }) => {
    const classes = useStyles();

    return (
        <Page className={classes.root} title="Visão geral">
            <Container>
                <Header
                    title={`Bem-vind${user.gender === "M" ? "o" : "a"} de volta ${user.first_name}`}
                    breadcrumbItems={breadcrumbItems}
                >
                    <Box mt={3}>
                        <AdminOverview />
                    </Box>
                </Header>
            </Container>
        </Page>
    );
};

AdminOverviewPage.propTypes = {
    user: PropTypes.object.isRequired
};

export default AdminOverviewPage;
