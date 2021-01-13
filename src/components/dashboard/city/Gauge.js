import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default function Gauge({ name, value, unit }) {
    return (
        <Grid
            item
            sm={"3"}
            container
            direction="column"
            justify="center"
            alignItems="center">
            <Grid item>
                <Typography variant="h5">
                    {name}
                        </Typography>
            </Grid>
            <Grid item>
                <Typography variant="h4">
                    {value} {unit}
                </Typography>
            </Grid>
        </Grid>
    )
}