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

// Get list of all products (only product.yaml info, effectively
// only product summaries)
export const getProducts = async () => {
    try {
        const url = PROXY_URL + "/registrar/products";
        console.error("GET", url);
        const response = await axios.get(url);
        return { data: response.data, error: null };
    } catch (error) {
        console.error(`Error getting products, error:${error}`);
        return { data: null, error: error };
    }
};

// Get product summary for a specific product UUID
export const getProductByUUID = async (uuid) => {
    try {
        const url = PROXY_URL + `/registrar/products/uuid/${uuid}`;
        console.error("GET", url);
        const response = await axios.get(url);
        return { data: response.data, error: null };
    } catch (error) {
        console.error(`Error getting product for uuid:${uuid}, error:${error}`);
        return { data: null, error: error };
    }
};

// Get product discovery details for a specific product UUID
export const getProductDetailsByUUID = async (uuid) => {
    try {
        const url = PROXY_URL + `/dataproducts/uuid/${uuid}`;
        console.error("GET", url);
        const response = await axios.get(url);
        return { data: response.data, error: null };
    } catch (error) {
        console.error(`Error getting product for uuid:${uuid}, error:${error}`);
        return { data: null, error: error };
    }
};
