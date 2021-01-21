import React from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import { Breadcrumbs, Link, Typography } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

function BreadCrumbsHeader({ items }) {
    return (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            {items.map((item, key) => {
                if (item.to) {
                    return (
                        <Link key={key} variant="body1" color="inherit" to={item.to} component={RouterLink}>
                            {item.label}
                        </Link>
                    );
                } else {
                    return (
                        <Typography key={key} variant="body1" color={item.active ? "textPrimary" : "inherit"}>
                            {item.label}
                        </Typography>
                    );
                }
            })}
        </Breadcrumbs>
    );
}

BreadCrumbsHeader.propTypes = {
    items: PropTypes.array.isRequired
};

export default BreadCrumbsHeader;
