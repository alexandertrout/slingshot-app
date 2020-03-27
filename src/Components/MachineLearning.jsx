import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Button, FormGroup, Switch, FormControlLabel, Box, Paper, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    background: 'lightblue',
    border: 0,
    borderRadius: 3,
    color: 'white',
    margin: 5,
    padding: 20,
  },
  button: {
    background: 'black',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px grey',
    color: 'white',
    padding: '0 30px',
  },
}));

const MachineLearning = (props) => {
  //state management
  const [checked, setChecked] = React.useState(true);

  //functions
  const toggleChecked = () => {
    setChecked(!checked);
  };

  //rendering
  const classes = useStyles();
  return (
      <Box className={classes.root}>
      ML Component <br></br>
      <Button className={classes.button}>click me!</Button>
      <Switch checked={checked} onClick={toggleChecked} />
      </Box>
  );
};

export default MachineLearning;