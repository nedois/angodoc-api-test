import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, makeStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import CheckIcon from "@material-ui/icons/Check";
import { Edit as EditIcon } from "react-feather";
import { useSnackbar } from "notistack";

import axios from "@dashboard/utils/axios";
import useAuth from "@dashboard/hooks/useAuth";
import { API_OLD_URL } from "@dashboard/constants";
import { canEditDocument } from "@dashboard/utils/permissions";
import { DOCUMENTS } from "@dashboard/routes/uris";

const useStyles = makeStyles(theme => ({
    fontWeightMedium: {
        fontWeight: theme.typography.fontWeightMedium
    },
    actionIcon: {
        marginRight: theme.spacing(1)
    },
    deleteAction: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.error.main,
        "&:hover": {
            backgroundColor: theme.palette.error.dark
        }
    },
    checkAction: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.success.main,
        "&:hover": {
            backgroundColor: theme.palette.success.dark
        },
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}));

function DocumentCardActions({ id, isRecovered, setIsRecovered, isDeleted, documentAgencyId }) {
    const classes = useStyles();
    const [submitting, setSubmitting] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useAuth();

    const markAsRecovered = async () => {
        setSubmitting(true);
        await axios
            .post(`${API_OLD_URL}/documents/${id}/markAsRecovered`)
            .then(response => {
                enqueueSnackbar("Documento marcado como recuperado", {
                    variant: "success"
                });
                setSubmitting(false);
                setIsRecovered(true);
            })
            .catch(error => {
                setSubmitting(false);
                enqueueSnackbar(error.message, {
                    variant: "error"
                });
            });
    };

    const deleteDocument = async () => {
        setSubmitting(true);
        await axios
            .delete(`${API_OLD_URL}/documents/${id}`)
            .then(response => {
                setSubmitting(false);

                enqueueSnackbar("Documento deletado", {
                    variant: "success"
                });
            })
            .catch(error => {
                setSubmitting(false);
                enqueueSnackbar(error.message, {
                    variant: "error"
                });
            });
    };

    return (
        <Box p={1} display="flex" flexDirection="column" alignItems="flex-start">
            {canEditDocument(documentAgencyId, user) ? (
                <>
                    <Button
                        component={RouterLink}
                        to={`${DOCUMENTS.URI}/${id}/editar`}
                        disabled={submitting || !!isRecovered || !!isDeleted}
                    >
                        <EditIcon className={classes.actionIcon} />
                        Editar documento
                    </Button>
                    <Button
                        className={classes.checkAction}
                        onClick={markAsRecovered}
                        disabled={submitting || !!isRecovered || !!isDeleted}
                    >
                        <CheckIcon className={classes.actionIcon} />
                        Marcar como recuperado
                    </Button>
                    <Button
                        className={classes.deleteAction}
                        onClick={deleteDocument}
                        disabled={submitting || !!isDeleted || !!isRecovered}
                    >
                        <DeleteIcon className={classes.actionIcon} />
                        Apagar documento
                    </Button>
                </>
            ) : null}
        </Box>
    );
}

DocumentCardActions.proptypes = {
    id: PropTypes.string.isRequired,
    isRecovered: PropTypes.bool.isRequired,
    setIsRecovered: PropTypes.func.isRequired
};

export default DocumentCardActions;
