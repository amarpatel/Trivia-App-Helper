import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles/index';
import Button from 'material-ui/Button';
import InfoOutlineIcon from 'material-ui-icons/Info';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

const styles = theme => ({
  button: {
    margin: 0,
    minWidth: 0,
    padding: 0,
    minHeight: '24px',
  },
  icon: {
    height: '16px',
    fill: 'rgba(0, 0, 0, 0.54)',
    position: 'relative',
  }
});

class Info extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button onClick={this.handleClickOpen} className={classes.button}>
          <InfoOutlineIcon className={classes.icon} />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">How's this work?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography variant="body1" gutterBottom component="h2">
                Google Vision gets the question and answers from your iPhone's screen, then I search for the question on Bing.
              </Typography>
              <Typography variant="body1" gutterBottom component="h2">
                I take the words from the answers and count how often they appear in the search results.
              </Typography>
              <Typography variant="body1" gutterBottom component="h2">
                The 100 most common words in English, like "the", "be", "to", etc. are weighted less than uncommon words.
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Cool
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(Info);
