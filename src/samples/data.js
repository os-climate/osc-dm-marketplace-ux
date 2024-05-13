/*
 * Copyright 2024 Broda Group Software Inc.
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 *
 * Created:  2024-04-15 by eric.broda@brodagroupsoftware.com
 */


export const sampleProducts = [
    { uuid: 'product-1', namespace: "brodagroupsoftware.com", name: 'Sample Product 1', description: 'This is a description for sample product 1.', tags: ['utilities, emissions'], createtimestamp: '2023-10-03T10:11:12Z', updatetimestamp: '2023-10-04T10:11:12Z'},
    { uuid: 'product-2', namespace: "brodagroupsoftware.com", name: 'Sample Product 2', description: 'This is a description for sample product 2.', tags: ['utilities, emissions'], createtimestamp: '2023-10-03T10:11:12Z', updatetimestamp: '2023-10-04T10:11:12Z'},
    { uuid: 'product-3', namespace: "brodagroupsoftware.com", name: 'Sample Product 3', description: 'This is a description for sample product 3.', tags: ['utilities, emissions'], createtimestamp: '2023-10-03T10:11:12Z', updatetimestamp: '2023-10-04T10:11:12Z'},
    { uuid: 'product-4', namespace: "brodagroupsoftware.com", name: 'Sample Product 4', description: 'This is a description for sample product 4.', tags: ['utilities, emissions'], createtimestamp: '2023-10-03T10:11:12Z', updatetimestamp: '2023-10-04T10:11:12Z'},
    { uuid: 'product-5', namespace: "brodagroupsoftware.com", name: 'Sample Product 5', description: 'This is a description for sample product 5.', tags: ['utilities, emissions'], createtimestamp: '2023-10-03T10:11:12Z', updatetimestamp: '2023-10-04T10:11:12Z'},
];

export const sampleArtifacts = [
    { productuuid: 'product-1', artifactuuid: 'artifact-1', name: 'Sample artifact 1', description: 'This is a description for sample artifact 1.' },
    { productuuid: 'product-1', artifactuuid: 'artifact-2', name: 'Sample artifact 2', description: 'This is a description for sample artifact 2.' },
];

export const sampleUsers = [
    "eric.broda@brodagroupsoftware.com",
    "davis.broda@brodagroupsoftware.com",
    "graeham.broda@brodagroupsoftware.com",
];

export const sampleCarts = [
    {
        uuid: 'cart-1',
        owner: 'eric.broda@brodagroupsoftware.com',
        createtimestamp: '2023-10-03T10:11:12Z',
        updatetimestamp: '2023-10-04T10:11:12Z',
        items: [
            { productuuid: "product-1", artifactuuid: "artifact-1"},
            { productuuid: "product-1", artifactuuid: "artifact-2"}
        ]
    }
];

export const sampleOrders = [
    { uuid: 'order-1', owner: 'eric.broda@brodagroupsoftware.com', createtimestamp: '2023-10-03T10:11:12Z', updatetimestamp: '2023-10-04T10:11:12Z' },
    { uuid: 'order-2', owner: 'davis.broda@brodagroupsoftware.com', createtimestamp: '2023-10-04T10:11:12Z', updatetimestamp: '2023-10-05T10:11:12Z' },
    { uuid: 'order-3', owner: 'graeham.broda@brodagroupsoftware.com', createtimestamp: '2023-10-05T10:11:12Z', updatetimestamp: '2023-10-06T10:11:12Z' }
];