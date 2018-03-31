// @flow
import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import ChatBubbleOutlineIcon from 'material-ui-icons/ChatBubbleOutline';

const styles = theme => ({
  root: {
    position: 'absolute',
    bottom: '16px',
    width: '100%',
    textAlign: 'center',
  },
  icon: {
    padding: '0 0 0 0',
    height: '16px',
    position: 'relative',
    top: '-2px',
  },
  button: {
    textTransform: 'unset',
  }
});

export function Author(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item>
          <Button href="#flat-buttons" className={classes.button} onClick={() => props.handleOnAuthorClick()}>
            <Typography variant="caption" gutterBottom>
                by Amar
            </Typography>
            <ChatBubbleOutlineIcon className={classes.icon} />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(Author);
