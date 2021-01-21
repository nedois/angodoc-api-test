import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Typography, useTheme, useMediaQuery, makeStyles } from "@material-ui/core";
import Page from "@dashboard/components/Page";
import { APP } from "../../routes/uris";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(3),
        paddingTop: 80,
        paddingBottom: 80
    },
    image: {
        maxWidth: "100%",
        width: 560,
        maxHeight: 300,
        height: "auto"
    }
}));

const NotFoundView = () => {
    const classes = useStyles();
    const theme = useTheme();
    const mobileDevice = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Page className={classes.root} title="404">
            <Container maxWidth="lg">
                <Typography align="center" variant={mobileDevice ? "h4" : "h1"} color="textPrimary">
                    404: A página que tentou acessar não existe
                </Typography>
                <Typography align="center" variant="subtitle2" color="textSecondary">
                    Utilize o menu de navegação para evitar esse tipo de problema.
                </Typography>
                <Box mt={6} display="flex" justifyContent="center">
                    <img alt="Under development" className={classes.image} src="/img/page_not_found.svg" />
                </Box>
                <Box mt={6} display="flex" justifyContent="center">
                    <Button color="secondary" component={RouterLink} to={APP.HOME_URI} variant="outlined">
                        Voltar a página inicial
                    </Button>
                </Box>
            </Container>
        </Page>
    );
};

export default NotFoundView;
