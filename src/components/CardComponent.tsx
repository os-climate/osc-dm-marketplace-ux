/*
 * Copyright 2024 Broda Group Software Inc.
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 *
 * Created:  2024-04-15 by eric.broda@brodagroupsoftware.com
 */


import React, { ReactNode, useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import SnackbarComponent from "./SnackbarComponent.tsx";

// Updated Props Interface
interface CardComponentProps {
  titles: string[];
  buttonConfigs?: { text: string, onClick: () => Promise<void> }[];
  children: ReactNode;
}

const CardComponent: React.FC<CardComponentProps> = ({titles, buttonConfigs, children}) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const avatarLetter = titles[0]?.[0]?.toUpperCase() || '';

  // Updated Button Handler
  const handleButtonClick = async (onClick: () => Promise<void>) => {
    try {
      await onClick();
    } catch (error) {
      console.log('An error occurred:', error);
      setErrorMessage(error.message || 'An unknown error occurred.');
      setOpenSnackbar(true);
    }
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="item">
            {avatarLetter}
          </Avatar>
        }
        title={
          <Box>
            {titles.map((title, index) => (
              <Typography key={index} variant="h6" component="span">
                {title}
                <br/>
              </Typography>
            ))}
          </Box>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
      />
      <CardContent>
        {children}

        {buttonConfigs?.map((config, index) => (
          <Button
            key={index}
            variant="text"
            color="primary"
            onClick={() => handleButtonClick(config.onClick)}
          >
            {config.text}
          </Button>
        ))}

      </CardContent>

      <SnackbarComponent
        message={errorMessage}
        open={openSnackbar}
        handleClose={() => setOpenSnackbar(false)}
        severity="error"
      />

    </Card>
  );
};

export default CardComponent;
