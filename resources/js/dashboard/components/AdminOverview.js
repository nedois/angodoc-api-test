import React, { useState, useEffect, useCallback } from "react";
import useIsMountedRef from "@dashboard/hooks/useIsMountedRef";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Card, Grid, CircularProgress, Typography, makeStyles } from "@material-ui/core";

import axios from "@dashboard/utils/axios";
import { API_URL } from "@dashboard/constants";

const useStyles = makeStyles(theme => ({
    root: {},
    item: {
        padding: theme.spacing(3),
        textAlign: "center",
        [theme.breakpoints.up("md")]: {
            "&:not(:last-of-type)": {
                borderRight: `1px solid ${theme.palette.divider}`
            }
        },
        [theme.breakpoints.down("sm")]: {
            "&:not(:last-of-type)": {
                borderBottom: `1px solid ${theme.palette.divider}`
            }
        }
    },
    valueContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}));

const Overview = ({ className, ...rest }) => {
    const classes = useStyles();
    const isMountedRef = useIsMountedRef();
    const { enqueueSnackbar } = useSnackbar();

    const [nonRecoveredCount, setNonRecoveredCount] = useState("loading");
    const [recoveredCount, setRecoveredCount] = useState("loading");
    const [trashedCount, setTrashedCount] = useState("loading");

    const getDocuments = useCallback(() => {
        axios
            .get(`${API_URL}/documents?page[page]=1&page[limit]=1`)
            .then(response => {
                if (isMountedRef.current) {
                    setNonRecoveredCount(response.data.meta.page.total);
                }
            })
            .catch(error => {
                enqueueSnackbar(error.message, {
                    variant: "error"
                });
            });

        axios
            .get(`${API_URL}/documents?filter[only_recovered]&page[page]=1&page[limit]=1`)
            .then(response => {
                if (isMountedRef.current) {
                    setRecoveredCount(response.data.meta.page.total);
                }
            })
            .catch(error => {
                enqueueSnackbar(error.message, {
                    variant: "error"
                });
            });

        axios
            .get(`${API_URL}/documents?filter[only_trashed]&page[page]=1&page[limit]=1`)
            .then(response => {
                if (isMountedRef.current) {
                    setTrashedCount(response.data.meta.page.total);
                }
            })
            .catch(error => {
                enqueueSnackbar(error.message, {
                    variant: "error"
                });
            });
    }, [isMountedRef]);

    useEffect(() => {
        getDocuments();
    }, [getDocuments]);

    const overviews = [
        {
            label: "Documentos nas agências",
            count: nonRecoveredCount
        },
        {
            label: "Documentos recuperados",
            count: recoveredCount
        },
        {
            label: "Documentos deletados",
            count: trashedCount
        }
    ];

    return (
        <Card className={clsx(classes.root, className)} {...rest}>
            <Grid alignItems="center" container justify="space-between">
                {overviews.map((overview, key) => (
                    <Grid key={key} className={classes.item} item md={4} xs={12}>
                        <Typography component="h2" gutterBottom variant="overline" color="textSecondary">
                            {overview.label}
                        </Typography>
                        <div className={classes.valueContainer}>
                            {isNaN(overview.count) ? (
                                <CircularProgress />
                            ) : (
                                <Typography variant="h3" color="textPrimary">
                                    {overview.count}
                                </Typography>
                            )}
                        </div>
                    </Grid>
                ))}
            </Grid>
        </Card>
    );
};

Overview.propTypes = {
    className: PropTypes.string
};

export default Overview;
