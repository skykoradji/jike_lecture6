import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import Courses from '../components/Courses';
import withLayout from '../lib/withLayout';

import { withStyles } from '@material-ui/core/styles';

const styles = {
  headline: {
    marginTop: 30,
    textAlign: 'center'
  },
  subtitle: {
    marginTop: 20,
    textAlign: 'center'
  }
};

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography className={classes.headline} variant="h4" component="h4">
          Development
        </Typography>
        <Typography className={classes.subtitle} variant="h6" component="p">
          Get the Technology and Creative Skills you need to launch a career by learning from
          industry experts.
        </Typography>

        <Courses history={this.props.history} />
      </div>
    );
  }
}

export default withLayout(withStyles(styles)(Home));
