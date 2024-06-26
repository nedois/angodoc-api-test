import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import { Box, Drawer, Hidden, List, makeStyles } from "@material-ui/core";
import Logo from "@dashboard/components/Logo";
import { APP } from "@dashboard/routes/uris";
import { DOCS } from "@dashboard/routes/uris";
import NavItem from "./NavItem";

const items = [
    {
        title: "Boas vindas",
        path: DOCS.WELCOME_URI
    }
];

function renderNavItems({ items, depth = 0 }) {
    return <List disablePadding>{items.reduce((acc, item) => reduceChildRoutes({ acc, item, depth }), [])}</List>;
}

function reduceChildRoutes({ acc, item, depth = 0 }) {
    if (item.items) {
        acc.push(
            <NavItem depth={depth} key={item.path} title={item.title}>
                {renderNavItems({
                    items: item.items,
                    depth: depth + 1
                })}
            </NavItem>
        );
    } else {
        acc.push(<NavItem depth={depth} path={item.path} key={item.path} title={item.title} />);
    }

    return acc;
}

const useStyles = makeStyles(() => ({
    mobileDrawer: {
        width: 256
    },
    desktopDrawer: {
        width: 256,
        top: 64,
        height: "calc(100% - 64px)"
    }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
    const classes = useStyles();
    const location = useLocation();

    useEffect(() => {
        if (openMobile && onMobileClose) {
            onMobileClose();
        }
    }, [location.pathname]);

    const content = (
        <Box height="100%" display="flex" flexDirection="column">
            <Hidden lgUp>
                <Box p={2}>
                    <RouterLink to={APP.HOME_URI}>
                        <Logo />
                    </RouterLink>
                </Box>
            </Hidden>
            <Box p={2}>{renderNavItems({ items })}</Box>
        </Box>
    );

    return (
        <>
            <Hidden lgUp>
                <Drawer
                    anchor="left"
                    classes={{ paper: classes.mobileDrawer }}
                    onClose={onMobileClose}
                    open={openMobile}
                    variant="temporary"
                >
                    {content}
                </Drawer>
            </Hidden>
            <Hidden mdDown>
                <Drawer anchor="left" classes={{ paper: classes.desktopDrawer }} open variant="persistent">
                    {content}
                </Drawer>
            </Hidden>
        </>
    );
};

NavBar.propTypes = {
    onMobileClose: PropTypes.func,
    openMobile: PropTypes.bool
};

export default NavBar;
