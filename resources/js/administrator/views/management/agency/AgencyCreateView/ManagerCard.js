import React from "react";
import {
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

const useStyles = makeStyles(theme => ({
    fontWeightMedium: {
        fontWeight: theme.typography.fontWeightMedium
    },
    actionIcon: {
        marginRight: theme.spacing(1)
    }
}));

function ManagerCard({ manager }) {
    const classes = useStyles();

    return (
        <Card>
            <CardHeader title="Director" />
            <Divider />
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>
                            Nome
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {manager.full_name}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>
                            Email
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {manager.email}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>
                            N° BI
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {manager.bi}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>
                            Funcionário confirmado
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {manager.confirmed ? "Sim" : "Não"}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>
                            Funcionário activo
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {manager.active ? "Sim" : "Não"}
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Card>
    );
}

export default ManagerCard;
