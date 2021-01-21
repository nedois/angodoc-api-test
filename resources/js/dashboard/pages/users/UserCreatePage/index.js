import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Page from "@dashboard/components/Page";
import Header from "@dashboard/components/Header";
import { USERS } from "@dashboard/routes/uris";
import GeneralSettings from "./GeneralSettings";
import useAuth from "@dashboard/hooks/useAuth";

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
        label: "Gestão do sistema"
    },
    {
        label: "Funcionários"
    },
    {
        label: "Registar funcionário",
        active: true
    }
];

const ProfilePageShow = ({ className }) => {
    const classes = useStyles();
    const { user: authUser } = useAuth();

    return (
        <Page className={classes.root} title="Registar funcionario">
            <Container>
                <Header
                    title="Registar funcionário"
                    breadcrumbItems={breadcrumbItems}
                    actionButtonTo={authUser.role == "diretor" && USERS.CREATE_URI}
                    actionButtonLabel="Registar funcionário"
                />
                <Grid className={clsx(classes.root, className)} container spacing={3}>
                    <GeneralSettings />
                </Grid>
            </Container>
        </Page>
    );
};

ProfilePageShow.propTypes = {
    className: PropTypes.string
};

export default ProfilePageShow;
