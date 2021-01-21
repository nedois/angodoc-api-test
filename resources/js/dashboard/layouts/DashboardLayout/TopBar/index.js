import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { AppBar, Box, Hidden, IconButton, Toolbar, makeStyles, SvgIcon } from "@material-ui/core";
import { Menu as MenuIcon } from "react-feather";
import Logo from "@dashboard/components/Logo";
import { APP_URL } from "@dashboard/constants";
import Account from "./Account";

const useStyles = makeStyles(theme => ({
    root: {
        zIndex: theme.zIndex.drawer + 100,
        boxShadow: "none",
        backgroundColor: theme.palette.primary.main
    },
    toolbar: {
        minHeight: 64
    }
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
    const classes = useStyles();

    return (
        <AppBar className={clsx(classes.root, className)} {...rest}>
            <Toolbar className={classes.toolbar}>
                <Hidden lgUp>
                    <IconButton color="inherit" onClick={onMobileNavOpen}>
                        <SvgIcon fontSize="small">
                            <MenuIcon />
                        </SvgIcon>
                    </IconButton>
                </Hidden>
                <Hidden mdDown>
                    <a href={APP_URL}>
                        <Logo />
                    </a>
                </Hidden>
                <Box ml={2} flexGrow={1} />
                <Box ml={2}>
                    <Account />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

TopBar.propTypes = {
    className: PropTypes.string,
    onMobileNavOpen: PropTypes.func
};

TopBar.defaultProps = {
    onMobileNavOpen: () => {}
};

export default TopBar;
