import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import {
    Avatar,
    Box,
    Breadcrumbs,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    Link,
    Paper,
    Step,
    StepConnector,
    StepLabel,
    Stepper,
    Typography,
    makeStyles,
    withStyles,
    colors
} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Star as StarIcon } from "react-feather";
import FinderIcon from "@material-ui/icons/RecordVoiceOver";
import DocumentIcon from "@material-ui/icons/Description";
import Page from "../../../../components/Page";
import ManagerDetails from "./ManagerDetails";
import AgencyDetails from "./AgencyDetails";
import NewManagerForm from "./NewManagerForm";
import { APP_URL } from "../../../../config";

const steps = [
    {
        label: "Informações do director",
        icon: FinderIcon
    },
    {
        label: "Informações da agência",
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

function ProjectCreateView({ history }) {
    const classes = useStyles();
    const [manager, setManager] = useState({});
    const [newManager, setNewManager] = useState(false);
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleComplete = () => {
        history.push(`${APP_URL}/recursos/agencias`);
    };

    return (
        <Page className={classes.root} title="Criar agência">
            <Container>
                <Box mb={3}>
                    <Breadcrumbs
                        separator={<NavigateNextIcon fontSize="small" />}
                        aria-label="breadcrumb"
                    >
                        <Link
                            variant="body1"
                            color="inherit"
                            to={`${APP_URL}/recursos/documentos`}
                            component={RouterLink}
                        >
                            Recursos
                        </Link>
                        <Link
                            variant="body1"
                            color="inherit"
                            to={`${APP_URL}/recursos/agencias`}
                            component={RouterLink}
                        >
                            Agência
                        </Link>
                        <Typography variant="body1" color="textPrimary">
                            Criar nova agência
                        </Typography>
                    </Breadcrumbs>
                    <Typography variant="h3" color="textPrimary">
                        Criar nova agência
                    </Typography>
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
                                        <StepLabel
                                            StepIconComponent={CustomStepIcon}
                                        >
                                            {step.label}
                                        </StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <Box p={3}>
                                {activeStep === 0 && !newManager && (
                                    <ManagerDetails
                                        setNewManager={setNewManager}
                                        onNext={handleNext}
                                        manager={manager}
                                        setManager={setManager}
                                    />
                                )}
                                {activeStep === 0 && newManager && (
                                    <NewManagerForm
                                        setNewManager={setNewManager}
                                        onNext={handleNext}
                                        setManager={setManager}
                                    />
                                )}
                                {activeStep === 1 && (
                                    <AgencyDetails
                                        manager={manager}
                                        onBack={handleBack}
                                        onComplete={handleComplete}
                                    />
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Page>
    );
}

export default ProjectCreateView;
