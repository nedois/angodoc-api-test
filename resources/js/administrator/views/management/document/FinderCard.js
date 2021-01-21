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
import PersonIcon from "@material-ui/icons/PersonOutline";
import { APP_URL } from "../../../config";

const useStyles = makeStyles(theme => ({
    fontWeightMedium: {
        fontWeight: theme.typography.fontWeightMedium
    },
    actionIcon: {
        marginRight: theme.spacing(1)
    }
}));

function FinderCard({ finder }) {
    const classes = useStyles();

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
                    to={`${APP_URL}/recursos/encontradores/${finder.id}`}
                >
                    <PersonIcon className={classes.actionIcon} />
                    Ver encontrador
                </Button>
            </Box>
        </Card>
    );
}

export default FinderCard;
