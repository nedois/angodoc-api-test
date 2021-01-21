import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import * as Yup from "yup";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { Box, Button, Card, CardContent, Grid, TextField, CardHeader, Divider, makeStyles } from "@material-ui/core";

import { API_OLD_URL } from "@dashboard/constants";
import axios from "@dashboard/utils/axios";
import { reloadPage } from "@dashboard/utils/helpers";

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

function MyAgencyEditForm({ className, agency, ...rest }) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    return (
        <Formik
            initialValues={{
                name: agency.name || "",
                address: agency.address || "",
                province: agency.province || "Luanda"
            }}
            validationSchema={Yup.object().shape({
                name: Yup.string()
                    .max(255)
                    .required("O nome é obrigatório"),
                address: Yup.string().required("O endereço é obrigatório")
            })}
            onSubmit={async (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
                try {
                    await axios.put(`${API_OLD_URL}/agencies/${agency.id}`, {
                        ...values
                    });
                    resetForm({ values });
                    setStatus({ success: true });
                    setSubmitting(false);
                    enqueueSnackbar("Agência atualizada", {
                        variant: "success"
                    });
                    reloadPage();
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
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form className={clsx(classes.root, className)} onSubmit={handleSubmit} {...rest}>
                    <Card>
                        <CardHeader title="Informações da agência" />
                        <Divider />
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        error={Boolean(touched.name && errors.name)}
                                        fullWidth
                                        helperText={touched.name && errors.name}
                                        label="Nome"
                                        name="name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        required
                                        value={values.name}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        fullWidth
                                        label="Director"
                                        value={agency.director.full_name}
                                        variant="outlined"
                                        disabled
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
                                        error={Boolean(touched.address && errors.address)}
                                        fullWidth
                                        helperText={touched.address && errors.address}
                                        label="Endereço"
                                        name="address"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        required
                                        value={values.address}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                            <Box mt={2}>
                                <Button variant="contained" color="secondary" type="submit" disabled={isSubmitting}>
                                    Actualizar agência
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </form>
            )}
        </Formik>
    );
}

MyAgencyEditForm.propTypes = {
    className: PropTypes.string,
    agency: PropTypes.object.isRequired
};

export default MyAgencyEditForm;
