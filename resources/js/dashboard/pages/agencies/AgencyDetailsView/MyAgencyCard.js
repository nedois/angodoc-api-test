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
import { AGENCIES } from "@dashboard/routes/uris";
import useAuth from "@dashboard/hooks/useAuth";

const useStyles = makeStyles(theme => ({
    fontWeightMedium: {
        fontWeight: theme.typography.fontWeightMedium
    },
    actionIcon: {
        marginRight: theme.spacing(1)
    }
}));

function MyAgencyCard() {
    const classes = useStyles();
    const { user } = useAuth();

    return (
        <Card>
            <CardHeader title="Agência" />
            <Divider />
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>Nome</TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {user.agency.name}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>Director</TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {user.agency.director.full_name}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>Endereço</TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {user.agency.address}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>Província</TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {user.agency.province}
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            {user.id == user.agency.director.id && (
                <Box p={1} display="flex" flexDirection="column" alignItems="flex-start">
                    <Button component={RouterLink} to={`${AGENCIES.URI}/minha-agencia/editar`}>
                        <EditIcon className={classes.actionIcon} />
                        Editar agência
                    </Button>
                </Box>
            )}
        </Card>
    );
}

export default MyAgencyCard;
