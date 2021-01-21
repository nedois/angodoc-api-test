import React, { useState, useEffect, useCallback } from "react";
import {
    Box,
    Container,
    Card,
    IconButton,
    Link,
    SvgIcon,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Tooltip,
    makeStyles
} from "@material-ui/core";
import { Edit as EditIcon, ArrowRight as ArrowRightIcon } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Page from "../../../../components/Page";
import useIsMountedRef from "../../../../hooks/useIsMountedRef";
import Header from "./Header";
import Results from "./Results";
import { API_BASE_URL, APP_URL } from "../../../../config";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: "100%",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    }
}));

function AgencyListView() {
    const classes = useStyles();
    const isMountedRef = useIsMountedRef();
    const [agencies, setAgencies] = useState(null);
    const account = useSelector(state => state.account);

    const getAgencies = useCallback(() => {
        axios.get(API_BASE_URL + "/agencies").then(response => {
            if (isMountedRef.current) {
                setAgencies(response.data.data);
            }
        });
    }, [isMountedRef]);

    useEffect(() => {
        getAgencies();
    }, [getAgencies]);

    if (!agencies) {
        return null;
    }

    return (
        <Page className={classes.root} title="Lista das agências">
            <Container>
                <Header />
                <Box mt={2}>
                    <Typography variant="h3" color="textPrimary">
                        Minha agência
                    </Typography>
                </Box>
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
                                            <TableCell align="right">
                                                Acções
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow
                                            hover
                                            key={account.user.agency.id}
                                        >
                                            <TableCell>
                                                <Link
                                                    color="inherit"
                                                    component={RouterLink}
                                                    to={`${APP_URL}/recursos/agencias/${account.user.agency.id}`}
                                                    variant="h6"
                                                >
                                                    {account.user.agency.name}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Link
                                                    color="inherit"
                                                    component={RouterLink}
                                                    to={`${APP_URL}/gestao-do-sistema/funcionarios/${account.user.agency.manager.id}`}
                                                    variant="h6"
                                                >
                                                    {
                                                        account.user.agency
                                                            .manager.full_name
                                                    }
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                {account.user.agency.address}
                                            </TableCell>
                                            <TableCell>
                                                {account.user.agency.province}
                                            </TableCell>
                                            <TableCell align="right">
                                                {account.user.agency.id ==
                                                    account.user.id && (
                                                    <Tooltip
                                                        title="Editar"
                                                        aria-label="editar"
                                                    >
                                                        <IconButton
                                                            component={
                                                                RouterLink
                                                            }
                                                            to={`${APP_URL}/recursos/agencias/${account.user.agency.id}/editar`}
                                                        >
                                                            <SvgIcon fontSize="small">
                                                                <EditIcon />
                                                            </SvgIcon>
                                                        </IconButton>
                                                    </Tooltip>
                                                )}

                                                <Tooltip
                                                    title="Ver detalhes"
                                                    aria-label="ver detalhes"
                                                >
                                                    <IconButton
                                                        component={RouterLink}
                                                        to={`${APP_URL}/recursos/agencias/${account.user.agency.id}`}
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
                <Box mt={3}>
                    <Typography variant="h3" color="textPrimary">
                        Todas agências
                    </Typography>
                </Box>
                {agencies && (
                    <Box mt={3}>
                        <Results agencies={agencies} />
                    </Box>
                )}
            </Container>
        </Page>
    );
}

export default AgencyListView;
