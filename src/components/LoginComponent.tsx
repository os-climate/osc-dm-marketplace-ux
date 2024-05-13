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
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ErrorComponent from './ErrorComponent.tsx';
import ProgressComponent from './ProgressComponent.tsx';
import { getUserByRoleEmail, loginUser } from '../api/users';
import { allLocalStorage, setLocalStorage, KEY_ENTITYID } from '../api/localstorage';

const LoginComponent = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [values, setValues] = useState({
        email: '',
        password: '',
        role: '',
        showPassword: false,
    });

    let navigate = useNavigate();

    // Clear all local storage (for this app/domain)
    localStorage.clear();

    // Fetching the data from the API
    useEffect(() => {
        fetchData();
    });

    const fetchData = async () => {
        setIsLoading(false);
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleSubmit = async (event) => {
        console.log("Handling submit")
        event.preventDefault(); // Prevent default form submission behavior

        // Note: values.email and values.password are fields from form

        console.log("Checking registration")
        console.log(values);
        const { data: user, error: registrationerror } = await getUserByRoleEmail(values.role, values.email);
        if (registrationerror) {
            setError(new Error(`Error checking user registration: ${registrationerror.message}`));
            setIsLoading(false);
            return;
        }
        if (!user) {
            setError(new Error(`User is not registered role:${values.role} email:${values.email}`));
            setIsLoading(false);
            return;
        }
        console.log(user)

        console.log("Checking login credentials")
        const { data: loginstatus, error: loginerror } = await loginUser(values.role, values.email, values.password);
        if (loginerror) {
            setError(new Error(`Error executing login: ${loginerror.message}`));
            setIsLoading(false);
            return;
        }
        console.log(loginstatus)

        // If successful, save userId to local storage and context
        console.log(user)
        setLocalStorage(KEY_ENTITYID, user);

        const ls = allLocalStorage()
        console.info(ls);

        // Redirect upon successful login (and is registered)
        console.log("Redirecting...")
        const url = "/marketplace";
        navigate(url);
    };

    const uxSuccess = () => {
        return(
            <Container maxWidth="xl">
                <Typography variant="h1">Login</Typography>
                <Grid container direction="column" alignItems="center" justifyContent="flex-start" style={{ minHeight: '100vh', paddingTop: '100px' }}>
                    <Grid item xs={12} sm={6}>
                        <Box border={1} p={3} borderRadius={3}>
                            <Grid container direction="column" alignItems="center">
                                <form noValidate style={{ width: '50%' }} onSubmit={handleSubmit}>
                                    <TextField
                                        value={values.email}
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        label="Email Address / Username"
                                        autoFocus
                                        onChange={handleChange('email')}
                                    />
                                    <TextField
                                        value={values.password}
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        label="Password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        onChange={handleChange('password')}
                                        InputProps={{
                                            endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleClickShowPassword}>
                                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <FormControl variant="outlined" margin="normal" fullWidth>
                                        <InputLabel id="role-label">Role</InputLabel>
                                        <Select
                                            labelId="role-label"
                                            value={values.role}
                                            onChange={handleChange('role')}
                                            label="Role"
                                        >
                                            <MenuItem value="guest">Guest</MenuItem>
                                            <MenuItem value="publisher">Publisher</MenuItem>
                                            <MenuItem value="subscriber">Subscriber</MenuItem>
                                            <MenuItem value="administrator">Administrator</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        >
                                        Sign In
                                    </Button>
                                    <Grid container spacing={0} justifyContent="center">
                                        <Grid item>
                                            <Button variant="text" color="primary">
                                                Login with Bank ID
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="text" color="primary">
                                                Login with Google
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
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

export default LoginComponent;
