import React, { Component } from 'react';
import * as tf from '@tensorflow/tfjs';
import covidData from '../data/covidData.json';
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

class MachineLearning extends Component {
  state = {
    valuePairs: [
      { x: 1, y: 2},
      {x:2, y: 4},
      {x: 3, y: 6}
    ],
    model: null, 
    trained: false, 
    predictedValue: 'please train model',
    valueToPredict: 5,
    isTraining: false
  }

  handleModelChange = (event) => {
      const num= parseInt(event.target.value);
      console.log(event.target.value, num);
      this.setState({valueToPredict: num});
  }

  componentDidMount() {
    let filteredOnceData = covidData.filter((line) => {
      return line.cases > 0;
    })

    let filteredData = filteredOnceData.filter((line) => {
      return parseInt(line.day) > 0;
    })

    let formattedData = (filteredData.map(line => {
        return {x: parseInt(line.cases), y: parseInt(line.deaths)};
    }));
    console.log(formattedData);
    this.setState({valuePairs: formattedData});
    // load in data 
    // manipulate to only cases and deaths, lets see if we can make a relationship between the 2 using ML
  }

  handleTrainModel = () => {
    let xValues = [];
    let yValues = [];

    this.state.valuePairs.forEach((val, index) => {
      xValues.push(val.x);
      yValues.push(val.y);
    })

    const model = tf.sequential();
    model.add(tf.layers.dense({units: 1, inputShape: [1]}));

    model.compile({loss: 'meanSquaredError', optimizer: 'adam'});
    const xs =tf.tensor2d(xValues, [xValues.length, 1]);
    const ys =tf.tensor2d(yValues, [yValues.length, 1]);
    console.log('TRAINING')
    this.setState({isTraining: true});

    model.fit(xs, ys, {epochs: 50}).then(() => {
      console.log('MODEL TRAINED')
      this.setState({model: model, trained: true, predictedValue: 'ready to predict', isTraining: false})
    })

  }

  handlePredict = () => {
    const value = this.state.model.predict(tf.tensor2d([this.state.valueToPredict], [1,1])).arraySync()[0][0];
    // console.log(predictedValue)
    const predictedValue = Math.floor(value);
    this.setState({predictedValue})
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <h2>Train Model: </h2>
        <button onClick={this.handleTrainModel}>Click me to train</button>

        {this.state.isTraining && 
        <BeatLoader
          size={15}
          color={"black"}
          margin={10}
        />}

        {this.state.model && 
        <>
        <h2>Predict Values: </h2>
        <p>If there are x number of cases confirmed on a given day, how many deaths are there likely to be?</p>
        <input type='number' placeholder= 'number of cases?' onChange={this.handleModelChange}></input>
        <button onClick={this.handlePredict}>Predict</button>
        {this.state.predictedValue && <p>{this.state.predictedValue}</p>}
        </>
        }
      </div>
    );
  }
}

export default MachineLearning;