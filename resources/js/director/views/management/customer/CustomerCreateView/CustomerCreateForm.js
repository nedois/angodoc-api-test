import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import clsx from "clsx";
import * as Yup from "yup";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    TextField,
    CardHeader,
    Divider,
    makeStyles
} from "@material-ui/core";

import { API_BASE_URL, APP_URL } from "../../../../config";

const useStyles = makeStyles(() => ({
    root: {},
    datapicker: {
        width: "100%"
    }
}));

const provincias = [
    "Bengo",
    "Benguela",
    "Bié",
    "Cabinda",
    "Cuando-Cubango",
    "Cuanza Norte",
    "Cuanza Sul",
    "Cunene",
    "Huambo",
    "Huíla",
    "Luanda",
    "Lunda Norte",
    "Lunda Sul",
    "Malanje",
    "Moxico",
    "Namibe",
    "Uíge",
    "Zaire"
];

function CustomerCreateForm({ id, className, agency, history, ...rest }) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    return (
        <Formik
            initialValues={{
                first_name: "",
                last_name: "",
                address: "",
                email: "",
                province: "Luanda",
                telephone: "",
                bi: "",
                agency_id: agency.id,
                password: "",
                password_confirmation: ""
            }}
            validationSchema={Yup.object().shape({
                first_name: Yup.string()
                    .max(255)
                    .required("O nome é obrigatório"),
                last_name: Yup.string()
                    .max(255)
                    .required("O sobrenome é obrigatório"),
                telephone: Yup.string().required(
                    "O número de telefone é obrigatório"
                ),
                email: Yup.string().required("O email é obrigatório"),
                bi: Yup.string().required("O BI é obrigatório"),
                password: Yup.string().required("A senha é obrigatória"),
                password_confirmation: Yup.string().oneOf(
                    [Yup.ref("password"), null],
                    "As senhas devem ser identicas"
                )
            })}
            onSubmit={async (
                values,
                { resetForm, setErrors, setStatus, setSubmitting }
            ) => {
                try {
                    await axios.post(`${API_BASE_URL}/users`, {
                        ...values
                    });
                    resetForm({ values });
                    setStatus({ success: true });
                    setSubmitting(false);
                    enqueueSnackbar("Funcionário cadastrado", {
                        variant: "success"
                    });
                    history.push(`${APP_URL}/gestao-do-sistema/funcionarios`)
                } catch (error) {
                    setStatus({ success: false });
                    setErrors({ submit: error.message });
                    setSubmitting(false);
                    enqueueSnackbar(error.message, {
                        variant: "error"
                    });
                }
            }}
        >
            {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values
            }) => (
                <form
                    className={clsx(classes.root, className)}
                    onSubmit={handleSubmit}
                    {...rest}
                >
                    <Card>
                        <CardHeader title="Informações do funcionário" />
                        <Divider />
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        error={Boolean(
                                            touched.first_name &&
                                                errors.first_name
                                        )}
                                        fullWidth
                                        helperText={
                                            touched.first_name &&
                                            errors.first_name
                                        }
                                        label="Nome"
                                        name="first_name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        required
                                        value={values.first_name}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        error={Boolean(
                                            touched.last_name &&
                                                errors.last_name
                                        )}
                                        fullWidth
                                        helperText={
                                            touched.last_name &&
                                            errors.last_name
                                        }
                                        label="Sobrenome"
                                        name="last_name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        required
                                        value={values.last_name}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        error={Boolean(
                                            touched.email && errors.email
                                        )}
                                        fullWidth
                                        helperText={
                                            touched.email && errors.email
                                        }
                                        label="E-mail"
                                        name="email"
                                        type="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        required
                                        value={values.email}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        error={Boolean(touched.bi && errors.bi)}
                                        fullWidth
                                        helperText={touched.bi && errors.bi}
                                        label="N° BI"
                                        name="bi"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        required
                                        value={values.bi}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        error={Boolean(touched.password && errors.password)}
                                        fullWidth
                                        helperText={touched.password && errors.password}
                                        label="Senha"
                                        name="password"
                                        type="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        required
                                        value={values.password}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        error={Boolean(touched.password_confirmation && errors.password_confirmation)}
                                        fullWidth
                                        helperText={touched.password_confirmation && errors.password_confirmation}
                                        label="Confirmar senha"
                                        name="password_confirmation"
                                        type="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        required
                                        value={values.password_confirmation}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        error={Boolean(
                                            touched.telephone &&
                                                errors.telephone
                                        )}
                                        fullWidth
                                        helperText={
                                            touched.telephone &&
                                            errors.telephone
                                        }
                                        label="N° telefone"
                                        name="telephone"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        required
                                        value={values.telephone}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        label="Província"
                                        name="province"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        required
                                        select
                                        variant="outlined"
                                        fullWidth
                                        SelectProps={{ native: true }}
                                        value={values.province}
                                    >
                                        {provincias.map(option => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={Boolean(
                                            touched.address && errors.address
                                        )}
                                        fullWidth
                                        helperText={
                                            touched.address && errors.address
                                        }
                                        label="Endereço"
                                        name="address"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.address}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                            <Box mt={2}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    Cadastrar funcionário
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </form>
            )}
        </Formik>
    );
}

CustomerCreateForm.propTypes = {
    className: PropTypes.string
};

export default withRouter(CustomerCreateForm);
