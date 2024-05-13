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
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

const FieldComponent = ({ fieldName, fieldValue }) => {
    const theme = useTheme();
    return (
        <Box>
        <Typography
            variant="overline"
            style={{
                fontSize: '0.75rem',
                color: theme.palette.text.secondary
            }} >
            {fieldName}
        </Typography>
        <Typography
            variant="body1"
            style={{
                marginTop: '-8px'
            }}>
            {fieldValue}
        </Typography>
        </Box>
    );
};

export default FieldComponent;
