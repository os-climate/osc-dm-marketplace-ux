/*
 * Copyright 2024 Broda Group Software Inc.
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 *
 * Created:  2024-04-15 by eric.broda@brodagroupsoftware.com
 */


import { createTheme } from '@mui/material/styles';

const tdTheme = createTheme({
    palette: {
        primary: {
            light: '#33ab00',
            main: '#008A00',
            dark: '#005E00',
            contrastText: '#FFFFFF',
        },
        secondary: {
            light: '#fcfdf9',
            main: '#F9FCF4',
            dark: '#c5c8b4',
            contrastText: '#000000',
        },
        error: {
            main: '#D32F2F',
        },
        background: {
            default: '#F8F8F8', // Light grey background
            paper: '#FFFFFF',  // White background for paper elements
        },
        text: {
            primary: '#1C1C1C', // Very dark grey for primary text
            secondary: '#616161', // Secondary text, cool grey
            light: '#ffffff',
            main: '#000000',
            dark: '#424242',
            contrastText: '#fff',
        }
    },

    typography: {
        fontFamily1: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        fontFamily2: "'Georgia', 'serif'",
    }
});

const rbcTheme = createTheme({
    palette: {
        primary: {
            main: '#0051A5',
        },
        secondary: {
            main: '#F0F0F0',
        },
        error: {
            main: '#D32F2F',
        },
        background: {
            default: '#F6F6F6', // Light grey background
            paper: '#FFFFFF',  // White background for paper elements
        },
        accent: {
            main: '#FEDF01',
        },
        text: {
            primary: '#333333', // Very dark grey for primary text
            secondary: '#7A8B99', // Secondary text, cool grey
        }
    },

    typography: {
        fontFamily1: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        fontFamily2: "'Georgia', 'serif'",
    }
});

const theme = tdTheme;

export default theme;
