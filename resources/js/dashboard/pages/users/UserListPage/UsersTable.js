import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
    Avatar,
    Box,
    Card,
    IconButton,
    InputAdornment,
    Link,
    SvgIcon,
    Tab,
    Tabs,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip,
    TextField,
    Typography,
    makeStyles
} from "@material-ui/core";
import { Edit as EditIcon, ArrowRight as ArrowRightIcon, Search as SearchIcon } from "react-feather";

import LoadingScreen from "@dashboard/components/LoadingScreen";
import { USERS } from "@dashboard/routes/uris";
import getInitials from "@dashboard/utils/getInitials";
import useAuth from "@dashboard/hooks/useAuth";

const sortOptions = [
    {
        value: "-first_name",
        label: "Nome (Z-A)"
    },
    {
        value: "first_name",
        label: "Nome (A-Z)"
    },
    {
        value: "-bi",
        label: "N° BI (Z-A)"
    },
    {
        value: "bi",
        label: "N° BI (A-Z)"
    }
];

const tabs = [
    {
        value: "index",
        label: "Funcionários"
    },
    {
        value: "only_desactivated",
        label: "Conta desativada"
    },
    {
        value: "only_trashed",
        label: "Deletados"
    }
];

const useStyles = makeStyles(theme => ({
    root: {},
    queryField: {
        width: 500
    },
    bulkOperations: {
        position: "relative"
    },
    bulkActions: {
        paddingLeft: 4,
        paddingRight: 4,
        marginTop: 6,
        position: "absolute",
        width: "100%",
        zIndex: 2,
        backgroundColor: theme.palette.background.default
    },
    bulkAction: {
        marginLeft: theme.spacing(2)
    },
    avatar: {
        height: 42,
        width: 42,
        marginRight: theme.spacing(1)
    }
}));

function UsersTable({
    className,
    users,
    page,
    setPage,
    limit,
    currentTab,
    setCurrentTab,
    setLimit,
    orderBy,
    setOrderBy,
    usersCount,
    setLoading,
    query,
    setQuery,
    loading,
    ...rest
}) {
    const classes = useStyles();
    const { user: authUser } = useAuth();

    const handleQueryChange = event => {
        setQuery(event.target.value);
        setLoading(true);
    };

    const handleTabsChange = (event, value) => {
        setCurrentTab(value);
        setLoading(true);
    };

    const handleOrderChange = event => {
        setOrderBy(event.target.value);
        setLoading(true);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
        setLoading(true);
    };

    const handleLimitChange = event => {
        setLimit(event.target.value);
        setLoading(true);
    };

    return (
        <Card className={clsx(classes.root, className)} {...rest}>
            <Tabs
                onChange={handleTabsChange}
                scrollButtons="auto"
                textColor="secondary"
                value={currentTab}
                variant="scrollable"
            >
                {tabs.map(tab => (
                    <Tab key={tab.value} value={tab.value} label={tab.label} />
                ))}
            </Tabs>
            <Divider />
            <Box p={2} minHeight={56} display="flex" alignItems="center">
                <TextField
                    className={classes.queryField}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SvgIcon fontSize="small" color="action">
                                    <SearchIcon />
                                </SvgIcon>
                            </InputAdornment>
                        )
                    }}
                    onChange={handleQueryChange}
                    placeholder="Procurar funcionário (nome ou BI)"
                    value={query}
                    variant="outlined"
                />
                <Box flexGrow={1} />
                <TextField
                    label="Organizar por"
                    name="orderBy"
                    onChange={handleOrderChange}
                    select
                    SelectProps={{ native: true }}
                    value={orderBy}
                    variant="outlined"
                >
                    {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>
            </Box>
            <PerfectScrollbar>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Sexo</TableCell>
                            <TableCell>Papel</TableCell>
                            <TableCell>Conta activa</TableCell>
                            <TableCell>Email verificado</TableCell>
                            <TableCell align="right">Acções</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={9}>
                                    <Box display="flex" justifyContent="center" py={5}>
                                        <LoadingScreen />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : !users.length ? (
                            <TableRow>
                                <TableCell colSpan={9}>
                                    <Box display="flex" justifyContent="center" py={5}>
                                        <Typography variant="h5">Sem funcionários</Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : (
                            users.map(user => {
                                return (
                                    <TableRow hover key={user.id}>
                                        <TableCell>
                                            <Box display="flex" alignItems="center">
                                                <Avatar
                                                    className={classes.avatar}
                                                    src={user.attributes.avatar_location}
                                                >
                                                    {getInitials(
                                                        `${user.attributes.first_name} ${user.attributes.last_name}`
                                                    )}
                                                </Avatar>
                                                <div>
                                                    <Link
                                                        color="inherit"
                                                        component={RouterLink}
                                                        to={`${USERS.URI}/${user.id}`}
                                                        variant="h6"
                                                    >
                                                        {`${user.attributes.first_name} ${user.attributes.last_name}`}
                                                    </Link>
                                                    <Typography variant="body2" color="textSecondary">
                                                        {user.attributes.bi}
                                                    </Typography>
                                                </div>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{user.attributes.email}</TableCell>
                                        <TableCell>
                                            {user.attributes.gender === "M" ? "Masculino" : "Feminino"}
                                        </TableCell>
                                        <TableCell>{user.attributes.roles[0].name.toUpperCase()}</TableCell>
                                        <TableCell>{user.attributes.active ? "SIM" : "NÃO"}</TableCell>
                                        <TableCell>{user.attributes.email_verified_at ? "SIM" : "NÃO"}</TableCell>
                                        <TableCell align="right">
                                            {(authUser.role == "diretor" || authUser.role == "administrador") && (
                                                <Tooltip title="Editar funcionário" aria-label="editar funcionário">
                                                    <IconButton
                                                        component={RouterLink}
                                                        to={`${USERS.URI}/${user.id}/editar`}
                                                    >
                                                        <SvgIcon fontSize="small">
                                                            <EditIcon />
                                                        </SvgIcon>
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                            <Tooltip title="Ver funcionário" aria-label="ver funcionário">
                                                <IconButton component={RouterLink} to={`${USERS.URI}/${user.id}`}>
                                                    <SvgIcon fontSize="small">
                                                        <ArrowRightIcon />
                                                    </SvgIcon>
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </PerfectScrollbar>
            {users.length === 0 ? null : (
                <TablePagination
                    component="div"
                    count={usersCount}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handleLimitChange}
                    backIconButtonText="Página anterior"
                    nextIconButtonText="Próxima página"
                    labelRowsPerPage="Funcionários por página"
                    page={users.length === 0 ? 0 : limit <= usersCount ? page : 0}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            )}
        </Card>
    );
}

UsersTable.propTypes = {
    className: PropTypes.string,
    users: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
    limit: PropTypes.number.isRequired,
    currentTab: PropTypes.string.isRequired,
    setCurrentTab: PropTypes.func.isRequired,
    setLimit: PropTypes.func.isRequired,
    orderBy: PropTypes.string.isRequired,
    setOrderBy: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired,
    setQuery: PropTypes.func.isRequired,
    usersCount: PropTypes.number,
    loading: PropTypes.bool.isRequired
};

export default UsersTable;
