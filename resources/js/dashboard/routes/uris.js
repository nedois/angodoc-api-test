import { DASHBOARD_URI } from "@dashboard/constants";

export const APP = {
    URI: DASHBOARD_URI,
    HOME_URI: `${DASHBOARD_URI}/visao-geral`,
    OVERVIEW_URI: `${DASHBOARD_URI}/visao-geral`
};

export const AGENCIES = {
    URI: `${DASHBOARD_URI}/agencias`,
    CREATE_URI: `${DASHBOARD_URI}/agencias/registar`
};

export const DOCUMENTS = {
    URI: `${DASHBOARD_URI}/documentos`,
    CREATE_URI: `${DASHBOARD_URI}/documentos/registar`
};

export const DOCS = {
    URI: `${DASHBOARD_URI}/docs`,
    WELCOME_URI: `${DASHBOARD_URI}/docs/boas-vindas`
};

export const ERRORS = {
    NOT_FOUND_URI: `${DASHBOARD_URI}/404`
};

export const USERS = {
    URI: `${DASHBOARD_URI}/funcionarios`,
    ALL_URI: `${DASHBOARD_URI}/funcionarios/todos`,
    CREATE_URI: `${DASHBOARD_URI}/funcionarios/registar`,
};

export const FINDERS = {
    URI: `${DASHBOARD_URI}/encontradores`
};

export const PROFILE = {
    URI: `${DASHBOARD_URI}/perfil`
};
