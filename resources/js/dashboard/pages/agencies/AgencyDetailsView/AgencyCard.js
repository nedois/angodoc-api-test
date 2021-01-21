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
                                {agency.attributes.name}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>Director</TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {agency.attributes.director.full_name}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>Endereço</TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {agency.attributes.address}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>Província</TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {agency.attributes.province}
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Box p={1} display="flex" flexDirection="column" alignItems="flex-start">
                <Button component={RouterLink} to={`${AGENCIES.URI}/${agency.id}/editar`}>
                    <EditIcon className={classes.actionIcon} />
                    Editar agência
                </Button>
            </Box>
        </Card>
    );
}

export default AgencyCard;
