/*
 * Copyright 2024 Broda Group Software Inc.
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 *
 * Created:  2024-04-15 by eric.broda@brodagroupsoftware.com
 */


import Typography from '@mui/material/Typography';
import { Alert, AlertTitle, Box } from '@mui/material';

const ErrorComponent = ({ error }) => {
    console.log(error);

    if (!error) {
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{ height: '100vh' }}>

            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                <Typography variant="body2">
                    Null error (programming problem!)
                </Typography>
            </Alert>
        </Box>
    };

    return(

        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{ height: '100vh' }}>

            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                { error.message && (
                    <Typography variant="body2">
                        {error.message}
                    </Typography>
                )}
                { error.response && error.response.data && (
                    <Typography variant="body2">
                        {JSON.stringify(error.response.data)}
                    </Typography>
                )}
                { error.response && error.response.data && error.response.data.detail && (
                    <Typography variant="body2">
                        {error.response.data.detail}
                    </Typography>
                )}
            </Alert>

        </Box>

    )
};

export default ErrorComponent;
