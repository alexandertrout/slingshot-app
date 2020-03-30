import React, { Component } from 'react';
import {render} from 'react-dom'
import MathJax from 'react-mathjax-preview';
import {Scatter} from 'react-chartjs-2';

const math = String.raw`
  <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
      <mi>y</mi><mo>=</mo><mi>mx</mi><mo>+</mo><mi>c</mi>
  </math>`

class EquationEditingRCC extends Component {
  state = {
    input: '',
    math: math,
    chartData: {
      labels: [1, 2, 3,
           4, 5],
  datasets: [{
      fill: false,
      showLine: true,
      lineTension: 0.4,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [
         {
        x: -10,
        y: 100
      },{
        x: -5,
        y: 25
      },
      {
        x: 0,
        y: 0
      },
      {
        x: 5,
        y: 25
      },{
        x: 10,
        y: 100
      }
    ]
    }
  ]
}
  }

  updateInput = (event) => {
    const value = event.target.value
    this.setState({input: value});
  }

  submit = event => {
    event.preventDefault();
    this.setState((currentState) => {
      let inputMath = [];
      const inputChars = currentState.input.split('');

      inputChars.forEach((char, index) => {
      if (/[0-9]/.test(char)) {
        if (/[0-9]/.test(inputChars[index-1])){
          const nums = [];
          for (let i = 10; i > 1; i--){
           if (/[0-9]/.test(inputChars[index-i])){ 
            nums.push(inputChars[index-i]);
           }
          }
          inputMath.pop();
          inputMath.push(`<mi>${nums.join('')}${inputChars[index-1]}${char}</mi>`)
        } else {
          inputMath.push(`<mi>${char}</mi>`)
        }
      }

      if (/[a-z]/.test(char)) {inputMath.push(`<mi>${char}</mi>`)}
      if (/[+=\/*-]/.test(char)) {inputMath.push(`<mo>${char}</mo>`)}

      if (/[\^]/.test(char)) {
        if (/[0-9]/.test(inputChars[index-2])){
          const nums = [];
          for (let i = 10; i > 1; i--){
           if (/[0-9]/.test(inputChars[index-i])){ 
            nums.push(inputChars[index-i]);
           }
          }
          inputMath.pop();
          inputMath.pop();
          inputMath.push(`<msup><mi>${nums.join('')}${inputChars[index-1]}</mi><mn>${inputChars[index+1]}</mn></msup>`);
          } else {
          inputMath.pop();
          inputMath.push(`<msup><mi>${inputChars[index-1]}</mi><mn>${inputChars[index+1]}</mn></msup>`);
        }
      }

      if (inputChars[index-1] === '^'){inputMath.pop()}
      })

      let newMath = currentState.math.substring(0, 68) + inputMath.join('') +'</math>'
      return {math: newMath}
    });
  }

  render() {
    return (
      <>
      <form onSubmit={this.submit}>
       <input type="text" value={this.state.input} onChange={this.updateInput}/>
     </form>
    <MathJax math={this.state.math}/>
    <div>
< Scatter
          data={this.state.chartData}
          options={{maintainAspectRatio: false, showLine: true}}
          height={300}
          width={350}
    />
    </div>
    
    </>
    )
  }
}

export default EquationEditingRCC;