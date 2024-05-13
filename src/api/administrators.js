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
// const { data: registration, error: error } = await getAdministrator(email);
export const getAdministratorByEmail = async (email) => {
    try {
        const url = PROXY_URL + `/administrators/email/${email}`;
        console.log("GET", url);
        const response = await axios.get(url);
        return { data: response.data, error: null };
    } catch (error) {
        console.error(`Error checking registration for  email:${email}, error:${error}`);
        return { data: null, error: error };
    }
};

// returned data is boolean: true (is registered)
export const isAdministratorRegistered = async (email) => {
    console.log(email);
    const { data: registration, error: error } = await getAdministratorByEmail(email);
    console.log(registration);
    console.log(error);
    if (error) {
        if (error.response.status == 404) {
            return { data: false, error: null }
        } else {
            return { data: false, error: error }
        }
    }
    return { data: true, error: null }

};
