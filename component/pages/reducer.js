import { FORM_EMAIL, FORM_PASSWORD, FORM_ISLOGIN, FORM_TOKEN, FORM_TIPE } from './types';

const defaultState = {
    email: "",
    password: "",
    islogin: false,
    token: "",
    tipe: "password",
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
        default :
            return state
    }
};