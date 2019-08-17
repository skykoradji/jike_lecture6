import React, { Fragment, Component } from 'react';
import { Avatar, List, ListItem, ListItemText, Popover } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  menuAvatar: {
    display: 'inline-block',
    verticalAlign: 'middle',
    cursor: 'pointer'
  },
  usernameAvatar: {
    verticalAlign: 'middle',
    cursor: 'pointer'
  },
  avatarBlock: {
    display: 'inline-block',
    marginLeft: 20
  }
});

class MenuDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  render() {
    const { anchorEl } = this.state;

    const { user, classes, history, deauthenticate } = this.props;
    return (
      <Fragment>
        <div className={classes.avatarBlock}>
          <Avatar
            role="presentation"
            aria-owns="simple-menu"
            aria-haspopup="true"
            onClick={this.handleClick}
            onKeyPress={this.handleClick}
            alt={user.firstName}
            className={classes.usernameAvatar}
          >
            {user.firstName.charAt(0)}
          </Avatar>
        </div>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <List component="nav">
            <ListItem button component="button" onClick={() => history.push('/profile')}>
              <ListItemText primary="My Profile" />
            </ListItem>
            {user.role === 'Students' && (
              <ListItem button component="button" onClick={() => history.push('/profile')}>
                <ListItemText primary="Course subscriptions" />
              </ListItem>
            )}

            <ListItem button onClick={deauthenticate}>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Popover>
      </Fragment>
    );
  }
}

export default withStyles(styles)(MenuDrop);
