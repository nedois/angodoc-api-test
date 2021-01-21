import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Avatar, Box, Card, CardContent, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {},
    name: {
        marginTop: theme.spacing(1)
    },
    avatar: {
        height: 100,
        width: 100
    }
}));

const ProfileDetails = ({ className, user }) => {
    const classes = useStyles();

    return (
        <Card className={clsx(classes.root, className)}>
            <CardContent>
                <Box display="flex" alignItems="center" flexDirection="column" textAlign="center">
                    <Avatar className={classes.avatar} src={user.avatar} />
                    <Box mt={2}>
                        <Typography className={classes.name} color="textPrimary" gutterBottom variant="h3">
                            {`${user.first_name} ${user.last_name}`}
                        </Typography>
                        <Typography color="textPrimary" variant="body1">
                            {user.role.toUpperCase()}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

ProfileDetails.propTypes = {
    className: PropTypes.string,
    user: PropTypes.object.isRequired
};

export default ProfileDetails;
