/*
 * Copyright 2024 Broda Group Software Inc.
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 *
 * Created:  2024-04-15 by eric.broda@brodagroupsoftware.com
 */


import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import ArtifactComponent from './components/ArtifactComponent.tsx';
import CartComponent from './components/CartComponent.tsx';
import DashboardAdministratorComponent from './components/DashboardAdministratorComponent.tsx';
import DashboardPublisherComponent from './components/DashboardPublisherComponent.tsx';
import DashboardSubscriberComponent from './components/DashboardSubscriberComponent.tsx';
import DashboardUserComponent from './components/DashboardUserComponent.tsx';
import HeaderComponent from './components/HeaderComponent.tsx';
import LoginComponent from './components/LoginComponent.tsx';
import LogoutComponent from './components/LogoutComponent.tsx';
import MarketplaceComponent from './components/MarketplaceComponent.tsx';
import OrdersComponent from './components/OrdersComponent.tsx';
import ProductComponent from './components/ProductComponent.tsx';
import SearchComponent from './components/SearchComponent.tsx';

import theme from './theme/theme';

function App() {

    useEffect(() => {
        console.log("Application mounting")
        // console.log("Clearing local storage")
        // clearLocalStorage()

        // App mounting code goes here (note that each time
        // a new tab is created the app is mounted again)

        return () => {
          // Cleanup logic when the app unmounts, if needed
          console.log("Application unmounting")
        };
    }, []);


    return (

        <ThemeProvider theme={theme}>

            <CssBaseline />
            <Router>
                <HeaderComponent />
                <Routes>
                    <Route path="/" exact element={<MarketplaceComponent />} />
                    <Route path="/marketplace" element={<MarketplaceComponent />} />
                    <Route path="/artifacts/:productuuid/:uuid" element={<ArtifactComponent />} />
                    <Route path="/cart" element={<CartComponent />} />
                    <Route path="/dashboard-administrator" element={<DashboardAdministratorComponent />} />
                    <Route path="/dashboard-user" element={<DashboardUserComponent />} />
                    <Route path="/dashboard-publisher" element={<DashboardPublisherComponent />} />
                    <Route path="/dashboard-subscriber" element={<DashboardSubscriberComponent />} />
                    <Route path="/login" element={<LoginComponent />} />
                    <Route path="/logout" element={<LogoutComponent />} />
                    <Route path="/orders" element={<OrdersComponent />} />
                    <Route path="/products/:uuid" element={<ProductComponent />} />
                    <Route path="/search" element={<SearchComponent />} />
                </Routes>
            </Router>

        </ThemeProvider>

    );
}

export default App;
