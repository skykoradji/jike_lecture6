import React, { Fragment } from 'react';

import { Typography } from '@material-ui/core';
import withLayout from '../lib/withLayout';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  container: {
    textAlign: 'center',
    margin: '0 auto'
  },
  pageTitle: {
    marginTop: 50
  }
};

const NotFound = props => (
  <Fragment>
    <div className={props.classes.container}>
      <Typography variant="h3" color="primary" className={props.classes.pageTitle}>
        404
      </Typography>
      <br />
      <Typography variant="h5" color="primary">
        Oops! That page can’t be found.
      </Typography>
      <br />
      <br />

      <Typography variant="h5" color="textPrimary">
        <a href="/">Return to Home Page</a>
      </Typography>
    </div>
  </Fragment>
);

export default withLayout(withStyles(styles)(NotFound));
