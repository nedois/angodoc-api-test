import React, { useState } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import {
    Box,
    Button,
    makeStyles,
    Card,
    CardHeader,
    Divider,
    Table,
    TableCell,
    TableBody,
    TableRow,
    Typography
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import CheckIcon from "@material-ui/icons/Check";
import { Edit as EditIcon } from "react-feather";
import axios from "axios";
import { useSnackbar } from "notistack";

import { APP_URL, API_BASE_URL } from "../../../../config";

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

function DocumentCard({ document, history }) {
    const classes = useStyles();
    const [submitting, setSubmitting] = useState(false);
    const [isRecovered, setIsRecovered] = useState(document.recovered);
    const { enqueueSnackbar } = useSnackbar();

    const markAsRecovered = async () => {
        try {
            setSubmitting(true);
            await axios.post(
                `${API_BASE_URL}/documents/${document.id}/recovered`
            );
            setSubmitting(false);

            enqueueSnackbar("Documento marcado como recuperado", {
                variant: "success"
            });
            setIsRecovered(true);
        } catch (error) {
            setSubmitting(false);
            enqueueSnackbar(error.message, {
                variant: "error"
            });
        }
    };

    const deleteDocument = async () => {
        try {
            setSubmitting(true);
            await axios.delete(`${API_BASE_URL}/documents/${document.id}`);
            setSubmitting(false);

            enqueueSnackbar("Documento deletado", {
                variant: "success"
            });

            history.push(`${APP_URL}/recursos/documentos`);
        } catch (error) {
            setSubmitting(false);
            enqueueSnackbar(error.message, {
                variant: "error"
            });
        }
    };

    return (
        <Card>
            <CardHeader title="Documento" />
            <Divider />
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>
                            Referência
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {document.reference}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>
                            Tipo
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {document.type}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>
                            Proprietário
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {document.owner}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>
                            Data de emissão
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {document.date_emission}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>
                            Comentário
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {document.comentary
                                    ? document.comentary
                                    : "Sem comentários"}
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Box
                p={1}
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
            >
                <Button
                    component={RouterLink}
                    to={`${APP_URL}/recursos/documentos/${document.id}/editar`}
                    disabled={submitting || isRecovered}
                >
                    <EditIcon className={classes.actionIcon} />
                    Editar documento
                </Button>
                <Button
                    className={classes.checkAction}
                    onClick={markAsRecovered}
                    disabled={submitting || isRecovered}
                >
                    <CheckIcon className={classes.actionIcon} />
                    Marcar como recuperado
                </Button>
                <Button
                    className={classes.deleteAction}
                    onClick={deleteDocument}
                    disabled={submitting}
                >
                    <DeleteIcon className={classes.actionIcon} />
                    Apagar documento
                </Button>
            </Box>
        </Card>
    );
}

export default withRouter(DocumentCard);
