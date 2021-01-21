import React, { useEffect, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Page from "@dashboard/components/Page";
import Header from "@dashboard/components/Header";
import LoadingScreen from "@dashboard/components/LoadingScreen";
import { USERS } from "@dashboard/routes/uris";
import { API_URL } from "@dashboard/constants";
import axios from "@dashboard/utils/axios";
import ProfileDetails from "./ProfileDetails";
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
        label: "Editar funcionário",
        active: true
    }
];

const ProfilePageShow = ({ className, match }) => {
    const classes = useStyles();
    const { id } = match.params;
    const [user, setUser] = useState(null);
    const { user: authUser } = useAuth();

    useEffect(() => {
        axios.get(`${API_URL}/users/${id}`).then(response => setUser(response.data.data));
    }, []);

    if (!user) {
        return <LoadingScreen />;
    }

    return (
        <Page className={classes.root} title="Editar perfil do funcionario">
            <Container>
                <Header
                    title="Funcionários da agência"
                    breadcrumbItems={breadcrumbItems}
                    actionButtonTo={authUser.role == "diretor" && USERS.CREATE_URI}
                    actionButtonLabel="Registar funcionário"
                />
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
