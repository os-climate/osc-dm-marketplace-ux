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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

/* Example usage for Alerts or Feedback

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import SnackbarComponent from './SnackbarComponent';

const MyForm = () => {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('success');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    try {
      setMessage('Form submitted successfully.');
      setSeverity('success');
      setOpen(true);
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
      setSeverity('error');
      setOpen(true);
    }
  };
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>

      <SnackbarComponent
        message={message}
        open={open}
        handleClose={() => setOpen(false)}
        severity={severity}
      />
    </div>
  );
};
export default MyForm;
*/

const SnackbarComponent = ({ message, open, handleClose, severity = 'success' }) => {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={severity}>
                {message}
            </MuiAlert>
        </Snackbar>
    );
};

export default SnackbarComponent;
