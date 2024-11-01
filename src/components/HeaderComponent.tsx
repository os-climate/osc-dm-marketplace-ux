/*
 * Copyright 2024 Broda Group Software Inc.
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 *
 * Created:  2024-04-15 by eric.broda@brodagroupsoftware.com
 */


import React, { useState } from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { getLocalStorage, KEY_ENTITYID } from '../api/localstorage';
import { ROLE_SUBSCRIBER, TITLE_TEXT } from '../constants.js';

const HeaderComponent = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const user = getLocalStorage(KEY_ENTITYID)
    console.info(user);

    const handleClick = (event) => {
        console.log("handleClick event")
        console.log(event)
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (option) => {
        console.log("handleClose event")
        console.log(`Selected option: ${option}`);
        setAnchorEl(null);
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Box style={{ flexGrow: 1 }}>
                        <Typography variant="h5">
                            {TITLE_TEXT}
                        </Typography>
                        {user?.contact.email && (
                            <Typography variant="caption">
                                [ user: {user.contact.email} / role: {user.role} ]
                            </Typography>
                        )}
                    </Box>
                    {
                        user?.contact.email &&
                        <Button color="secondary"><Link to="/dashboard-user" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard</Link></Button>
                    }

                    <Button color="secondary"><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Marketplace</Link></Button>
                    <Button color="secondary"><Link to="/search" style={{ textDecoration: 'none', color: 'inherit' }}>Search</Link></Button>

                    {
                        (user?.contact.email) && (user?.role === ROLE_SUBSCRIBER) &&
                        <Button color="secondary"><Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>Cart</Link></Button>
                    }

                    {
                        (user?.contact.email) && (user?.role === ROLE_SUBSCRIBER) &&
                        <Button color="secondary"><Link to="/orders" style={{ textDecoration: 'none', color: 'inherit' }}>Orders</Link></Button>
                    }

                    {
                        !user?.contact.email &&
                        <Button color="secondary"><Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Login</Link></Button>
                    }

                    {
                        user?.contact.email &&
                        <Button color="secondary"><Link to="/logout" style={{ textDecoration: 'none', color: 'inherit' }}>Logout</Link></Button>
                    }

                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleClick}
                        >
                        <MenuIcon />
                    </IconButton>

                </Toolbar>

            </AppBar>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                >
                <MenuItem onClick={() => handleClose('Option 1')}>Option 1</MenuItem>
                <MenuItem onClick={() => handleClose('Option 2')}>Option 2</MenuItem>
                <MenuItem onClick={() => handleClose('Option 3')}>Option 3</MenuItem>
            </Menu>
        </div>
    );
};

export default HeaderComponent;
