import { FORM_EMAIL, FORM_PASSWORD, FORM_TOKEN, FORM_TIPE } from './types';

export const emailAction = email => ({
    type: FORM_EMAIL,
    email:email,
});

export const passwordAction = password => ({
    type: FORM_PASSWORD,
    password,
});

export const tokenAction = token => ({
    type: FORM_TOKEN,
    token,
});

export const tipeAction = tipe => ({
    type: FORM_TIPE,
    tipe,
});