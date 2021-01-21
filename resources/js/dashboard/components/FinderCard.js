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
import PersonIcon from "@material-ui/icons/PersonOutline";
import { FINDERS } from "@dashboard/routes/uris";

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
                        <TableCell className={classes.fontWeightMedium}>Nome</TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {`${finder.attributes.first_name} ${finder.attributes.last_name}`}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>Idade</TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {finder.attributes.age} anos
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>N° BI</TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {finder.attributes.bi}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>Sexo</TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {finder.attributes.gender === "M" ? "Masculino" : "Feminino"}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>Ocupação</TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {finder.attributes.job}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>Endereço</TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {finder.attributes.address}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>Provincia</TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {finder.attributes.province}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>Telefone</TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {finder.attributes.phone_number}
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Box p={1} display="flex" flexDirection="column" alignItems="flex-start">
                <Button component={RouterLink} to={`${FINDERS.URI}/${finder.id}`}>
                    <PersonIcon className={classes.actionIcon} />
                    Ver encontrador
                </Button>
            </Box>
        </Card>
    );
}
FinderCard.propTypes = {
    finder: PropTypes.object.isRequired
};

export default FinderCard;
