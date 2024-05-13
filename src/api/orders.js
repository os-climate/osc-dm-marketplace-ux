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
// const { data: artifact, error: error } = await getArtifact(uuid);
export const getOrdersByEmail = async (email) => {
    try {
        const url = PROXY_URL + `/registrar/orders/email/${email}`;
        console.error("GET", url);
        const response = await axios.get(url);
        return { data: response.data, error: null };
    } catch (error) {
        if (error.response.status === 404) {
            return { data: [], error: null }
        }
        console.error(`Error getting orders for email:${email}, error:${error}`);
        return { data: null, error: error };
    }
};


// Create order
export const createOrder = async (order) => {
    const orderJSON = JSON.stringify(order);
    try {
        const url = PROXY_URL + `/registrar/orders`;
        console.error("POST", url);
        const response = await axios.post(url, orderJSON, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return { data: response.data, error: null };
    } catch (error) {
        console.error(`Error creating order:${order}, error:${error}`);
        return { data: null, error: error };
    }
};
