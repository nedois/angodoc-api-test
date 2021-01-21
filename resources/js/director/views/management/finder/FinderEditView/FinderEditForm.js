import React from "react";
import PropTypes from "prop-types";
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

function FinderEditForm({ id, className, finder, ...rest }) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    return (
        <Formik
            initialValues={{
                first_name: finder.first_name || "",
                last_name: finder.last_name || "",
                age: finder.age || 18,
                job: finder.job || "Estudante",
                address: finder.address || "",
                province: finder.province || "Luanda",
                telephone: finder.telephone || "",
                bi: finder.bi || ""
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
                telephone: Yup.string().required(
                    "O número de telefone é obrigatório"
                ),
                bi: Yup.string().required("O BI é obrigatório")
            })}
            onSubmit={async (
                values,
                { resetForm, setErrors, setStatus, setSubmitting }
            ) => {
                try {
                    await axios.put(`${API_BASE_URL}/finders/${id}`, {
                        ...values
                    });
                    resetForm({ values });
                    setStatus({ success: true });
                    setSubmitting(false);
                    enqueueSnackbar("Encontrador atualizado", {
                        variant: "success"
                    });
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
                            <CardHeader title="Informações do documento" />
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
                                                touched.age && errors.age
                                            )}
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
                                            error={Boolean(
                                                touched.job && errors.job
                                            )}
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
                                            <option value="Estudante">
                                                Estudante
                                        </option>
                                            <option value="Desempregado">
                                                Desempregado
                                        </option>
                                            <option value="Trabalhador">
                                                Trabalhador
                                        </option>
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12}>
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
                                            required
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
    finder: PropTypes.object.isRequired
};

export default FinderEditForm;
