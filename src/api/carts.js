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
// const { data: cart, error: error } = await getCart(uuid);
export const getCartByOwner = async (email) => {
    try {
        const url = PROXY_URL + `/registrar/carts/email/${email}`;
        console.error("GET", url);
        const response = await axios.get(url);
        return { data: response.data, error: null };
    } catch (error) {
        console.error(`Error getting cart for subscriber, error:${error}`);
        return { data: null, error: error };
    }
};

export const addItemToCart = async (email, productuuid, artifactuuid) => {
    try {
        const url = PROXY_URL + `/registrar/carts/email/${email}/${productuuid}/${artifactuuid}`;
        console.error("POST", url);
        const response = await axios.post(url);
        return { data: response.data, error: null };
    } catch (error) {
        console.error(`Error adding item productuuid:${productuuid} artifactuuid:${artifactuuid} to cart subscriber email:${email}, error ${error}`);
        return { data: null, error: error };
    }
};

export const removeItemFromCart = async (email, productuuid, artifactuuid) => {
    try {
        const url = PROXY_URL + `/registrar/carts/email/${email}/${productuuid}/${artifactuuid}`;
        console.error("DELETE", url);
        const response = await axios.delete(url);
        return { data: response.data, error: null };
    } catch (error) {
        console.error(`Error removing item productuuid:${productuuid} artifactuuid:${artifactuuid} to cart subscriber email:${email}, error ${error}`);
        return { data: null, error: error };
    }
};