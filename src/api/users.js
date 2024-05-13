/*
 * Copyright 2024 Broda Group Software Inc.
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 *
 * Created:  2024-04-15 by eric.broda@brodagroupsoftware.com
 */


import axios from "axios";

import { PROXY_URL } from '../constants.js';

// EXAMPLE:
// const { data: registration, error: error } = await getUser(email);
export const getUserByRoleEmail = async (role, email) => {
    try {
        const url = PROXY_URL + `/registrar/users/role/${role}/email/${email}`;
        console.error("GET", url);
        const response = await axios.get(url);
        console.log(response)
        return { data: response.data, error: null };
    } catch (error) {
        console.error(`Error checking registration:${email}, error:${error}`);
        return { data: null, error: error };
    }
};

// returned data is boolean: true (is registered)
export const isUserRegistered = async (role, email) => {
    console.log(role, email);
    const { data: registration, error: error } = await getUserByRoleEmail(role, email);
    console.log(registration);
    console.log(error);
    if (error) {
        if (error.response.status === 404) {
            return { data: false, error: null }
        } else {
            return { data: false, error: error }
        }
    }
    return { data: true, error: null }
};

export const loginUser = async (role, email, password) => {
    try {
        // const url = PROXY_URL + "/entities/login";
        const url = PROXY_URL + "/registrar/auth/login";
        console.error("POST", url);
        const entityJSON = { role: role, email: email, password: password };
        console.error(`Logging in role:${role} email:${email}, password:${password}`);
        const response = await axios.post(url, entityJSON, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.error(`Successfully logged in role:${role} email:${email}`);
        return { data: response.data, error: null };
    } catch (error) {
        console.error(`Error logging in:${email}, error:${error}`);
        return { data: null, error: error };
    }
};

export const logoutUser = async (role, email) => {
    try {
        // const url = PROXY_URL + "/entities/logout";
        const url = PROXY_URL + "/registrar/auth/logout";
        console.error("POST", url);
        const entityJSON = { role: role, email: email };
        console.error(`Logging in role:${role} email:${email}`);
        const response = await axios.post(url, entityJSON, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.error(`Successfully logged out role:${role} email:${email}`);
        return { data: response.data, error: null };
    } catch (error) {
        console.error(`Error logging out:${email}, error:${error}`);
        return { data: null, error: error };
    }
};

