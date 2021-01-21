import React, { useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import { Avatar, Box, ButtonBase, Hidden, Menu, MenuItem, Typography, makeStyles } from "@material-ui/core";
import useAuth from "@dashboard/hooks/useAuth";
import { PROFILE } from "@dashboard/routes/uris";
import { APP_URL } from "@dashboard/constants";

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

const Account = () => {
    const classes = useStyles();
    const ref = useRef(null);
    const { user } = useAuth();
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
            await axios.get(`${APP_URL}/logout`);
            window.location.href = APP_URL;
        } catch (err) {
            console.error(err);
            enqueueSnackbar("Erro ao terminar sessão", {
                variant: "error"
            });
        }
    };

    return (
        <>
            <Box display="flex" alignItems="center" component={ButtonBase} onClick={handleOpen} ref={ref}>
                <Avatar alt="User" className={classes.avatar} src={user.avatar} />
                <Hidden smDown>
                    <Typography variant="h6" color="inherit">
                        {`${user.first_name} ${user.last_name}`}
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
                <MenuItem component={RouterLink} to={PROFILE.URI}>
                    Meu perfil
                </MenuItem>
                <MenuItem onClick={handleLogout}>Sair</MenuItem>
            </Menu>
        </>
    );
};

export default Account;
