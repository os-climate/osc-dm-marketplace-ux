/*
 * Copyright 2024 Broda Group Software Inc.
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 *
 * Created:  2024-04-15 by eric.broda@brodagroupsoftware.com
 */


import { Cart } from '../models/Cart';

export interface Order {
    uuid?: string;
    subscriber: string;
    cartuuid: string;
    createtimestamp?: string;
    updatetimestamp?: string;
}

export interface OrderImmutable {
    uuid: string;
    subscriber: string;
    cart: Cart;
    createtimestamp: string;
    updatetimestamp: string;
}