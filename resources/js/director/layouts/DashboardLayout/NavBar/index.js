import React, { useEffect } from "react";
import { useLocation, matchPath } from "react-router";
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
import BusinessIcon from "@material-ui/icons/Business";
import FinderIcon from "@material-ui/icons/RecordVoiceOver";
import DocumentIcon from "@material-ui/icons/Description";
import UsersIcon from "@material-ui/icons/People";
import { useSelector } from "react-redux";
import Logo from "../../../components/Logo";
import NavItem from "./NavItem";

const navConfig = [
    {
        subheader: "Recursos",
        items: [
            {
                title: "Documentos",
                icon: DocumentIcon,
                href: "/recursos/documentos",
                items: [
                    {
                        title: "Todos documentos",
                        href: "/recursos/documentos"
                    },
                    {
                        title: "Todos documentos nessa agência",
                        href:
                            "/recursos/documentos/todos-documentos-nessa-agencia"
                    },
                    {
                        title: "Novo documento",
                        href: "/recursos/documentos/criar-novo-documento"
                    }
                ]
            },
            {
                title: "Encontradores",
                icon: FinderIcon,
                href: "/recursos/encontradores"
            },
            {
                title: "Agências",
                icon: BusinessIcon,
                href: "/recursos/agencias",
                items: [
                    {
                        title: "Todas agências",
                        href: "/recursos/agencias"
                    }
                ]
            }
        ]
    },
    {
        subheader: "Gestão do sistema",
        items: [
            {
                title: "Funcionários",
                icon: UsersIcon,
                href: "/gestao-do-sistema/funcionarios",
                items: [
                    {
                        title: "Todos funcionários",
                        href: "/gestao-do-sistema/funcionarios"
                    },
                    {
                        title: "Novo funcionário",
                        href: "/gestao-do-sistema/funcionarios/novo-funcionario"
                    }
                ]
            }
        ]
    }
];

function renderNavItems({ items, ...rest }) {
    return (
        <List disablePadding>
            {items.reduce(
                (acc, item) => reduceChildRoutes({ acc, item, ...rest }),
                []
            )}
        </List>
    );
}

function reduceChildRoutes({ acc, pathname, item, depth = 0 }) {
    const key = item.title + depth;

    if (item.items) {
        const open = matchPath(pathname, {
            path: item.href,
            exact: false
        });

        acc.push(
            <NavItem
                depth={depth}
                icon={item.icon}
                key={key}
                info={item.info}
                open={Boolean(open)}
                title={item.title}
            >
                {renderNavItems({
                    depth: depth + 1,
                    pathname,
                    items: item.items
                })}
            </NavItem>
        );
    } else {
        item.hiddenForOperator
            ? null
            : acc.push(
                  <NavItem
                      depth={depth}
                      href={item.href}
                      icon={item.icon}
                      key={key}
                      info={item.info}
                      title={item.title}
                  />
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

function NavBar({ openMobile, onMobileClose }) {
    const classes = useStyles();
    const location = useLocation();
    const { user } = useSelector(state => state.account);

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
                        <RouterLink to="/">
                            <Logo />
                        </RouterLink>
                    </Box>
                </Hidden>
                <Box p={2}>
                    <Box display="flex" justifyContent="center">
                        <RouterLink to="/app/account">
                            <Avatar
                                alt="User"
                                className={classes.avatar}
                                src={user.avatar}
                            />
                        </RouterLink>
                    </Box>
                    <Box mt={2} textAlign="center">
                        <Link
                            component={RouterLink}
                            to="/app/account"
                            variant="h5"
                            color="textPrimary"
                            underline="none"
                        >
                            {`${user.first_name} ${user.last_name}`}
                        </Link>
                        <Typography variant="body2" color="textSecondary">
                            {user.roles.length
                                ? user.roles[0].name.toUpperCase()
                                : "OPERADOR"}
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Box p={2}>
                    {navConfig.map(config => (
                        <List
                            key={config.subheader}
                            subheader={
                                <ListSubheader disableGutters disableSticky>
                                    {config.subheader}
                                </ListSubheader>
                            }
                        >
                            {renderNavItems({
                                items: config.items,
                                pathname: location.pathname
                            })}
                        </List>
                    ))}
                </Box>
                <Divider />
                <Box p={2}>
                    <Box
                        p={2}
                        borderRadius="borderRadius"
                        bgcolor="background.dark"
                    >
                        <Typography variant="h6" color="textPrimary">
                            Precisa de ajuda?
                        </Typography>
                        <Link
                            variant="subtitle1"
                            color="secondary"
                            component={RouterLink}
                            to="/docs"
                        >
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
                <Drawer
                    anchor="left"
                    classes={{ paper: classes.desktopDrawer }}
                    open
                    variant="persistent"
                >
                    {content}
                </Drawer>
            </Hidden>
        </>
    );
}

NavBar.propTypes = {
    onMobileClose: PropTypes.func,
    openMobile: PropTypes.bool
};

export default NavBar;
