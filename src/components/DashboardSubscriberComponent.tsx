/*
 * Copyright 2024 Broda Group Software Inc.
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 *
 * Created:  2024-04-15 by eric.broda@brodagroupsoftware.com
 */


import React, { useEffect, useState } from "react";
import { Container, Typography } from '@mui/material';
import ProgressComponent from './ProgressComponent.tsx';
import ErrorComponent from './ErrorComponent.tsx';
import { isUserRegistered } from '../api/users';
import { getLocalStorage, KEY_ENTITYID } from '../api/localstorage';

const DashboardSubscriberComponent = () => {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const user = getLocalStorage(KEY_ENTITYID)
    console.info(user);

    // Fetching the data from the API
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {

        console.info(user);

        try {

            // Check if ususerrId is set
            if (!user) {
                const error = new Error("User has not logged in yet!");
                setError(error);
                setIsLoading(false); // No loading as we're not fetching any data
                return;  // Skip the rest of the useEffect code block
            }

            // Verify that the user is registered
            const { data: isRegistered, error: usererror } = await isUserRegistered(user.role, user.contact.email);
            if (usererror) {
                setError(usererror);
                setIsLoading(false);
                return;
            }
            if (!isRegistered) {
                setError(new Error(`User is not registered, role:${user.role} email:${user.contact.email}`));
                setIsLoading(false);
                return;
            }

            setIsLoading(true);

            setData({
                "stuff": "hello",
            });
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
            setError(error);
        }
    };


    const uxSuccess = () => {
        return(
            <Container maxWidth="xl">
                <Typography variant="h1" gutterBottom>Subscriber Dashboard</Typography>
                <Typography variant="h4" gutterBottom>Under construction</Typography>
            </Container>
        )
    };

    const uxLoading = () => {
        return (
            <ProgressComponent />
        );
    };

    const uxError = (error) => {
        return(
            <ErrorComponent error={error}/>
        );
    };
    return (
        <div>
          { isLoading
            ? uxLoading()
            : error
              ? uxError(error)
              : uxSuccess()
          }
        </div>
    );
};

export default DashboardSubscriberComponent;
