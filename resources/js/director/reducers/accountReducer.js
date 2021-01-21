import produce from "immer";
import {
    LOGOUT,
    SILENT_LOGIN,
    UPDATE_PROFILE,
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    LOGIN_SUCCESS
} from "../actions/accountActions";

const initialState = {
    user: null
};

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST: {
            return produce(state, draft => {
                // Ensure we clear current session
                draft.user = null;
            });
        }

        case LOGIN_FAILURE: {
            return produce(state, () => {
                // Maybe store error
            });
        }

        case LOGIN_SUCCESS: {
            const { user } = action.payload;

            return produce(state, draft => {
                draft.user = user;
            });
        }

        case SILENT_LOGIN: {
            const { user } = action.payload;

            return produce(state, draft => {
                draft.user = user;
            });
        }

        case LOGOUT: {
            return produce(state, draft => {
                draft.user = null;
            });
        }

        case UPDATE_PROFILE: {
            const { user } = action.payload;

            return produce(state, draft => {
                draft.user = user;
            });
        }

        default: {
            return state;
        }
    }
};

export default accountReducer;
