import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import LoadingScreen from "@dashboard/components/LoadingScreen";
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
import { Edit as EditIcon, ArrowRight as ArrowRightIcon, Search as SearchIcon } from "react-feather";

import { FINDERS } from "@dashboard/routes/uris";
import getInitials from "@dashboard/utils/getInitials";

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

function FindersTable({
    className,
    finders,
    page,
    setPage,
    limit,
    setLimit,
    currentTab,
    setCurrentTab,
    orderBy,
    setOrderBy,
    findersCount,
    setLoading,
    query,
    setQuery,
    loading,
    ...rest
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
                            <TableCell>Idade</TableCell>
                            <TableCell>Sexo</TableCell>
                            <TableCell>Ocupação</TableCell>
                            <TableCell>Telefone</TableCell>
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
                        ) : !finders.length ? (
                            <TableRow>
                                <TableCell colSpan={9}>
                                    <Box display="flex" justifyContent="center" py={5}>
                                        <Typography variant="h5">Sem encontradores</Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : (
                            finders.map(finder => {
                                return (
                                    <TableRow hover key={finder.id}>
                                        <TableCell>
                                            <Box display="flex" alignItems="center">
                                                <Avatar className={classes.avatar} src={finder.attributes.avatar_location}>
                                                    {getInitials(`${finder.attributes.first_name} ${finder.attributes.last_name}`)}
                                                </Avatar>
                                                <div>
                                                    <Link
                                                        color="inherit"
                                                        component={RouterLink}
                                                        to={`${FINDERS.URI}/${finder.id}`}
                                                        variant="h6"
                                                    >
                                                        {`${finder.attributes.first_name} ${finder.attributes.last_name}`}
                                                    </Link>
                                                    <Typography variant="body2" color="textSecondary">
                                                        {finder.attributes.bi}
                                                    </Typography>
                                                </div>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{finder.attributes.age}</TableCell>
                                        <TableCell>{finder.attributes.gender === "M" ? "Masculino" : "Feminino"}</TableCell>
                                        <TableCell>{finder.attributes.job}</TableCell>
                                        <TableCell>{finder.attributes.phone_number}</TableCell>
                                        <TableCell>{finder.attributes.address}</TableCell>
                                        <TableCell>{finder.attributes.province}</TableCell>
                                        <TableCell align="right">
                                            <Tooltip title="Editar encontrador" aria-label="editar encontrador">
                                                <IconButton
                                                    component={RouterLink}
                                                    to={`${FINDERS.URI}/${finder.id}/editar`}
                                                >
                                                    <SvgIcon fontSize="small">
                                                        <EditIcon />
                                                    </SvgIcon>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Ver encontrador" aria-label="ver encontrador">
                                                <IconButton component={RouterLink} to={`${FINDERS.URI}/${finder.id}`}>
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
            {finders.length === 0 ? null : (
                <TablePagination
                    component="div"
                    count={findersCount}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handleLimitChange}
                    backIconButtonText="Página anterior"
                    nextIconButtonText="Próxima página"
                    labelRowsPerPage="Encontradores por página"
                    page={finders.length === 0 ? 0 : limit <= findersCount ? page : 0}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            )}
        </Card>
    );
}

FindersTable.propTypes = {
    className: PropTypes.string,
    finders: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
    limit: PropTypes.number.isRequired,
    setLimit: PropTypes.func.isRequired,
    orderBy: PropTypes.string.isRequired,
    setOrderBy: PropTypes.func.isRequired,
    findersCount: PropTypes.number,
    loading: PropTypes.bool.isRequired
};

export default FindersTable;
