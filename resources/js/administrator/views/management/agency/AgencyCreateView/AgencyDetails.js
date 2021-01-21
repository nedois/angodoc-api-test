import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import * as Yup from "yup";
import { Formik } from "formik";
import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    makeStyles
} from "@material-ui/core";
import { useSnackbar } from "notistack";

import { API_BASE_URL } from "../../../../config";

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

function AgencyDetails({ className, onBack, onComplete, manager, ...rest }) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    return (
        <Formik
            initialValues={{
                name: "",
                user_id: manager.id,
                manager: manager.first_name + " " + manager.last_name,
                address: "",
                province: "Luanda"
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
                    await axios
                        .post(`${API_BASE_URL}/agencies?createAgency=true`, {
                            agency: { ...values },
                            director: manager
                        })
                        .then(resp => console.log(resp));
                    resetForm({ values });
                    setStatus({ success: true });
                    setSubmitting(false);
                    enqueueSnackbar("Agência criada", {
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
                isSubmitting,
                touched,
                values
            }) => (
                <form
                    className={clsx(classes.root, className)}
                    onSubmit={handleSubmit}
                    {...rest}
                >
                    <Typography variant="h3" color="textPrimary">
                        Insira as informações da agência
                    </Typography>
                    <Box mt={3}>
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
                            <Box display="none">
                                <TextField
                                    label="Director"
                                    name="user_id"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    disabled
                                    hidden
                                    value={values.user_id}
                                ></TextField>
                            </Box>
                            <Grid item xs={12}>
                                <TextField
                                    label="Director"
                                    name="manager"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    disabled
                                    value={values.manager}
                                ></TextField>
                            </Grid>
                            <Grid item xs={12}>
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
                                Criar agência
                            </Button>
                        </Box>
                    </Box>
                </form>
            )}
        </Formik>
    );
}

AgencyDetails.propTypes = {
    className: PropTypes.string,
    onNext: PropTypes.func
};

export default AgencyDetails;
