import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Switch from 'material-ui/Switch';
import { FormControlLabel } from 'material-ui/Form';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 3,
    minWidth: '10em',
  },
  input: {
    display: 'none',
  },
  root: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  size: {
    width: 40,
    height: 40,
  },
  sizeIcon: {
    fontSize: 20,
  },
  text: {
    textAlign: 'center',
  }
});

export function GameForm(props) {
  const { classes } = props;
  return (
    <form>
      <Typography className={classes.text} variant="title" gutterBottom>
        Trivia App Helper
      </Typography>

      <Typography className={classes.text} variant="subheading" gutterBottom>
        Don't Use This! It breaks TOS!
      </Typography>
      <div className={classes.root}>
        <Grid container spacing={8}>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
              <Button
                variant="raised"
                className={classes.button}
                onClick={() => props.handleGameSelect('hq')}
                color={props.game === 'hq' ? 'primary' : 'default'}
              >
                HQ
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>

            <Paper className={classes.paper}>
              <Button
                variant="raised"
                className={classes.button}
                onClick={() => props.handleGameSelect('cc')}
                color={props.game === 'cc' ? 'primary' : 'default'}
              >
                Cash Show
              </Button>

            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <FormControlLabel
                className={classes.formControlLabel}
                control={
                  <Switch
                    onClick={props.handleOpenChrome}
                    defaultChecked={props.openChrome}
                    color="primary"
                  />
                }
                label="Open Google Search of Question"
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </form>
  );
}

export default withStyles(styles)(GameForm);
