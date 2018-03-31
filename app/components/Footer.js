// @flow
import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import ChatBubbleOutlineIcon from 'material-ui-icons/ChatBubbleOutline';
import Info from './Info';

const styles = theme => ({
  root: {
    position: 'absolute',
    bottom: '8px',
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
  },
  gridContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  }
});

export function Footer(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Grid container justify="center" className={classes.gridContainer}>
        <Grid item>
          <Info />
        </Grid>
        <Grid item>
          <Button href="#flat-buttons" className={classes.button} onClick={() => props.handleOnAuthorClick()}>
            <ChatBubbleOutlineIcon className={classes.icon} />
            <Typography variant="caption" gutterBottom>
              Amar
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(Footer);
