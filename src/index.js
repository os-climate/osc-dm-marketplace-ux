/*
 * Copyright 2024 Broda Group Software Inc.
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 *
 * Created:  2024-04-15 by eric.broda@brodagroupsoftware.com
 */


import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';

const root = document.getElementById('root');
const appRoot = createRoot(root);

appRoot.render(
    <App />
);
