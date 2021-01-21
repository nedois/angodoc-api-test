import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import * as Yup from "yup";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { Box, Button, IconButton, SvgIcon, TextField, Typography, makeStyles } from "@material-ui/core";
import { Plus as PlusIcon } from "react-feather";
import axios from "@dashboard/utils/axios";

import { API_URL } from "@dashboard/constants";
import FinderCard from "@dashboard/components/FinderCard";

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

function FinderDetails({ className, onNext, finder, setFinder, setNewFinder, ...rest }) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    console.log(finder);

    return (
        <Formik
            initialValues={{
                bi: ""
            }}
            validationSchema={Yup.object().shape({
                bi: Yup.string().required("Deve insirir o n° do BI")
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                await axios
                    .get(`${API_URL}/finders?filter[bi]=${values.bi}`)
                    .then(resp => {
                        if (resp.data.data.lenght === 0) {
                            enqueueSnackbar("N° de BI não cadastrado no sistema", {
                                variant: "error"
                            });
                        } else {
                            setFinder(resp.data.data[0]);
                        }
                        setStatus({ success: true });
                        setSubmitting(false);
                    })
                    .catch(error => {
                        console.log({ ...error });
                        setErrors({ submit: error.message });
                        setStatus({ success: false });
                        setSubmitting(false);
                        enqueueSnackbar("N° de BI não cadastrado no sistema", {
                            variant: "error"
                        });
                    });
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
                    <Box mt={3} display="flex" alignItems="center">
                        <TextField
                            fullWidth
                            error={Boolean(touched.bi && errors.bi)}
                            helperText={touched.bi && errors.bi}
                            label="Digite o n° do BI do encontrador"
                            name="bi"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.bi}
                            variant="outlined"
                        />
                        <IconButton variant="contained" className={classes.addTab} onClick={() => setNewFinder(true)}>
                            <SvgIcon>
                                <PlusIcon />
                            </SvgIcon>
                        </IconButton>
                    </Box>
                    <Box mt={3}>{finder.id && <FinderCard finder={finder} />}</Box>
                    <Box mt={6} display="flex">
                        <Box flexGrow={1} />
                        {finder.id ? (
                            <Button color="secondary" onClick={onNext} variant="contained" size="large">
                                Próximo
                            </Button>
                        ) : (
                            <Button
                                color="secondary"
                                disabled={isSubmitting}
                                type="submit"
                                variant="contained"
                                size="large"
                            >
                                Procurar
                            </Button>
                        )}
                    </Box>
                </form>
            )}
        </Formik>
    );
}
FinderDetails.propTypes = {
    className: PropTypes.string,
    onNext: PropTypes.func
};

export default FinderDetails;
