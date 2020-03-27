import React from 'react';
// import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import './App.css';
import Graph2 from './Components/Graph2';
import EquationEditing from './Components/EquationEditingRCC';
import MachineLearning from "./Components/MachineLearning";
import { Container, Button, FormGroup, Switch, FormControlLabel, Box, Paper, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    background: 'linear-gradient(45deg, #A4C6D3 30%, #D3D4D5 90%)',
    border: 0,
    borderRadius: 3,
    color: 'white',
    margin: 0,
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
  // rootGrid: {
  //   flexGrow: 1,
  // },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: 0,
    height: 250,
  },
}));

Amplify.configure(awsconfig);

function App() {
  //state management
  const [checked, setChecked] = React.useState(true);

  //functions
  const toggleChecked = () => {
    setChecked(!checked);
  };

  //rendering
  const classes = useStyles();
  return (
    <div className="App">
      {/* <Container className={classes.root}> */}
        <Box className={classes.root}>
        <h1>Welcome To Your Dashboard</h1>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
               {/* Insert a Graph Here */}
               <Graph2/>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}> 
              Insert Equation Editing Here
              <EquationEditing/>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              Insert Machine Learning Here
              <MachineLearning/>
            </Paper>
          </Grid>
        </Grid>
        </Box>
      {/* </Container> */}
    </div>
  );
}

export default withAuthenticator(App, true);