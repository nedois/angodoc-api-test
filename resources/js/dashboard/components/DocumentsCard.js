import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
    Box,
    Card,
    IconButton,
    Link,
    SvgIcon,
    CardHeader,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip,
    Typography,
    makeStyles
} from "@material-ui/core";
import { Edit as EditIcon, ArrowRight as ArrowRightIcon } from "react-feather";

import { DOCUMENTS } from "@dashboard/routes/uris";

const sortOptions = [
    {
        value: "reference|desc",
        label: "Referência (Z-A)"
    },
    {
        value: "reference|asc",
        label: "Referência (A-Z)"
    },
    {
        value: "owner|desc",
        label: "Proprietario (Z-A)"
    },
    {
        value: "owner|asc",
        label: "Proprietario (A-Z)"
    }
];

function applyFilters(documents, query, filters) {
    return documents.filter(document => {
        let matches = true;

        if (query) {
            const properties = ["reference", "owner"];
            let containsQuery = false;

            properties.forEach(property => {
                if (document[property].toLowerCase().includes(query.toLowerCase())) {
                    containsQuery = true;
                }
            });

            if (!containsQuery) {
                matches = false;
            }
        }

        Object.keys(filters).forEach(key => {
            const value = filters[key];

            if (value && !document[key] !== value) {
                matches = false;
            }
        });

        return matches;
    });
}

function applyPagination(documents, page, limit) {
    return documents.slice(page * limit, page * limit + limit);
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

function applySort(documents, sort) {
    const [orderBy, order] = sort.split("|");
    const comparator = getComparator(order, orderBy);
    const stabilizedThis = documents.map((el, index) => [el, index]);

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

function DocumentsTable({ className, documents, ...rest }) {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState(sortOptions[0].value);
    const [filters, setFilters] = useState({
        recovered: null,
        deleted: null
    });

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleLimitChange = event => {
        setLimit(event.target.value);
    };

    const filteredDocuments = applyFilters(documents, query, filters);
    const sortedDocuments = applySort(filteredDocuments, sort);
    const paginatedDocuments = applyPagination(sortedDocuments, page, limit);

    return (
        <Card className={clsx(classes.root, className)} {...rest}>
            <CardHeader title="Documentos encontrados" />
            <Divider />
            <PerfectScrollbar>
                <Box minWidth={700}>
                    {documents.length === 0 ? (
                        <Box py={4}>
                            <Typography align="center">Encontrador não encontrou nenhum documento</Typography>
                        </Box>
                    ) : (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Referência</TableCell>
                                    <TableCell>Tipo</TableCell>
                                    <TableCell>Proprietário</TableCell>
                                    <TableCell align="right">Acções</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedDocuments.map(document => {
                                    if (document.type != "documents") return null;
                                    return (
                                        <TableRow hover key={document.id}>
                                            <TableCell>
                                                <Link
                                                    color="inherit"
                                                    component={RouterLink}
                                                    to={`${DOCUMENTS.URI}/${document.id}`}
                                                    variant="h6"
                                                >
                                                    {document.attributes.reference}
                                                </Link>
                                            </TableCell>
                                            <TableCell>{document.attributes.document_type}</TableCell>
                                            <TableCell>{document.attributes.owner}</TableCell>
                                            <TableCell align="right">
                                                <Tooltip title="Editar" aria-label="editar">
                                                    <IconButton
                                                        component={RouterLink}
                                                        to={`${DOCUMENTS.URI}/${document.id}/editar`}
                                                    >
                                                        <SvgIcon fontSize="small">
                                                            <EditIcon />
                                                        </SvgIcon>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Ver detalhes" aria-label="ver detalhes">
                                                    <IconButton
                                                        component={RouterLink}
                                                        to={`${DOCUMENTS.URI}/${document.id}`}
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
                    )}
                </Box>
            </PerfectScrollbar>
            <TablePagination
                component="div"
                count={filteredDocuments.length}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handleLimitChange}
                backIconButtonText="Página anterior"
                nextIconButtonText="Próxima página"
                labelRowsPerPage="Documentos por página"
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
}

DocumentsTable.propTypes = {
    className: PropTypes.string,
    documents: PropTypes.array
};

DocumentsTable.defaultProps = {
    documents: []
};

export default DocumentsTable;