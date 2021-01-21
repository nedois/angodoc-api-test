import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
    Box,
    Card,
    IconButton,
    InputAdornment,
    Link,
    SvgIcon,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip,
    TextField,
    makeStyles
} from "@material-ui/core";
import {
    Edit as EditIcon,
    ArrowRight as ArrowRightIcon,
    Search as SearchIcon
} from "react-feather";

import { APP_URL } from "../../../../config";

const sortOptions = [
    {
        value: "name|desc",
        label: "Nome (Z-A)"
    },
    {
        value: "name|asc",
        label: "Nome (A-Z)"
    },
    {
        value: "province|desc",
        label: "Província (Z-A)"
    },
    {
        value: "province|asc",
        label: "Província (A-Z)"
    }
];

function applyFilters(agencies, query, filters) {
    return agencies.filter(agency => {
        let matches = true;

        if (query) {
            const properties = ["province", "name"];
            let containsQuery = false;

            properties.forEach(property => {
                if (
                    agency[property].toLowerCase().includes(query.toLowerCase())
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

            if (value && !agency[key] !== value) {
                matches = false;
            }
        });

        return matches;
    });
}

function applyPagination(agencies, page, limit) {
    return agencies.slice(page * limit, page * limit + limit);
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

function applySort(agencies, sort) {
    const [orderBy, order] = sort.split("|");
    const comparator = getComparator(order, orderBy);
    const stabilizedThis = agencies.map((el, index) => [el, index]);

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

function Results({ className, agencies, ...rest }) {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState(sortOptions[0].value);
    const [filters, setFilters] = useState({});

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

    const filteredagencies = applyFilters(agencies, query, filters);
    const sortedagencies = applySort(filteredagencies, sort);
    const paginatedagencies = applyPagination(sortedagencies, page, limit);

    return (
        <Card className={clsx(classes.root, className)} {...rest}>
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
                    placeholder="Procurar agência (nome)"
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
                                <TableCell>Director</TableCell>
                                <TableCell>Endereço</TableCell>
                                <TableCell>Província</TableCell>
                                <TableCell align="right">Acções</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedagencies.map(agency => {
                                return (
                                    <TableRow hover key={agency.id}>
                                        <TableCell>
                                            <Link
                                                color="inherit"
                                                component={RouterLink}
                                                to={`${APP_URL}/recursos/agencias/${agency.id}`}
                                                variant="h6"
                                            >
                                                {agency.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Link
                                                color="inherit"
                                                component={RouterLink}
                                                to={`${APP_URL}/gestao-do-sistema/funcionarios/${agency.manager.id}`}
                                                variant="h6"
                                            >
                                                {agency.manager.full_name}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{agency.address}</TableCell>
                                        <TableCell>{agency.province}</TableCell>
                                        <TableCell align="right">
                                            <Tooltip
                                                title="Editar"
                                                aria-label="editar"
                                            >
                                                <IconButton
                                                    component={RouterLink}
                                                    to={`${APP_URL}/recursos/agencias/${agency.id}/editar`}
                                                >
                                                    <SvgIcon fontSize="small">
                                                        <EditIcon />
                                                    </SvgIcon>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip
                                                title="Ver detalhes"
                                                aria-label="ver detalhes"
                                            >
                                                <IconButton
                                                    component={RouterLink}
                                                    to={`${APP_URL}/recursos/agencias/${agency.id}`}
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
                count={filteredagencies.length}
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
    agencies: PropTypes.array
};

Results.defaultProps = {
    agencies: []
};

export default Results;
