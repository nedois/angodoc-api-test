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
import { KeyboardDatePicker } from "@material-ui/pickers";

import { API_BASE_URL } from "../../../../config";

const useStyles = makeStyles(() => ({
    root: {},
    datapicker: {
        width: "100%"
    }
}));

function DocumentEditForm({ id, className, document, ...rest }) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    return (
        <Formik
            initialValues={{
                reference: document.reference || "",
                owner: document.owner || "",
                type: document.type || "",
                date_emission: document.date_emission || "",
                commentary: document.commentary || ""
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
            onSubmit={async (
                values,
                { resetForm, setErrors, setStatus, setSubmitting }
            ) => {
                try {
                    await axios.put(`${API_BASE_URL}/documents/${id}`, {
                        ...values
                    });
                    resetForm({ values });
                    setStatus({ success: true });
                    setSubmitting(false);
                    enqueueSnackbar("Documento atualizado", {
                        variant: "success",
                        action: <Button>Ver documento</Button>
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
                setFieldValue,
                setFieldTouched,
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
                                <Grid item xs={12}>
                                    <TextField
                                        error={Boolean(
                                            touched.owner && errors.owner
                                        )}
                                        fullWidth
                                        helperText={
                                            touched.owner && errors.owner
                                        }
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
                                        error={Boolean(
                                            touched.reference &&
                                                errors.reference
                                        )}
                                        fullWidth
                                        helperText={
                                            touched.reference &&
                                            errors.reference
                                        }
                                        label="Referência"
                                        name="reference"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        required
                                        value={values.reference}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={9} xs={12}>
                                    <TextField
                                        error={Boolean(
                                            touched.type && errors.type
                                        )}
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
                                <Grid item md={3} xs={12}>
                                    <KeyboardDatePicker
                                        className={classes.datapicker}
                                        label="Data de emissão"
                                        format="DD/MM/YYYY"
                                        name="date_emission"
                                        inputVariant="outlined"
                                        value={values.date_emission}
                                        onBlur={() =>
                                            setFieldTouched("date_emission")
                                        }
                                        onClose={() =>
                                            setFieldTouched("date_emission")
                                        }
                                        onAccept={() =>
                                            setFieldTouched("date_emission")
                                        }
                                        onChange={date =>
                                            setFieldValue("date_emission", date)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={Boolean(
                                            touched.commentary &&
                                                errors.commentary
                                        )}
                                        fullWidth
                                        helperText={
                                            touched.commentary &&
                                            errors.commentary
                                        }
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
                            <Box mt={2}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    Actualizar documento
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </form>
            )}
        </Formik>
    );
}

DocumentEditForm.propTypes = {
    className: PropTypes.string,
    document: PropTypes.object.isRequired
};

export default DocumentEditForm;
