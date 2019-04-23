import { FORM_EMAIL, FORM_PASSWORD, FORM_ISLOGIN, FORM_TOKEN, FORM_TIPE, FORM_LAST_NAME, FORM_USERNAME, FORM_FIRST_NAME } from './types';

const defaultState = {
    email: "",
    password: "",
    islogin: false,
    token: "",
    tipe: "password",
    username: "",
    first_name: "",
    last_name: ""
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case FORM_EMAIL:
            return { ...state, ...action };
        case FORM_PASSWORD:
            return { ...state, ...action };
        case FORM_ISLOGIN:
            return { ...state, ...action };
        case FORM_TOKEN:
            return { ...state, ...action };
        case FORM_TIPE:
            return { ...state, ...action };
        case FORM_USERNAME:
            return { ...state, ...action };
        case FORM_FIRST_NAME:
            return { ...state, ...action };
        case FORM_LAST_NAME:
            return { ...state, ...action };
        default :
            return state
    }
};