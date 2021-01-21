import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import * as Yup from "yup";
import { Formik } from "formik";
import { Box, Button, Grid, TextField, Typography, makeStyles } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { KeyboardDatePicker } from "@material-ui/pickers";

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

function DocumentDetails({ className, onBack, onComplete, finder, ...rest }) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    return (
        <Formik
            initialValues={{
                reference: "",
                owner: "",
                type: "",
                date_emission: new Date(),
                commentary: "",
                finder_id: finder.id
            }}
            validationSchema={Yup.object().shape({
                reference: Yup.string()
                    .max(255)
                    .required("A referência é obrigatória"),
                owner: Yup.string()
                    .max(255)
                    .required("O nome do proprietário é obrigatório"),
                type: Yup.string()
                    .max(255)
                    .required("O tipo de documento é obrigatório"),
                date_emission: Yup.date(),
                commentary: Yup.string().max(255)
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    await axios.post(`${API_OLD_URL}/documents`, {
                        ...values
                    });
                    setStatus({ success: true });
                    setSubmitting(false);
                    enqueueSnackbar("Documento criado com sucesso", {
                        variant: "success"
                    });
                    onComplete();
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
                setFieldValue,
                setFieldTouched,
                isSubmitting,
                touched,
                values
            }) => (
                <form onSubmit={handleSubmit} className={clsx(classes.root, className)} {...rest}>
                    <Typography variant="h3" color="textPrimary">
                        Insira as informações do documento
                    </Typography>
                    <Box mt={3}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    error={Boolean(touched.owner && errors.owner)}
                                    fullWidth
                                    helperText={touched.owner && errors.owner}
                                    label="Proprietário"
                                    name="owner"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    required
                                    value={values.owner}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={Boolean(touched.reference && errors.reference)}
                                    fullWidth
                                    helperText={touched.reference && errors.reference}
                                    label="Referência"
                                    name="reference"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    required
                                    value={values.reference}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item md={7} xs={12}>
                                <TextField
                                    error={Boolean(touched.type && errors.type)}
                                    fullWidth
                                    helperText={touched.type && errors.type}
                                    label="Tipo"
                                    name="type"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    required
                                    value={values.type}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item md={5} xs={12}>
                                <KeyboardDatePicker
                                    className={classes.datapicker}
                                    fullWidth
                                    label="Data de emissão"
                                    format="DD/MM/YYYY"
                                    name="date_emission"
                                    inputVariant="outlined"
                                    value={values.date_emission}
                                    onBlur={() => setFieldTouched("date_emission")}
                                    onClose={() => setFieldTouched("date_emission")}
                                    onAccept={() => setFieldTouched("date_emission")}
                                    onChange={date => setFieldValue("date_emission", date)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Encontrado por"
                                    name="finder"
                                    disabled
                                    value={finder.full_name}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={Boolean(touched.commentary && errors.commentary)}
                                    fullWidth
                                    helperText={touched.commentary && errors.commentary}
                                    label="Comentário"
                                    name="commentary"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    multiline
                                    rows={4}
                                    value={values.commentary}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                        <input name="finder_id" type="hidden" value={values.finder_id}></input>
                    </Box>
                    <Box mt={4} display="flex">
                        <Button disabled={isSubmitting} onClick={onBack} variant="contained" size="large">
                            Voltar
                        </Button>
                        <Box flexGrow={1} />
                        <Button
                            color="secondary"
                            disabled={isSubmitting}
                            type="submit"
                            variant="contained"
                            size="large"
                        >
                            Cadastrar documento
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    );
}
DocumentDetails.propTypes = {
    className: PropTypes.string,
    onNext: PropTypes.func
};

export default DocumentDetails;
