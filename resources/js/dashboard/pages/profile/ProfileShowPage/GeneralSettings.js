import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
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

import axios from "@dashboard/utils/axios";
import { reloadPage } from "@dashboard/utils/helpers";
import { PROVINCES, API_OLD_URL } from "@dashboard/constants";
import useAuth from "@dashboard/hooks/useAuth";

const useStyles = makeStyles(() => ({
    root: {}
}));

const GeneralSettings = ({ className, user, ...rest }) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const {user: authUser} = useAuth();
    
    return (
        <Formik
            enableReinitialize
            initialValues={{
                active: user.active || false,
                address: user.address || "",
                bi: user.bi || "",
                email: user.email || "",
                first_name: user.first_name || "",
                last_name: user.last_name || "",
                phone_number: user.phone_number || "",
                province: user.province || "Luanda",
                password: null,
                password_confirmation: null,
                submit: null
            }}
            validationSchema={Yup.object().shape({
                active: Yup.bool(),
                address: Yup.string()
                    .min(6, "6 letras no minimo")
                    .max(255, "255 letras no máximo"),
                bi: Yup.string()
                    .min(6, "6 letras no minimo")
                    .max(255, "255 letras no máximo")
                    .required("O bi é obrigatório"),
                first_name: Yup.string()
                    .min(2, "2 letras no minimo")
                    .max(255, "255 letras no máximo")
                    .required("O nome é obrigatório"),
                last_name: Yup.string()
                    .min(2, "2 letras no minimo")
                    .max(255, "255 letras no máximo")
                    .required("O sobrenome é obrigatório"),
                phone_number: Yup.string()
                    .min(2, "2 números no minimo")
                    .max(255, "255 números no máximo"),
                province: Yup.string().oneOf(PROVINCES),
                password: Yup.string().min(3, "3 números no minimo").nullable(),
                password_confirmation: Yup.string()
                    .min(3, "3 números no minimo")
                    .oneOf([Yup.ref("password"), null], "As senhas devem ser identicas").nullable()
            })}
            onSubmit={async (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
                await axios
                    .put(`${API_OLD_URL}/users/${user.id}`, values)
                    .then(response => {
                        resetForm();
                        setStatus({ success: true });
                        setSubmitting(false);
                        enqueueSnackbar("Perfil actualizado", {
                            variant: "success"
                        });
                        reloadPage();
                    })
                    .catch(error => {
                        setStatus({ success: false });
                        setErrors({ submit: error.message });
                        setSubmitting(false);
                        enqueueSnackbar(error.message, {
                            variant: "error"
                        });
                    });
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form onSubmit={handleSubmit}>
                    <Card className={clsx(classes.root, className)} {...rest}>
                        <CardHeader title="Meu Perfil" />
                        <Divider />
                        <CardContent>
                            <Grid container spacing={4}>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        error={Boolean(touched.first_name && errors.first_name)}
                                        fullWidth
                                        helperText={touched.first_name && errors.first_name}
                                        label="Nome"
                                        name="first_name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.first_name}
                                        variant="outlined"
                                        required
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        error={Boolean(touched.last_name && errors.last_name)}
                                        fullWidth
                                        helperText={touched.last_name && errors.last_name}
                                        label="Sobrenome"
                                        name="last_name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.last_name}
                                        variant="outlined"
                                        required
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        error={Boolean(touched.email && errors.email)}
                                        fullWidth
                                        helperText={"Vamos usar esse e-mail para entrar em contacto contigo"}
                                        label="E-mail"
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        required
                                        disabled
                                        type="email"
                                        value={values.email}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        error={Boolean(touched.bi && errors.bi)}
                                        fullWidth
                                        helperText={"Contacte o director da agência para alterar o BI"}
                                        label="N° BI"
                                        name="bi"
                                        disabled={user.role === "operador" ? true : false}
                                        required
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.bi}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={Boolean(touched.address && errors.address)}
                                        fullWidth
                                        helperText={touched.address && errors.address}
                                        label="Endereço"
                                        name="address"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.address}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        error={Boolean(touched.phone_number && errors.phone_number)}
                                        fullWidth
                                        helperText={touched.phone_number && errors.phone_number}
                                        label="Telefone"
                                        name="phone_number"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.phone_number}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <Autocomplete
                                        options={PROVINCES}
                                        defaultValue={values.province}
                                        required
                                        onChange={(e, v) => (values.province = v)}
                                        name="province"
                                        renderInput={params => (
                                            <TextField fullWidth label="Província" variant="outlined" {...params} />
                                        )}
                                    />
                                </Grid>
                                {authUser.id === user.id && (
                                    <>
                                        <Grid item md={6} xs={12}>
                                            <TextField
                                                error={Boolean(touched.password && errors.password)}
                                                fullWidth
                                                type="password"
                                                helperText={touched.password && errors.password}
                                                label="Senha"
                                                name="password"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.password}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <TextField
                                                error={Boolean(
                                                    touched.password_confirmation && errors.password_confirmation
                                                )}
                                                fullWidth
                                                type="password"
                                                helperText={
                                                    touched.password_confirmation && errors.password_confirmation
                                                }
                                                label="Confirmar senha"
                                                name="password_confirmation"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.password_confirmation}
                                                variant="outlined"
                                            />
                                        </Grid>
                                    </>
                                )}
                                <Grid item md={6} xs={12}>
                                    <Typography variant="h6" color="textPrimary">
                                        Activar conta
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Ao activar a conta o funcionário tera acesso a area administrativa
                                    </Typography>
                                    <Switch
                                        checked={values.active}
                                        edge="start"
                                        name="active"
                                        onChange={handleChange}
                                        disabled={
                                            user.role === "administrador" || user.role === "diretor" ? false : true
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <Divider />
                        <Box p={2} display="flex" justifyContent="flex-end">
                            <Button color="secondary" disabled={isSubmitting} type="submit" variant="contained">
                                Salvar alterações
                            </Button>
                        </Box>
                    </Card>
                </form>
            )}
        </Formik>
    );
};

GeneralSettings.propTypes = {
    className: PropTypes.string,
    user: PropTypes.object.isRequired
};

export default GeneralSettings;
