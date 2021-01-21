import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
    Avatar,
    Box,
    Card,
    Chip,
    Divider,
    IconButton,
    InputAdornment,
    Link,
    SvgIcon,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Tabs,
    Tooltip,
    TextField,
    Typography,
    makeStyles
} from "@material-ui/core";
import {
    Edit as EditIcon,
    ArrowRight as ArrowRightIcon,
    Search as SearchIcon
} from "react-feather";
import getInitials from "../../../../utils/getInitials";

import { APP_URL } from "../../../../config";

const tabs = [
    {
        value: "all",
        label: "Todos funcionários"
    },
    {
        value: "confirmed",
        label: "Não confirmados"
    },
    {
        value: "active",
        label: "Inactivos"
    },
    {
        value: "deleted",
        label: "Deletados"
    }
];

const sortOptions = [
    {
        value: "full_name|desc",
        label: "Nome (Z-A)"
    },
    {
        value: "full_name|asc",
        label: "Nome (A-Z)"
    },
    {
        value: "email|desc",
        label: "Email (Z-A)"
    },
    {
        value: "email|asc",
        label: "Email (A-Z)"
    }
];

function applyFilters(customers, query, filters) {
    return customers.filter(customer => {
        let matches = true;

        if (query) {
            const properties = ["email", "full_name"];
            let containsQuery = false;

            properties.forEach(property => {
                if (
                    customer[property]
                        .toLowerCase()
                        .includes(query.toLowerCase())
                ) {
                    containsQuery = true;
                }
            });

            if (!containsQuery) {
                matches = false;
            }
        }

        Object.keys(filters).forEach(key => {
            const value = filters[key];

            if (value && !customer[key] !== value) {
                matches = false;
            }
        });

        return matches;
    });
}

function applyPagination(customers, page, limit) {
    return customers.slice(page * limit, page * limit + limit);
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }

    if (b[orderBy] > a[orderBy]) {
        return 1;
    }

    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySort(customers, sort) {
    const [orderBy, order] = sort.split("|");
    const comparator = getComparator(order, orderBy);
    const stabilizedThis = customers.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);

        if (order !== 0) return order;

        return a[1] - b[1];
    });

    return stabilizedThis.map(el => el[0]);
}

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

function Results({ className, customers, ...rest }) {
    const classes = useStyles();
    const [currentTab, setCurrentTab] = useState("all");
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState(sortOptions[0].value);
    const [filters, setFilters] = useState({
        confirmed: null,
        active: null,
        deleted: null
    });

    const handleTabsChange = (event, value) => {
        const updatedFilters = {
            ...filters,
            confirmed: null,
            active: null,
            deleted: null
        };

        if (value !== "all") {
            updatedFilters[value] = true;
        }

        setFilters(updatedFilters);
        setCurrentTab(value);
    };

    const handleQueryChange = event => {
        event.persist();
        setQuery(event.target.value);
    };

    const handleSortChange = event => {
        event.persist();
        setSort(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleLimitChange = event => {
        setLimit(event.target.value);
    };

    const filteredCustomers = applyFilters(customers, query, filters);
    const sortedCustomers = applySort(filteredCustomers, sort);
    const paginatedCustomers = applyPagination(sortedCustomers, page, limit);

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
                    placeholder="Procurar funcionário"
                    value={query}
                    variant="outlined"
                />
                <Box flexGrow={1} />
                <TextField
                    label="Organizar por"
                    name="sort"
                    onChange={handleSortChange}
                    select
                    SelectProps={{ native: true }}
                    value={sort}
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
                <Box minWidth={700}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>Papél</TableCell>
                                <TableCell>Confirmado</TableCell>
                                <TableCell>Inactivo</TableCell>
                                <TableCell align="right">Acções</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedCustomers.map(customer => {
                                return (
                                    <TableRow hover key={customer.id}>
                                        <TableCell>
                                            <Box
                                                display="flex"
                                                alignItems="center"
                                            >
                                                <Avatar
                                                    className={classes.avatar}
                                                    src={
                                                        customer.avatar_location
                                                    }
                                                >
                                                    {getInitials(
                                                        customer.full_name
                                                    )}
                                                </Avatar>
                                                <div>
                                                    <Link
                                                        color="inherit"
                                                        component={RouterLink}
                                                        to={`${APP_URL}/gestao-do-sistema/funcionarios/${customer.id}`}
                                                        variant="h6"
                                                    >
                                                        {customer.full_name}
                                                    </Link>
                                                    <Typography
                                                        variant="body2"
                                                        color="textSecondary"
                                                    >
                                                        {customer.email}
                                                    </Typography>
                                                </div>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            {customer.roles.length ? (
                                                customer.roles.map(role => (
                                                    <Chip
                                                        size="small"
                                                        key={role.id}
                                                        label={role.name.toUpperCase()}
                                                        color="primary"
                                                    />
                                                ))
                                            ) : (
                                                <Chip
                                                    size="small"
                                                    label="OPERADOR"
                                                    color="primary"
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {customer.confirmed ? (
                                                <Chip
                                                    size="small"
                                                    label="SIM"
                                                    color="primary"
                                                />
                                            ) : (
                                                <Chip
                                                    size="small"
                                                    label="NÃO"
                                                    color="secondary"
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {customer.active ||
                                            customer.deleted_at ? (
                                                <Chip
                                                    size="small"
                                                    label="SIM"
                                                    color="primary"
                                                />
                                            ) : (
                                                <Chip
                                                    size="small"
                                                    label="NÃO"
                                                    color="secondary"
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Tooltip
                                                title="Editar"
                                                aria-label="editar"
                                            >
                                                <IconButton
                                                    component={RouterLink}
                                                    to={`${APP_URL}/gestao-do-sistema/funcionarios/${customer.id}/editar`}
                                                >
                                                    <SvgIcon fontSize="small">
                                                        <EditIcon />
                                                    </SvgIcon>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip
                                                title="Ver funcionário"
                                                aria-label="ver funcionário"
                                            >
                                                <IconButton
                                                    component={RouterLink}
                                                    to={`${APP_URL}/gestao-do-sistema/funcionarios/${customer.id}`}
                                                >
                                                    <SvgIcon fontSize="small">
                                                        <ArrowRightIcon />
                                                    </SvgIcon>
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            <TablePagination
                component="div"
                count={filteredCustomers.length}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
}

Results.propTypes = {
    className: PropTypes.string,
    customers: PropTypes.array
};

Results.defaultProps = {
    customers: []
};

export default Results;
