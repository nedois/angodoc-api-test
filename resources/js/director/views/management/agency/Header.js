import React from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
    Box,
    Breadcrumbs,
    Button,
    Grid,
    Link,
    SvgIcon,
    Typography,
    makeStyles
} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const useStyles = makeStyles(theme => ({
    root: {},
    action: {
        marginBottom: theme.spacing(1),
        "& + &": {
            marginLeft: theme.spacing(1)
        }
    },
    actionIcon: {
        marginRight: theme.spacing(1)
    }
}));

function Header({ className, pageTitle, ...rest }) {
    const classes = useStyles();

    return (
        <Grid
            className={clsx(classes.root, className)}
            container
            justify="space-between"
            spacing={3}
            {...rest}
        >
            <Grid item>
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                >
                    <Link
                        variant="body1"
                        color="inherit"
                        to="/app"
                        component={RouterLink}
                    >
                        Recursos
                    </Link>
                    <Link
                        variant="body1"
                        color="inherit"
                        to="/app/management"
                        component={RouterLink}
                    >
                        Agências
                    </Link>
                    <Typography variant="body1" color="textPrimary">
                        {pageTitle}
                    </Typography>
                </Breadcrumbs>
                <Box mt={2}>
                    <Typography variant="h3" color="textPrimary">
                        {pageTitle}
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
}

Header.propTypes = {
    className: PropTypes.string
};

export default Header;
