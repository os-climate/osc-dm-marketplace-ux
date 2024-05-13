/*
 * Copyright 2024 Broda Group Software Inc.
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 *
 * Created:  2024-04-15 by eric.broda@brodagroupsoftware.com
 */


export interface Cart {
    uuid: string;
    subscriber: string;
    items: string[];
    createtimestamp: string;
    updatetimestamp: string;
}
