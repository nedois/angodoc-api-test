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

function UserCard({ user, history }) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [deleting, setDeleting] = useState(false);

    const deleteDocument = async () => {
        try {
            setDeleting(true);
            await axios.delete(`${API_BASE_URL}/users/${user.id}`);
            setDeleting(false);

            enqueueSnackbar("Funcionário deletado", {
                variant: "success"
            });

            history.push(`${APP_URL}/gestao-do-sistema/funcionarios`);
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
            <CardHeader title="Funcionários" />
            <Divider />
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>
                            Nome Completo
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {user.full_name}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>
                            Email
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {user.email}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>
                            Pápel
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {user.roles.length ? (
                                    user.roles.map(role => (
                                        <span key={role.id}>
                                            {role.name.toUpperCase()}
                                        </span>
                                    ))
                                ) : (
                                    <span>OPERADOR</span>
                                )}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>
                            Conta activa
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                <span>
                                    {user.active || user.deleted_at
                                        ? "SIM"
                                        : "NÃO"}
                                </span>
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>
                            Email verificado
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                <span>
                                    {user.email_verified_at ? "SIM" : "NÃO"}
                                </span>
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
                    to={`${APP_URL}/gestao-do-sistema/funcionarios/${user.id}/editar`}
                >
                    <EditIcon className={classes.actionIcon} />
                    Editar funcionário
                </Button>
                <Button
                    className={classes.deleteAction}
                    onClick={deleteDocument}
                    disabled={deleting}
                >
                    <DeleteIcon className={classes.actionIcon} />
                    Apagar funcionário
                </Button>
            </Box>
        </Card>
    );
}

export default withRouter(UserCard);
