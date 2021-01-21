import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import * as Yup from "yup";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { Box, Button, Grid, TextField, Typography, makeStyles } from "@material-ui/core";
import { API_OLD_URL } from "@dashboard/constants";
import axios from "@dashboard/utils/axios";

const useStyles = makeStyles(theme => ({
    root: {},
    addTab: {
        marginLeft: theme.spacing(2)
    },
    tag: {
        "& + &": {
            marginLeft: theme.spacing(1)
        }
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

function NewFinderForm({ className, onNext, finder, setFinder, setNewFinder, ...rest }) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    return (
        <Formik
            initialValues={{
                first_name: "",
                last_name: "",
                bi: "",
                age: 18,
                gender: "M",
                job: "estudante",
                address: "",
                province: "Luanda",
                phone_number: ""
            }}
            l
            validationSchema={Yup.object().shape({
                first_name: Yup.string()
                    .required("O nome é obrigatório")
                    .max(255),
                last_name: Yup.string()
                    .required("O sobrenome é obrigatório")
                    .max(255),
                bi: Yup.string()
                    .required("O n° BI é obrigatório")
                    .max(255),
                age: Yup.number()
                    .max(100)
                    .min(16),
                address: Yup.string().required("O endereço é obrigatório"),
                phone_number: Yup.string().required("O n° de telefone é obrigatório")
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    await axios.post(`${API_OLD_URL}/finders`, {
                        ...values
                    }).then(response => setFinder(response.data.data));
                    setStatus({ success: true });
                    setSubmitting(false);
                    enqueueSnackbar("Encontrador cadastrado com sucesso", {
                        variant: "success"
                    });

                    if (onNext) {
                        onNext();
                    }
                } catch (error) {
                    setErrors({ submit: error.message });
                    setStatus({ success: false });
                    setSubmitting(false);
                    enqueueSnackbar(error.message, {
                        variant: "error"
                    });
                }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form onSubmit={handleSubmit} className={clsx(classes.root, className)} {...rest}>
                    <Typography variant="h3" color="textPrimary">
                        Escolha um encontrador
                    </Typography>
                    <Box mt={2}>
                        <Typography variant="subtitle1" color="textSecondary">
                            Utilize a barra de pesquisa em baixo ou adicione um novo a partir do botão +
                        </Typography>
                    </Box>
                    <Box mt={3}>
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
                                    min={16}
                                    max={100}
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
                    </Box>
                    <Box mt={6} display="flex">
                        <Button
                            onClick={() => {
                                setNewFinder(false);
                                setFinder({});
                            }}
                            size="large"
                        >
                            Cancelar
                        </Button>
                        <Box flexGrow={1} />
                        <Button
                            color="secondary"
                            disabled={isSubmitting}
                            type="submit"
                            variant="contained"
                            size="large"
                        >
                            Próximo
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    );
}
NewFinderForm.propTypes = {
    className: PropTypes.string,
    onNext: PropTypes.func
};

export default NewFinderForm;
