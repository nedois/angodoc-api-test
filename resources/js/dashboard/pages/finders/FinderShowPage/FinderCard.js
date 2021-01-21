import React from "react";
import PropTypes from "prop-types";
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
import { FINDERS } from "@dashboard/routes/uris";
import { canEditDocument } from "@dashboard/utils/permissions";
import useAuth from "@dashboard/hooks/useAuth";

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
    const { user } = useAuth();

    return (
        <Card>
            <CardHeader title="Encontrador" />
            <Divider />
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>Registado por</TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {finder.included[0].attributes.full_name}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>Nome</TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {`${finder.data.attributes.first_name} ${finder.data.attributes.last_name}`}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>Idade</TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {finder.data.attributes.age} anos
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>N° BI</TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {finder.data.attributes.bi}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>Sexo</TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {finder.data.attributes.gender === "M" ? "Masculino" : "Feminino"}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>Ocupação</TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {finder.data.attributes.job}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>Endereço</TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {finder.data.attributes.address}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>Provincia</TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {finder.data.attributes.province}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>Telefone</TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {finder.data.attributes.phone_number}
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            {canEditDocument(finder.data.relationships.agency.data.id, user) && (
                <Box p={1} display="flex" flexDirection="column" alignItems="flex-start">
                    <Button component={RouterLink} to={`${FINDERS.URI}/${finder.data.id}/editar`}>
                        <EditIcon className={classes.actionIcon} />
                        Editar encontrador
                    </Button>
                </Box>
            )}
        </Card>
    );
}

FinderCard.propTypes = {
    finder: PropTypes.object.isRequired
};

export default FinderCard;
