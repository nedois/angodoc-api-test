import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import * as Yup from "yup";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { Box, Button, Card, CardContent, Grid, TextField, CardHeader, Divider, makeStyles } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import axios from "@dashboard/utils/axios";
import { API_OLD_URL, PROVINCES } from "@dashboard/constants";
import { FINDERS } from "@dashboard/routes/uris";

const useStyles = makeStyles(() => ({
    root: {},
    datapicker: {
        width: "100%"
    }
}));

function FinderEditForm({ id, className, finder, ...rest }) {
    const classes = useStyles();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    return (
        <Formik
            initialValues={{
                first_name: finder.attributes.first_name || "",
                last_name: finder.attributes.last_name || "",
                age: finder.attributes.age || 18,
                job: finder.attributes.job || "estudante",
                gender: finder.attributes.gender || "M",
                address: finder.attributes.address || "",
                province: finder.attributes.province || "Luanda",
                phone_number: finder.attributes.phone_number || "",
                bi: finder.attributes.bi || ""
            }}
            validationSchema={Yup.object().shape({
                first_name: Yup.string()
                    .max(255)
                    .required("O nome é obrigatório"),
                last_name: Yup.string()
                    .max(255)
                    .required("O sobrenome é obrigatório"),
                age: Yup.number()
                    .min(16, "A idade minima é de 16")
                    .max(100, "A idade minima é de 100"),
                address: Yup.string().required("O endereço é obrigatório"),
                phone_number: Yup.string().required("O número de telefone é obrigatório"),
                bi: Yup.string().required("O BI é obrigatório")
            })}
            onSubmit={async (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
                await axios
                    .put(`${API_OLD_URL}/finders/${id}`, values)
                    .then(resp => {
                        resetForm({ values });
                        setStatus({ success: true });
                        setSubmitting(false);
                        enqueueSnackbar("Encontrador atualizado", {
                            variant: "success"
                        });
                        history.push(`${FINDERS.URI}/${id}`);
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
                <form className={clsx(classes.root, className)} onSubmit={handleSubmit} {...rest}>
                    <Card>
                        <CardHeader title="Informações do encontrador" />
                        <Divider />
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        error={Boolean(touched.first_name && errors.first_name)}
                                        fullWidth
                                        helperText={touched.first_name && errors.first_name}
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
                                        error={Boolean(touched.last_name && errors.last_name)}
                                        fullWidth
                                        helperText={touched.last_name && errors.last_name}
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
                                        error={Boolean(touched.age && errors.age)}
                                        fullWidth
                                        helperText={touched.age && errors.age}
                                        label="Idade"
                                        name="age"
                                        type="number"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        required
                                        value={values.age}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        error={Boolean(touched.gender && errors.gender)}
                                        fullWidth
                                        helperText={touched.gender && errors.gender}
                                        label="Sexo"
                                        name="gender"
                                        select
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        SelectProps={{ native: true }}
                                        required
                                        value={values.gender}
                                        variant="outlined"
                                    >
                                        <option value="M">Masculino</option>
                                        <option value="F">Feminino</option>
                                    </TextField>
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
                                        error={Boolean(touched.job && errors.job)}
                                        fullWidth
                                        helperText={touched.job && errors.job}
                                        label="Ocupação"
                                        name="job"
                                        select
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        SelectProps={{ native: true }}
                                        required
                                        value={values.job}
                                        variant="outlined"
                                    >
                                        <option value="estudante">Estudante</option>
                                        <option value="desempregado">Desempregado</option>
                                        <option value="trabalhador">Trabalhador</option>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        error={Boolean(touched.phone_number && errors.phone_number)}
                                        fullWidth
                                        helperText={touched.phone_number && errors.phone_number}
                                        label="N° telefone"
                                        name="phone_number"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        required
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
                            </Grid>
                            <Box mt={2}>
                                <Button variant="contained" color="secondary" type="submit" disabled={isSubmitting}>
                                    Actualizar encontrador
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </form>
            )}
        </Formik>
    );
}

FinderEditForm.propTypes = {
    className: PropTypes.string,
    finder: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired
};

export default FinderEditForm;
