import React, { Component } from 'react';

import Card, { CardContent } from 'material-ui/Card';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles/index';
import AccessAlarmIcon from 'material-ui-icons/AccessAlarm';

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },

  emphasis: {
    fontWeight: 600,
    color: '#304FFE',
  },
  icon: {
    height: '16px',
    margin: 0,
    display: 'inline-block',
    fill: 'rgba(0, 0, 0, 0.54)',
    position: 'relative',
    top: '4px',
  },

  timingContainer: {
    margin: 0,
    padding: '0 16px 8px !important',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  question: {
    textAlign: 'center',
    padding: '0 0 8px 0',
  },
});

export function Preview(props) {
  const { classes } = props;

  if (!props.question) {
    return null;
  }

  return (
    <div>
      <Grid item xs={12}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="headline" className={classes.question} component="h2">
              {props.question}
            </Typography>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Answer</TableCell>
                  <TableCell numeric>Common Word Score</TableCell>
                  <TableCell numeric>Uncommon Word Score</TableCell>
                  <TableCell numeric>Total Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  props.answers.map(([answer, scores]) => {
                    const { uncommonWordScore, commonWordScore, totalScore, selected } = scores;
                    const emphasisStyle = selected ? classes.emphasis : '';
                    return (
                      <TableRow key={answer}>
                        <TableCell className={emphasisStyle}>{answer}</TableCell>
                        <TableCell className={emphasisStyle} numeric>{commonWordScore}</TableCell>
                        <TableCell className={emphasisStyle} numeric>{uncommonWordScore}</TableCell>
                        <TableCell className={emphasisStyle} numeric>{totalScore}</TableCell>
                      </TableRow>
                    );
                  })
                }
              </TableBody>
            </Table>
          </CardContent>
          <CardContent className={classes.timingContainer}>
            <Typography variant="caption" gutterBottom component="h2">
              <AccessAlarmIcon className={classes.icon} />
              {(props.timing / 1000).toFixed(2)}s
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(Preview);
