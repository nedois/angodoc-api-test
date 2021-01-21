import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Link as RouterLink, useHistory } from "react-router-dom";
import {
    Avatar,
    Box,
    Container,
    Grid,
    Paper,
    Step,
    StepConnector,
    StepLabel,
    Stepper,
    makeStyles,
    withStyles,
    colors
} from "@material-ui/core";
import FinderIcon from "@material-ui/icons/RecordVoiceOver";
import DocumentIcon from "@material-ui/icons/Description";
import Page from "@dashboard/components/Page";
import FinderDetails from "./FinderDetails";
import DocumentDetails from "./DocumentDetails";
import NewFinderForm from "./NewFinderForm";
import { DOCUMENTS } from "@dashboard/routes/uris";
import Header from "@dashboard/components/Header";

const steps = [
    {
        label: "Informações do encontrador",
        icon: FinderIcon
    },
    {
        label: "Informações do documento",
        icon: DocumentIcon
    }
];

const CustomStepConnector = withStyles(theme => ({
    vertical: {
        marginLeft: 19,
        padding: 0
    },
    line: {
        borderColor: theme.palette.divider
    }
}))(StepConnector);

const useCustomStepIconStyles = makeStyles(theme => ({
    root: {},
    active: {
        backgroundColor: theme.palette.secondary.main,
        boxShadow: theme.shadows[10]
    },
    completed: {
        backgroundColor: theme.palette.secondary.main
    }
}));

const breadcrumbItems = [
    {
        label: "Recursos"
    },
    {
        label: "Documentos",
        to: DOCUMENTS.ALL_URI
    },
    {
        label: "Registar documento",
        active: true
    }
];

function CustomStepIcon({ active, completed, icon }) {
    const classes = useCustomStepIconStyles();

    const Icon = steps[icon - 1].icon;

    return (
        <Avatar
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed
            })}
        >
            <Icon size="20" />
        </Avatar>
    );
}

CustomStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
    icon: PropTypes.number
};

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: "100%",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    },
    avatar: {
        backgroundColor: colors.red[600]
    }
}));

function DocumentCreatePage() {
    const classes = useStyles();
    const [finder, setFinder] = useState({});
    const [newFinder, setNewFinder] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const history = useHistory();

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleComplete = () => {
        history.push(DOCUMENTS.URI);
    };

    return (
        <Page className={classes.root} title="Registar documento">
            <Container>
                <Box mb={3}>
                    <Header title="Registar documento" breadcrumbItems={breadcrumbItems} />
                </Box>

                <Paper>
                    <Grid container>
                        <Grid item xs={12} md={3}>
                            <Stepper
                                activeStep={activeStep}
                                connector={<CustomStepConnector />}
                                orientation="vertical"
                                component={Box}
                                bgcolor="transparent"
                            >
                                {steps.map(step => (
                                    <Step key={step.label}>
                                        <StepLabel StepIconComponent={CustomStepIcon}>{step.label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <Box p={3}>
                                {activeStep === 0 && !newFinder && (
                                    <FinderDetails
                                        setNewFinder={setNewFinder}
                                        onNext={handleNext}
                                        finder={finder}
                                        setFinder={setFinder}
                                    />
                                )}
                                {activeStep === 0 && newFinder && (
                                    <NewFinderForm
                                        setNewFinder={setNewFinder}
                                        onNext={handleNext}
                                        finder={finder}
                                        setFinder={setFinder}
                                    />
                                )}
                                {activeStep === 1 && (
                                    <DocumentDetails finder={finder} onBack={handleBack} onComplete={handleComplete} />
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Page>
    );
}

export default DocumentCreatePage;
