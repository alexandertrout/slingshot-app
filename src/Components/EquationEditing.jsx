import React, { Component } from 'react';
import {render} from 'react-dom'
import MathJax from 'react-mathjax-preview';
import {Scatter} from 'react-chartjs-2';

// const asciimath = '`sum_(i=1)^n i^3=((n(n+1))/2)^2`'
const math = String.raw`
  <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
      <mo>-</mo><mi>2</mi><mo>+</mo><mi>12</mi>
  </math>`

class EquationEditingRCC extends Component {
  state = {
    input: '',
    // submitted: false,
    math: math,
    chartData: {
      // labels: [1, 2, 3,
      //      4, 5],
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
      //Edit Data here once an equation is calculated. Must be ordered correctly for this to work. 
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
      const inputGroups = currentState.input.split(' ');
      inputGroups.forEach(group => {
        console.log(group, 'GROUP');
        if (/[+=\/*-]/.test(group)){
// Operators only.
          inputMath.push(`<mo>${group}</mo>`)
        } else if (/[a-z]/.test(group) || /[\^]/.test(group) ){
// Treatment for groups with special chars.
          if (/[\^]/.test(group)){
          // Groups with powers
            const inputChars = group.split('');
            let location = null;
            inputChars.forEach((char, index) => {
              if (char === '^'){location = index}
            })
            inputMath.push(`<msup><mi>${group.substring(0,location)}</mi><mn>${group.substring(location + 1)}</mn></msup>`);
          }
          else if (/[a-z]/.test(group)){
          // Groups with prefixed letters
            inputMath.push(`<mi>${group}</mi>`)
          }
        } else {
// Treatment for number only groups.
          inputMath.push(`<mi>${group}</mi>`)
        }
      })
      let newMath = currentState.math.substring(0, 68) + inputMath.join('') +'</math>'
      return {math: newMath}
    });
  }

  updateGraph = () => {
  // input must be in format y = something (linear or quadratic).
   let equation = this.state.input.substring(4);
   let chars = equation.split('');
   console.log(equation);
   let location = null;
      chars.forEach((char, index) => {
        if (char === 'x'){
          location = index;
        }
      });

  let yVals = [];
    this.state.chartData.datasets[0].data.forEach(point => {
        let y = equation.substring(0, location) * point.x + eval(equation.substring(location+1))
        console.log(y);
        yVals.push(y);
    })

  let newData = this.state.chartData.datasets[0].data.map((point, index) => {
      point.y = yVals[index];
      return point
  })

  let chartData = {...this.state.chartData};
  chartData.datasets[0].data = newData;

  this.setState({chartData});
  }

  render() {
    console.log(this.state.chartData)
    return (
      <>
      <form onSubmit={this.submit}>
       <input type="text" value={this.state.input} onChange={this.updateInput}/>
     </form>
    <MathJax math={this.state.math}/>
    <button onClick={this.updateGraph}>Update Linear Graph</button>
    <button onClick={this.updateQuadGraph}>Update Quadratic Graph</button>
    <div>
    < Scatter
          data={this.state.chartData}
          options={{maintainAspectRatio: false, showLine: true, animation: {duration: 0}}}
          height={300}
          width={350}
          redraw={true}
    />
    </div>
    
    </>
    )
  }
}

export default EquationEditingRCC;