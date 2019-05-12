import { FORM_EMAIL, FORM_PASSWORD, FORM_TOKEN, FORM_TIPE, FORM_LAST_NAME, FORM_USERNAME, FORM_FIRST_NAME } from './types';

export const emailAction = email => ({
    type: FORM_EMAIL,
    email:email,
});

export const passwordAction = password => ({
    type: FORM_PASSWORD,
    password,
});

export const usernameAction = username => ({
    type: FORM_USERNAME,
    username,
});

export const firstnameAction = first_name => ({
    type: FORM_FIRST_NAME,
    first_name,
});

export const lastnameAction = last_name => ({
    type: FORM_LAST_NAME,
    last_name,
});

export const tokenAction = token => ({
    type: FORM_TOKEN,
    token,
});

export const tipeAction = tipe => ({
    type: FORM_TIPE,
    tipe,
});