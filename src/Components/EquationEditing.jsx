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

const EquationEditing = (props) => {
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
      Equation Component <br></br>
      <math>
        <mi>x</mi>
        <mo>+</mo>
        <mn>5</mn>
        <mo>=</mo>
        <mn>0</mn>
      </math>
      <Button className={classes.button}>click me!</Button>
      <Switch checked={checked} onClick={toggleChecked} />
      </Box>
  );
};

export default EquationEditing;