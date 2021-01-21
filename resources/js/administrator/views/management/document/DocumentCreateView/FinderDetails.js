import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import * as Yup from "yup";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import {
    Box,
    Button,
    IconButton,
    SvgIcon,
    TextField,
    Typography,
    makeStyles
} from "@material-ui/core";
import { Plus as PlusIcon } from "react-feather";

import { API_BASE_URL } from "../../../../config";
import FinderCard from "../FinderCard";

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

function FinderDetails({
    className,
    onNext,
    finder,
    setFinder,
    setNewFinder,
    ...rest
}) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    return (
        <Formik
            initialValues={{
                bi: ""
            }}
            validationSchema={Yup.object().shape({
                bi: Yup.string().required("Deve insirir o n° do BI")
            })}
            onSubmit={async (
                values,
                { setErrors, setStatus, setSubmitting }
            ) => {
                try {
                    await axios
                        .get(`${API_BASE_URL}/finders/finderByBi/${values.bi}`)
                        .then(resp => setFinder(resp.data.data));
                    setStatus({ success: true });
                    setSubmitting(false);
                } catch (error) {
                    setErrors({ submit: error.message });
                    setStatus({ success: false });
                    setSubmitting(false);
                    enqueueSnackbar("N° de BI não cadastrado no sistema", {
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
                    onSubmit={handleSubmit}
                    className={clsx(classes.root, className)}
                    {...rest}
                >
                    <Typography variant="h3" color="textPrimary">
                        Escolha um encontrador
                    </Typography>
                    <Box mt={2}>
                        <Typography variant="subtitle1" color="textSecondary">
                            Utilize a barra de pesquisa em baixo ou adicione um
                            novo a partir do botão +
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
                        <IconButton
                            variant="contained"
                            className={classes.addTab}
                            onClick={() => setNewFinder(true)}
                        >
                            <SvgIcon>
                                <PlusIcon />
                            </SvgIcon>
                        </IconButton>
                    </Box>
                    <Box mt={3}>
                        {finder.id && <FinderCard finder={finder} />}
                    </Box>
                    <Box mt={6} display="flex">
                        <Box flexGrow={1} />
                        {finder.id ? (
                            <Button
                                color="secondary"
                                onClick={onNext}
                                variant="contained"
                                size="large"
                            >
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
