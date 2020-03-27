import React, { Component } from 'react';

class EquationEditingRCC extends Component {
  state = {
    inputs: []
  }

  makeEquation = () => {
    return {
      
    }
  }

  displayMath = () => {
    var result = [];
    result.push(<math>
        <mi>x</mi>
        <mo>+</mo>
        <mn>5</mn>
        <mo>=</mo>
        <mn>0</mn>
      </math>);
    return result;
  }

  render() {
    return (
      <>
      <div style = {{background: 'lightgrey',
    border: 0,
    borderRadius: 3,
    color: 'white',
    margin: 5,
    padding: 20}}>
      </div>

      <div style={{background: 'lightblue',
    border: 0,
    borderRadius: 3,
    color: 'white',
    margin: 5,
    padding: 20}}>
      {this.displayMath()}
      </div>
      </>
    );
  }
}

export default EquationEditingRCC;