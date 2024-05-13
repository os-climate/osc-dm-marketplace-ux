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
import Grid from '@mui/material/Grid';

interface ResponsiveGridSize {
    xs?: number | "auto";
    sm?: number | "auto";
    md?: number | "auto";
    lg?: number | "auto";
    xl?: number | "auto";
}

interface ResponsiveGridComponentProps {
    children: React.ReactNode;
    size?: ResponsiveGridSize;
}

// Example using sizes (below will make all screen sizes span
// all 12 columns in the MUI grid):
// <ResponsiveGridComponent size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>

const ResponsiveGridComponent: React.FC<ResponsiveGridComponentProps> = ({ children, size = {}, ...props }) => {
    return (
          <Grid container spacing={2} {...props}>
              {React.Children.map(children, (child, index) => (
                  // Adjust the grid items to be responsive; defaults are
                  // show in the code below (xs = small screel, xl = largesst screen)
                  // xs=12 will make it 1 item per row on extra small screens
                  // md=3 will make it 4 items per row on medium screens and up
                  <Grid
                        item
                        xs={size.xs || 12}
                        sm={size.sm || 8}
                        md={size.md || 6}
                        lg={size.lg || 5}
                        xl={size.xl || 4}
                        key={index}>
                        {child}
                  </Grid>
              ))}
          </Grid>
    );
};
export default ResponsiveGridComponent;
