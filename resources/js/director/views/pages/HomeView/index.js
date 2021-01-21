import React from "react";
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
import { ArrowRight as ArrowRightIcon } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { API_BASE_URL, APP_URL } from "../../../config";
import Page from "../../../components/Page";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: "100%",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    }
}));

function HomeView() {
    const classes = useStyles();
    const account = useSelector(state => state.account);

    return (
        <Page className={classes.root} title="Painel de contrôle">
            <Container>
                <Typography variant="h2" color="textPrimary">
                    {account.user.sexe === "M"
                        ? "Seja bem-vindo, "
                        : "Seja bem-vinda, " + account.user.first_name}
                </Typography>
                <Box mt={4}>
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
            </Container>
        </Page>
    );
}

export default HomeView;
