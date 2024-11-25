import React from 'react';
import { useTranslation } from '../../hooks';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';

export const NoTagsCard = () => {
  const { t } = useTranslation();

  return (
    <Card style={{ marginTop: '2em' }}>
      <CardContent>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <Grid item>
            <Typography variant="h6">
              {t(`tagPage.tags`, { count: 0 })}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
