import React from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
    Box,
    Breadcrumbs,
    Grid,
    Link,
    Typography,
    makeStyles
} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { APP_URL } from "../../../config";

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
                        to={`${APP_URL}/gestao-do-sistema/funcionarios`}
                        component={RouterLink}
                    >
                        Gestão do sistema
                    </Link>
                    <Link
                        variant="body1"
                        color="inherit"
                        to={`${APP_URL}/gestao-do-sistema/funcionarios`}
                        component={RouterLink}
                    >
                        Funcionários
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
