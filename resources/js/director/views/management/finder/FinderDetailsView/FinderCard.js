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
import { Edit as EditIcon } from "react-feather";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
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
    }
}));

function FinderCard({ finder, history }) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [deleting, setDeleting] = useState(false);

    const deleteDocument = async () => {
        try {
            setDeleting(true);
            await axios.delete(`${API_BASE_URL}/finders/${finder.id}`);
            setDeleting(false);

            enqueueSnackbar("Encontrador deletado", {
                variant: "success"
            });

            history.push(`${APP_URL}/recursos/encontradores`);
        } catch (error) {
            console.log(error);
            setDeleting(false);
            enqueueSnackbar(error.message, {
                variant: "error"
            });
        }
    };

    return (
        <Card>
            <CardHeader title="Encontrador" />
            <Divider />
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>
                            Nome
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {finder.full_name}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>
                            Idade
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {finder.age} anos
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>
                            N° BI
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {finder.bi}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>
                            Ocupação
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {finder.job}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>
                            Endereço
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {finder.address}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>
                            Provincia
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {finder.province}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>
                            Telefone
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {finder.telephone}
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
                    to={`${APP_URL}/recursos/encontradores/${finder.id}/editar`}
                >
                    <EditIcon className={classes.actionIcon} />
                    Editar encontrador
                </Button>
                <Button
                    className={classes.deleteAction}
                    onClick={deleteDocument}
                    disabled={deleting}
                >
                    <DeleteIcon className={classes.actionIcon} />
                    Apagar encontrador
                </Button>
            </Box>
        </Card>
    );
}

export default withRouter(FinderCard);
