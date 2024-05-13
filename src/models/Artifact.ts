/*
 * Copyright 2024 Broda Group Software Inc.
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 *
 * Created:  2024-04-15 by eric.broda@brodagroupsoftware.com
 */


export interface Resource {
    relationship: string;
    mimetype: string;
    url: string;
}

export interface Artifact {
    uuid: string;
    productuuid: string;
    productnamespace: string;
    productname: string;
    name: string;
    description: string;
    tags: string[];
    license: string;
    securitypolicy: string;
    links: Resource[];
    createtimestamp: string;
    updatetimestamp: string;
}