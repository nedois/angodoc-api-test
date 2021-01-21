import React from "react";
import { Link as RouterLink } from "react-router-dom";
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
import { APP_URL } from "../../../../config";
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
    fontWeightMedium: {
        fontWeight: theme.typography.fontWeightMedium
    },
    actionIcon: {
        marginRight: theme.spacing(1)
    }
}));

function AgencyCard({ agency }) {
    const classes = useStyles();
    const { user } = useSelector(state => state.account);

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
            {user.id == agency.manager.id && (
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
                </Box>
            )}
        </Card>
    );
}

export default AgencyCard;
