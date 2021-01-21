import React from "react";
import {
    makeStyles,
    Card,
    CardHeader,
    Divider,
    Table,
    TableCell,
    TableBody,
    TableRow,
    Typography
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    fontWeightMedium: {
        fontWeight: theme.typography.fontWeightMedium
    }
}));

function DocumentCard({ document, children }) {
    const classes = useStyles();

    return (
        <Card>
            <CardHeader title="Documentos" />
            <Divider />
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>Referência</TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {document.attributes.reference}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>Tipo</TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {document.attributes.document_type}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>Proprietário</TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {document.attributes.owner}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>Data de emissão</TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {document.attributes.date_emission}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>Registado por</TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {document.attributes.creator}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>Comentário</TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {document.attributes.commentary ? document.attributes.commentary : "Sem comentários"}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.fontWeightMedium}>Recuperado</TableCell>
                        <TableCell>
                            <Typography variant="body2" color="textSecondary">
                                {document.attributes.recovered_at ? document.attributes.recovered_at : "Não"}
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            {children}
        </Card>
    );
}

export default DocumentCard;
