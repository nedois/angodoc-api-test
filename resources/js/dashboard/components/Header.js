import React from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Box, Button, Grid, SvgIcon, Typography, makeStyles } from "@material-ui/core";
import { PlusCircle as PlusCircleIcon, Edit as EditIcon } from "react-feather";

import BreadCrumbsHeader from "@dashboard/components/BreadCrumbsHeader";

const useStyles = makeStyles(theme => ({
    root: {},
    action: {
        marginBottom: theme.spacing(1),
        "& + &": {
            marginLeft: theme.spacing(1)
        }
    }
}));

const Header = ({
    className,
    breadcrumbItems,
    title,
    actionButtonType,
    actionButtonLabel,
    actionButtonTo,
    children,
    ...rest
}) => {
    const classes = useStyles();

    return (
        <>
            <Grid className={clsx(classes.root, className)} container justify="space-between" spacing={3} {...rest}>
                <Grid item>
                    <BreadCrumbsHeader items={breadcrumbItems} />
                    <Box mt={2}>
                        <Typography variant="h3" color="textPrimary">
                            {title}
                        </Typography>
                    </Box>
                </Grid>

                {actionButtonTo && (
                    <Grid item>
                        <Button
                            color="secondary"
                            variant="contained"
                            component={RouterLink}
                            to={actionButtonTo}
                            startIcon={
                                <SvgIcon fontSize="small">
                                    {actionButtonType === "edit" ? <EditIcon /> : <PlusCircleIcon />}
                                </SvgIcon>
                            }
                        >
                            {actionButtonLabel}
                        </Button>
                    </Grid>
                )}
            </Grid>
            {children}
        </>
    );
};

Header.propTypes = {
    className: PropTypes.string,
    breadcrumbItems: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    actionButtonType: PropTypes.string,
    actionButtonLabel: PropTypes.string,
    actionButtonTo: PropTypes.string
};

export default Header;
