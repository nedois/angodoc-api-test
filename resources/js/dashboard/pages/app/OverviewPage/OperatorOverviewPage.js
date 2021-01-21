import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
    Box,
    Container,
    Typography,
    Card,
    Link,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    Tooltip,
    IconButton,
    SvgIcon,
    makeStyles
} from "@material-ui/core";
import { ArrowRight as ArrowRightIcon } from "react-feather";

import Page from "@dashboard/components/Page";
import Header from "@dashboard/components/Header";
import AgencyOverview from "@dashboard/components/AgencyOverview";
import { AGENCIES, USERS } from "@dashboard/routes/uris";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: "100%",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    }
}));

const breadcrumbItems = [
    {
        label: "Geral"
    },
    {
        label: "Visão geral",
        active: true
    }
];

const OperatorOverviewPage = ({ user }) => {
    const classes = useStyles();

    return (
        <Page className={classes.root} title="Visão geral">
            <Container>
                <Header
                    title={`Bem-vind${user.gender === "M" ? "o" : "a"} de volta ${user.first_name}`}
                    breadcrumbItems={breadcrumbItems}
                >
                    <Box mt={3}>
                        <AgencyOverview />
                    </Box>
                </Header>
                <Box mt={4}>
                    <Typography variant="h3" color="textPrimary">
                        Minha agência
                    </Typography>
                    <Box mt={3}>
                        <Card>
                            <PerfectScrollbar>
                                <Box minWidth={700}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Nome</TableCell>
                                                <TableCell>Director</TableCell>
                                                <TableCell>Endereço</TableCell>
                                                <TableCell>Província</TableCell>
                                                <TableCell align="right">Acções</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow hover key={user.agency.id}>
                                                <TableCell>
                                                    <Link
                                                        color="inherit"
                                                        component={RouterLink}
                                                        to={`${AGENCIES.URI}/${user.agency.id}`}
                                                        variant="h6"
                                                    >
                                                        {user.agency.name}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    <Link
                                                        color="inherit"
                                                        component={RouterLink}
                                                        to={`${USERS.URI}/${user.agency.director.id}`}
                                                        variant="h6"
                                                    >
                                                        {user.agency.director.full_name}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>{user.agency.address}</TableCell>
                                                <TableCell>{user.agency.province}</TableCell>
                                                <TableCell align="right">
                                                    <Tooltip title="Ver detalhes" aria-label="ver detalhes">
                                                        <IconButton
                                                            component={RouterLink}
                                                            to={`${AGENCIES.URI}/minha-agencia`}
                                                        >
                                                            <SvgIcon fontSize="small">
                                                                <ArrowRightIcon />
                                                            </SvgIcon>
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Box>
                            </PerfectScrollbar>
                        </Card>
                    </Box>
                </Box>
            </Container>
        </Page>
    );
};

OperatorOverviewPage.propTypes = {
    className: PropTypes.string,
    user: PropTypes.object.isRequired
};

export default OperatorOverviewPage;
