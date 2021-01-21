import React, { useState } from "react";
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
import {
    Edit as EditIcon,
    ArrowRight as ArrowRightIcon,
    Search as SearchIcon
} from "react-feather";
import getInitials from "../../../../utils/getInitials";

import { APP_URL } from "../../../../config";

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
        value: "bi|desc",
        label: "N° BI (Z-A)"
    },
    {
        value: "bi|asc",
        label: "N° BI (A-Z)"
    }
];

function applyFilters(finders, query, filters) {
    return finders.filter(finder => {
        let matches = true;

        if (query) {
            const properties = ["bi", "full_name"];
            let containsQuery = false;

            properties.forEach(property => {
                if (
                    finder[property].toLowerCase().includes(query.toLowerCase())
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

            if (value && !finder[key] !== value) {
                matches = false;
            }
        });

        return matches;
    });
}

function applyPagination(finders, page, limit) {
    return finders.slice(page * limit, page * limit + limit);
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

function applySort(finders, sort) {
    const [orderBy, order] = sort.split("|");
    const comparator = getComparator(order, orderBy);
    const stabilizedThis = finders.map((el, index) => [el, index]);

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

function Results({ className, finders, ...rest }) {
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

    const filteredfinders = applyFilters(finders, query, filters);
    const sortedfinders = applySort(filteredfinders, sort);
    const paginatedfinders = applyPagination(sortedfinders, page, limit);

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
                    placeholder="Procurar encontrador (nome ou BI)"
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
                                <TableCell>Idade</TableCell>
                                <TableCell>Ocupação</TableCell>
                                <TableCell>Telefone</TableCell>
                                <TableCell>Endereço</TableCell>
                                <TableCell>Província</TableCell>
                                <TableCell align="right">Acções</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedfinders.map(finder => {
                                return (
                                    <TableRow hover key={finder.id}>
                                        <TableCell>
                                            <Box
                                                display="flex"
                                                alignItems="center"
                                            >
                                                <Avatar
                                                    className={classes.avatar}
                                                    src={finder.avatar_location}
                                                >
                                                    {getInitials(
                                                        finder.full_name
                                                    )}
                                                </Avatar>
                                                <div>
                                                    <Link
                                                        color="inherit"
                                                        component={RouterLink}
                                                        to={`${APP_URL}/recursos/encontradores/${finder.id}`}
                                                        variant="h6"
                                                    >
                                                        {finder.full_name}
                                                    </Link>
                                                    <Typography
                                                        variant="body2"
                                                        color="textSecondary"
                                                    >
                                                        {finder.bi}
                                                    </Typography>
                                                </div>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{finder.age}</TableCell>
                                        <TableCell>{finder.job}</TableCell>
                                        <TableCell>
                                            {finder.telephone}
                                        </TableCell>
                                        <TableCell>{finder.address}</TableCell>
                                        <TableCell>{finder.province}</TableCell>
                                        <TableCell align="right">
                                            <Tooltip
                                                title="Editar"
                                                aria-label="editar"
                                            >
                                                <IconButton
                                                    component={RouterLink}
                                                    to={`${APP_URL}/recursos/encontradores/${finder.id}/editar`}
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
                                                    to={`${APP_URL}/recursos/encontradores/${finder.id}`}
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
                count={filteredfinders.length}
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
    finders: PropTypes.array
};

Results.defaultProps = {
    finders: []
};

export default Results;
