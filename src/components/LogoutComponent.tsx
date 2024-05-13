/*
 * Copyright 2024 Broda Group Software Inc.
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 *
 * Created:  2024-04-15 by eric.broda@brodagroupsoftware.com
 */


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
// import { makeStyles } from '@material-ui/core/styles';
import ErrorComponent from './ErrorComponent.tsx';
import ProgressComponent from './ProgressComponent.tsx';
import { getLocalStorage, removeLocalStorage, KEY_ENTITYID } from '../api/localstorage';

const LogoutComponent = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [error] = useState(null);

    // const useStyles = makeStyles((theme) => ({
    //     root: {
    //       height: '100vh', // Full height of the viewport
    //       display: 'flex',
    //       flexDirection: 'column',
    //       justifyContent: 'center', // Vertically center
    //       alignItems: 'center', // Horizontally center
    //     },
    //   }));

    const user = getLocalStorage(KEY_ENTITYID)
    console.info(user);

    // Fetching the data from the API
    useEffect(() => {
        removeLocalStorage(KEY_ENTITYID);
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(false);
    };

    const uxSuccess = () => {
        return(
            <Container maxWidth="xl">
                <Typography variant="h1">Logout</Typography>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="body1" style={{ marginTop: '100px' }}>You have logged out</Typography>
                    <Typography variant="body1" style={{ marginTop: '200px' }}>
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        Go to Login
                    </Link>
                    </Typography>
                </div>
                <div style={{ height: '20px' }}></div>
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

export default LogoutComponent;
