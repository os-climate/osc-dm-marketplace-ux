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
export const getArtifactByUUID = async (uuid, artifact_uuid) => {
    try {
        const url = PROXY_URL + `/dataproducts/uuid/${uuid}/artifacts/${artifact_uuid}`;
        console.log("GET", url);
        const response = await axios.get(url);
        return { data: response.data, error: null };
    } catch (error) {
        console.error(`Error getting artifact for product uuid:${uuid}, artifact_uuid:${artifact_uuid} error:${error}`);
        return { data: null, error: error };
    }
};
