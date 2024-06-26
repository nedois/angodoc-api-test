import React, { useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import {
    Avatar,
    Box,
    ButtonBase,
    Hidden,
    Menu,
    MenuItem,
    Typography,
    makeStyles
} from "@material-ui/core";
import { logout } from "../../../actions/accountActions";

const useStyles = makeStyles(theme => ({
    avatar: {
        height: 32,
        width: 32,
        marginRight: theme.spacing(1)
    },
    popover: {
        width: 200
    }
}));

function Account() {
    const classes = useStyles();
    const ref = useRef(null);
    const dispatch = useDispatch();
    const account = useSelector(state => state.account);
    const { enqueueSnackbar } = useSnackbar();
    const [isOpen, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogout = async () => {
        try {
            handleClose();
            await dispatch(logout());
            window.location.reload(false);
        } catch (error) {
            enqueueSnackbar("Unable to logout", {
                variant: "error"
            });
        }
    };

    return (
        <>
            <Box
                display="flex"
                alignItems="center"
                component={ButtonBase}
                onClick={handleOpen}
                ref={ref}
            >
                <Avatar
                    alt="User"
                    className={classes.avatar}
                    src={account.user.avatar_location}
                />
                <Hidden smDown>
                    <Typography variant="h6" color="inherit">
                        {`${account.user.first_name} ${account.user.last_name}`}
                    </Typography>
                </Hidden>
            </Box>
            <Menu
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
                keepMounted
                PaperProps={{ className: classes.popover }}
                getContentAnchorEl={null}
                anchorEl={ref.current}
                open={isOpen}
            >
                <MenuItem component={RouterLink} to="/app/social/profile">
                    Meu perfil
                </MenuItem>
                <MenuItem onClick={handleLogout}>Sair</MenuItem>
            </Menu>
        </>
    );
}

export default Account;
