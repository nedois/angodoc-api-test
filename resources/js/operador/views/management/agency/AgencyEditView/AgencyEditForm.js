import React, { useState, useEffect, useCallback } from "react";
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
import useIsMountedRef from "../../../../hooks/useIsMountedRef";

import { API_BASE_URL } from "../../../../config";

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

function AgencyEditForm({ id, className, agency, ...rest }) {
    const classes = useStyles();
    const isMountedRef = useIsMountedRef();
    const { enqueueSnackbar } = useSnackbar();
    const [users, setUsers] = useState(null);

    const getUsers = useCallback(() => {
        axios.get(API_BASE_URL + '/agencies/users').then(response => {
            if (isMountedRef.current) {
                setUsers(response.data.data);
            }
        });
    }, [isMountedRef]);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    if (!users) {
        return null;
    }

    return (
        <Formik
            initialValues={{
                name: agency.name || "",
                user_id: agency.manager.id || 1,
                address: agency.address || "",
                province: agency.province || "Luanda"
            }}
            validationSchema={Yup.object().shape({
                name: Yup.string()
                    .max(255)
                    .required("O nome é obrigatório"),
                address: Yup.string().required("O endereço é obrigatório")
            })}
            onSubmit={async (
                values,
                { resetForm, setErrors, setStatus, setSubmitting }
            ) => {
                try {
                    await axios.put(`${API_BASE_URL}/agencies/${id}`, {
                        ...values
                    });
                    resetForm({ values });
                    setStatus({ success: true });
                    setSubmitting(false);
                    enqueueSnackbar("Agência atualizada", {
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
                                    <Grid item xs={12}>
                                        <TextField
                                            error={Boolean(
                                                touched.name &&
                                                errors.name
                                            )}
                                            fullWidth
                                            helperText={
                                                touched.name &&
                                                errors.name
                                            }
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
                                            label="Director"
                                            name="user_id"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            required
                                            select
                                            variant="outlined"
                                            fullWidth
                                            SelectProps={{ native: true }}
                                            value={values.user_id}
                                        >
                                            {users.map(user => (
                                                <option key={user.id} value={user.id}>
                                                    {user.full_name}
                                                </option>
                                            ))}
                                        </TextField>
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

AgencyEditForm.propTypes = {
    className: PropTypes.string,
    agency: PropTypes.object.isRequired
};

export default AgencyEditForm;
