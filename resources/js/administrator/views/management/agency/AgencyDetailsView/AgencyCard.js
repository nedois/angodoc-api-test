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
import { useSnackbar } from "notistack";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
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

function AgencyCard({ agency, history }) {
    const classes = useStyles();
    const [deleting, setDeleting] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const deleteAgency = async () => {
        try {
            setDeleting(true);
            await axios.delete(`${API_BASE_URL}/agencies/${agency.id}`);
            setDeleting(false);

            enqueueSnackbar("Agência deletada", {
                variant: "success"
            });

            history.push(`${APP_URL}/recursos/agencias`);
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
            <CardHeader title="Agência" />
            <Divider />
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>
                            Nome
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {agency.name}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>
                            Director
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {agency.manager.full_name}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>
                            Endereço
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {agency.address}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>
                            Província
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {agency.province}
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
                    to={`${APP_URL}/recursos/agencias/${agency.id}/editar`}
                >
                    <EditIcon className={classes.actionIcon} />
                    Editar agência
                </Button>
                <Button
                    className={classes.deleteAction}
                    onClick={deleteAgency}
                    disabled={deleting}
                >
                    <DeleteIcon className={classes.actionIcon} />
                    Apagar agência
                </Button>
            </Box>
        </Card>
    );
}

export default withRouter(AgencyCard);
