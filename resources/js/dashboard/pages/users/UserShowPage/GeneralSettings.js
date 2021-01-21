import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Formik } from "formik";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
    Typography,
    Switch,
    makeStyles
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Link as RouterLink } from "react-router-dom";
import { PROVINCES } from "@dashboard/constants";
import useAuth from "@dashboard/hooks/useAuth";
import { USERS } from "@dashboard/routes/uris";

const useStyles = makeStyles(() => ({
    root: {}
}));

const GeneralSettings = ({ className, user, ...rest }) => {
    const classes = useStyles();
    const { user: authUser } = useAuth();

    return (
        <Formik
            enableReinitialize
            initialValues={{
                active: user.attributes.active || false,
                address: user.attributes.address || "",
                bi: user.attributes.bi || "",
                email: user.attributes.email || "",
                first_name: user.attributes.first_name || "",
                last_name: user.attributes.last_name || "",
                phone_number: user.attributes.phone_number || "",
                province: user.attributes.province || "Luanda"
            }}
        >
            {({ values }) => (
                <form>
                    <Card className={clsx(classes.root, className)} {...rest}>
                        <CardHeader title="Perfil do funcionário" />
                        <Divider />
                        <CardContent>
                            <Grid container spacing={4}>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Nome"
                                        name="first_name"
                                        value={values.first_name}
                                        variant="outlined"
                                        disabled
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Sobrenome"
                                        name="last_name"
                                        value={values.last_name}
                                        variant="outlined"
                                        disabled
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="E-mail"
                                        name="email"
                                        disabled
                                        type="email"
                                        value={values.email}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="N° BI"
                                        name="bi"
                                        disabled
                                        value={values.bi}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Endereço"
                                        name="address"
                                        value={values.address}
                                        variant="outlined"
                                        disabled
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Telefone"
                                        name="phone_number"
                                        value={values.phone_number}
                                        variant="outlined"
                                        disabled
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <Autocomplete
                                        options={PROVINCES}
                                        defaultValue={values.province}
                                        disabled
                                        onChange={(e, v) => (values.province = v)}
                                        name="province"
                                        renderInput={params => (
                                            <TextField fullWidth label="Província" variant="outlined" {...params} />
                                        )}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <Typography variant="h6" color="textPrimary">
                                        Activar conta
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Ao activar a conta o funcionário tera acesso a area administrativa
                                    </Typography>
                                    <Switch checked={values.active} edge="start" name="active" disabled />
                                </Grid>
                            </Grid>
                        </CardContent>
                        {authUser.role === "administrador" || authUser.role === "diretor" ? (
                            <>
                                <Divider />
                                <Box p={2} display="flex" justifyContent="flex-end">
                                    <Button
                                        color="secondary"
                                        variant="contained"
                                        component={RouterLink}
                                        to={`${USERS.URI}/${user.id}/editar`}
                                    >
                                        Editar funcionário
                                    </Button>
                                </Box>
                            </>
                        ) : null}
                    </Card>
                </form>
            )}
        </Formik>
    );
};

GeneralSettings.propTypes = {
    className: PropTypes.string
};

export default GeneralSettings;
