import React from "react";
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
    Typography,
    Tooltip,
    TextField,
    makeStyles
} from "@material-ui/core";
import { Edit as EditIcon, ArrowRight as ArrowRightIcon, Search as SearchIcon } from "react-feather";

import { AGENCIES } from "@dashboard/routes/uris";
import LoadingScreen from "@dashboard/components/LoadingScreen";

const sortOptions = [
    {
        value: "-name",
        label: "Nome (Z-A)"
    },
    {
        value: "name",
        label: "Nome (A-Z)"
    },
    {
        value: "-province",
        label: "Província (Z-A)"
    },
    {
        value: "province",
        label: "Província (A-Z)"
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

function Results({
    className,
    agencies,
    agenciesCount,
    setLimit,
    limit,
    loading,
    page,
    setPage,
    orderBy,
    setOrderBy,
    setLoading,
    query,
    setQuery
}) {
    const classes = useStyles();

    const handleQueryChange = event => {
        setQuery(event.target.value);
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
        <Card className={clsx(classes.root, className)}>
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
                <Box minWidth={700}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>Endereço</TableCell>
                                <TableCell>Província</TableCell>
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
                            ) : !agencies.length ? (
                                <TableRow>
                                    <TableCell colSpan={9}>
                                        <Box display="flex" justifyContent="center" py={5}>
                                            <Typography variant="h5">
                                                {query ? `Sem resultados para a pesquisa ${query}` : "Sem agências"}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                agencies.map(agency => {
                                    return (
                                        <TableRow hover key={agency.id}>
                                            <TableCell>
                                                <Link
                                                    color="inherit"
                                                    component={RouterLink}
                                                    to={`${AGENCIES.URI}/${agency.id}`}
                                                    variant="h6"
                                                >
                                                    {agency.attributes.name}
                                                </Link>
                                            </TableCell>
                                            <TableCell>{agency.attributes.address}</TableCell>
                                            <TableCell>{agency.attributes.province}</TableCell>
                                            <TableCell align="right">
                                                <Tooltip title="Editar" aria-label="editar">
                                                    <IconButton
                                                        component={RouterLink}
                                                        to={`${AGENCIES.URI}/${agency.id}/editar`}
                                                    >
                                                        <SvgIcon fontSize="small">
                                                            <EditIcon />
                                                        </SvgIcon>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Ver detalhes" aria-label="ver detalhes">
                                                    <IconButton
                                                        component={RouterLink}
                                                        to={`${AGENCIES.URI}/${agency.id}`}
                                                    >
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
                </Box>
            </PerfectScrollbar>
            {agencies.length === 0 ? null : (
                <TablePagination
                    component="div"
                    count={agenciesCount}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handleLimitChange}
                    backIconButtonText="Página anterior"
                    nextIconButtonText="Próxima página"
                    labelRowsPerPage="Agências por página"
                    page={agencies.length === 0 ? 0 : limit <= agenciesCount ? page : 0}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            )}
        </Card>
    );
}

Results.propTypes = {
    className: PropTypes.string,
    agencies: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
    limit: PropTypes.number.isRequired,
    setLimit: PropTypes.func.isRequired,
    orderBy: PropTypes.string.isRequired,
    setOrderBy: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired,
    setQuery: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};

export default Results;
