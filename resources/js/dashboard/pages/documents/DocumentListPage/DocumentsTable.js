import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import LoadingScreen from "@dashboard/components/LoadingScreen";

import {
    Box,
    Card,
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
    Typography,
    Tooltip,
    TextField,
    makeStyles
} from "@material-ui/core";
import { Edit as EditIcon, ArrowRight as ArrowRightIcon, Search as SearchIcon } from "react-feather";

import useAuth from "@dashboard/hooks/useAuth";
import { DOCUMENTS, FINDERS, AGENCIES, USERS } from "@dashboard/routes/uris";

const sortOptions = [
    {
        value: "-reference",
        label: "Referência (Z-A)"
    },
    {
        value: "reference",
        label: "Referência (A-Z)"
    },
    {
        value: "-owner",
        label: "Proprietario (Z-A)"
    },
    {
        value: "owner",
        label: "Proprietario (A-Z)"
    },
    {
        value: "-created_at",
        label: "Data de registo (Z-A)"
    },
    {
        value: "created_at",
        label: "Data de registo (A-Z)"
    },
    {
        value: "-updated_at",
        label: "Data de recuperação (Z-A)"
    },
    {
        value: "updated_at",
        label: "Data de recuperação (A-Z)"
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

function DocumentsTable({
    className,
    documents,
    page,
    setPage,
    limit,
    currentTab,
    setCurrentTab,
    setLimit,
    orderBy,
    setOrderBy,
    docsCount,
    setLoading,
    query,
    setQuery,
    loading,
    ...rest
}) {
    const classes = useStyles();
    const { user } = useAuth();

    const tabs = [
        {
            value: "index",
            label: user.role === "administrador" ? "Nas agências" : "Na agência"
        },
        {
            value: "only_recovered",
            label: "Recuperados"
        },
        {
            value: "only_trashed",
            label: "Deletados"
        }
    ];

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
                    placeholder="Procurar documento (referência)"
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
                            <TableCell>Referência</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Proprietário</TableCell>
                            <TableCell>Encontrado por</TableCell>
                            <TableCell>Agência</TableCell>
                            <TableCell>Registrado por</TableCell>
                            <TableCell>Criado</TableCell>
                            <TableCell>Recuperado</TableCell>
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
                        ) : !documents.length ? (
                            <TableRow>
                                <TableCell colSpan={9}>
                                    <Box display="flex" justifyContent="center" py={5}>
                                        <Typography variant="h5">
                                            {query ? `Sem resultados para a pesquisa ${query}` : "Sem documentos"}
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : (
                            documents.map(document => {
                                return (
                                    <TableRow hover key={document.id}>
                                        <TableCell>
                                            <Link
                                                color="inherit"
                                                component={RouterLink}
                                                to={{ pathname: `${DOCUMENTS.URI}/${document.id}`, document }}
                                                variant="h6"
                                            >
                                                {document.attributes.reference}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{document.attributes.document_type}</TableCell>
                                        <TableCell>{document.attributes.owner}</TableCell>
                                        <TableCell>
                                            <Link
                                                color="inherit"
                                                component={RouterLink}
                                                to={`${FINDERS.URI}/${document.relationships.finder.data.id}`}
                                                variant="h6"
                                            >
                                                {document.attributes.finder}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Link
                                                color="inherit"
                                                component={RouterLink}
                                                to={`${AGENCIES.URI}/${document.relationships.agency.data.id}`}
                                                variant="h6"
                                            >
                                                {document.attributes.agency}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Link
                                                color="inherit"
                                                component={RouterLink}
                                                to={`${USERS.URI}/${document.relationships.creator.data.id}`}
                                                variant="h6"
                                            >
                                                {document.attributes.creator}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{document.attributes.created_at}</TableCell>
                                        <TableCell>{document.attributes.recovered_at ? "Sim" : "Não"}</TableCell>
                                        <TableCell align="right">
                                            <Tooltip title="Editar documento" aria-label="editar documento">
                                                <IconButton
                                                    component={RouterLink}
                                                    to={{
                                                        pathname: `${DOCUMENTS.URI}/${document.id}/editar`,
                                                        document
                                                    }}
                                                >
                                                    <SvgIcon fontSize="small">
                                                        <EditIcon />
                                                    </SvgIcon>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Ver documento" aria-label="ver documento">
                                                <IconButton
                                                    component={RouterLink}
                                                    to={{ pathname: `${DOCUMENTS.URI}/${document.id}`, document }}
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
            </PerfectScrollbar>
            {documents.length === 0 ? null : (
                <TablePagination
                    component="div"
                    count={docsCount}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handleLimitChange}
                    backIconButtonText="Página anterior"
                    nextIconButtonText="Próxima página"
                    labelRowsPerPage="Documentos por página"
                    page={documents.length === 0 ? 0 : limit <= docsCount ? page : 0}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            )}
        </Card>
    );
}

DocumentsTable.propTypes = {
    className: PropTypes.string,
    documents: PropTypes.array.isRequired,
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
    total: PropTypes.number,
    loading: PropTypes.bool.isRequired
};

export default DocumentsTable;
