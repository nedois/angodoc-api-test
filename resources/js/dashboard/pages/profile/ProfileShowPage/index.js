import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Container, Grid, makeStyles } from "@material-ui/core";
import useAuth from "@dashboard/hooks/useAuth";
import Page from "@dashboard/components/Page";
import Header from "@dashboard/components/Header";
import ProfileDetails from "./ProfileDetails";
import GeneralSettings from "./GeneralSettings";

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
        label: "Meu perfil",
        active: true
    }
];

const ProfilePageShow = ({ className }) => {
    const classes = useStyles();
    const { user } = useAuth();

    return (
        <Page className={classes.root} title="Meu perfil">
            <Container>
                <Header title="Meu perfil" breadcrumbItems={breadcrumbItems} />
                <Grid className={clsx(classes.root, className)} container spacing={3}>
                    <Grid item lg={4} md={6} xl={3} xs={12}>
                        <ProfileDetails user={user} />
                    </Grid>
                    <Grid item lg={8} md={6} xl={9} xs={12}>
                        <GeneralSettings user={user} />
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
};

ProfilePageShow.propTypes = {
    className: PropTypes.string
};

export default ProfilePageShow;
