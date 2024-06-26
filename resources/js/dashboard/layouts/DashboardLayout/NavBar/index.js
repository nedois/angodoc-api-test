import React, { Fragment, useEffect } from "react";
import { useLocation, matchPath } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import {
    Avatar,
    Box,
    Divider,
    Drawer,
    Hidden,
    Link,
    List,
    ListSubheader,
    Typography,
    makeStyles
} from "@material-ui/core";
import Logo from "@dashboard/components/Logo";
import useAuth from "@dashboard/hooks/useAuth";
import { APP, PROFILE, DOCS } from "@dashboard/routes/uris";
import NavItem from "./NavItem";
import sections from "./sections";

function renderNavItems({ role, items, pathname, depth = 0 }) {
    return (
        <List disablePadding>
            {items.reduce((acc, item) => reduceChildRoutes({ acc, item, pathname, depth, role }), [])}
        </List>
    );
}

function reduceChildRoutes({ acc, role, pathname, item, depth }) {
    const key = item.title + depth;

    if (item.onlyFor && !item.onlyFor.includes(role)) {
        acc.push(<Fragment key={key} />);
        return acc;
    }

    if (item.items) {
        const open = matchPath(pathname, {
            path: item.href,
            exact: false
        });

        acc.push(
            <NavItem depth={depth} icon={item.icon} info={item.info} key={key} open={Boolean(open)} title={item.title}>
                {renderNavItems({
                    depth: depth + 1,
                    pathname,
                    items: item.items,
                    role
                })}
            </NavItem>
        );
    } else {
        acc.push(
            <NavItem depth={depth} href={item.href} icon={item.icon} info={item.info} key={key} title={item.title} />
        );
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
    },
    avatar: {
        cursor: "pointer",
        width: 64,
        height: 64
    }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
    const classes = useStyles();
    const location = useLocation();
    const { user } = useAuth();

    useEffect(() => {
        if (openMobile && onMobileClose) {
            onMobileClose();
        }
    }, [location.pathname]);

    const content = (
        <Box height="100%" display="flex" flexDirection="column">
            <PerfectScrollbar options={{ suppressScrollX: true }}>
                <Hidden lgUp>
                    <Box p={2} display="flex" justifyContent="center">
                        <RouterLink to={APP.HOME_URI}>
                            <Logo />
                        </RouterLink>
                    </Box>
                </Hidden>
                <Box p={2}>
                    <Box display="flex" justifyContent="center">
                        <RouterLink to={PROFILE.URI}>
                            <Avatar alt="User" className={classes.avatar} src={user.avatar} />
                        </RouterLink>
                    </Box>
                    <Box mt={2} textAlign="center">
                        <Link component={RouterLink} to={PROFILE.URI} variant="h5" color="textPrimary" underline="none">
                            {`${user.first_name} ${user.last_name}`}
                        </Link>
                        <Typography variant="body2" color="textSecondary">
                            {user.role.toUpperCase()}
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Box p={2}>
                    {sections.map(section => (
                        <List
                            key={section.subheader}
                            subheader={
                                <ListSubheader disableGutters disableSticky>
                                    {section.subheader}
                                </ListSubheader>
                            }
                        >
                            {renderNavItems({
                                items: section.items,
                                pathname: location.pathname,
                                role: user.role
                            })}
                        </List>
                    ))}
                </Box>
                <Divider />
                <Box p={2}>
                    <Box p={2} borderRadius="borderRadius" bgcolor="background.dark">
                        <Typography variant="h6" color="textPrimary">
                            Precisa de ajuda?
                        </Typography>
                        <Link variant="subtitle1" color="secondary" component={RouterLink} to={DOCS.URI}>
                            Consulte o manual de utilização
                        </Link>
                    </Box>
                </Box>
            </PerfectScrollbar>
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
