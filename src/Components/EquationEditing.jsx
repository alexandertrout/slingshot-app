import React, { Component } from 'react';
import {render} from 'react-dom'
import MathJax from 'react-mathjax-preview';
import {Scatter} from 'react-chartjs-2';

// const asciimath = '`sum_(i=1)^n i^3=((n(n+1))/2)^2`'
const math = String.raw`
  <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
      <mi>y</mi><mo>=</mo><msup><mi>x</mi><mn>2</mn></msup>
  </math>`

class EquationEditingRCC extends Component {
  state = {
    input: '',
    // submitted: false,
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
      console.log(newMath, "New Math Here");
      if (/<msup>/.test(newMath)) {
        console.log('quadratic')
        this.updateQuadGraph();
      } else {
        this.updateGraph();
        console.log('linear')
      }
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

  updateQuadGraph = () => {
   let equation = this.state.input.substring(4);
   let groups = equation.split(' ');
   let powerSection = groups[0];
   let firstOp = groups[1];
   groups.shift();
   groups.shift();
   let end = groups.join(' ');

   let info = {
     powerSection,
     firstOp,
     end
   }
  

//powersection 
let startLocation = null;
let start = powerSection.split('');
    start.forEach((char, index) => {
        if (char === 'x'){
          startLocation = index;
        }
    });
    
let prefix = 1;
    if (startLocation !== 0){
    prefix = parseInt(powerSection.substring(0, startLocation)); 
    }

    let yVals = [];
    this.state.chartData.datasets[0].data.forEach(point => {
    console.log(point.x)
    let power = Math.pow(point.x, powerSection.substring(startLocation+2))
    let finalStart = prefix * power;
// firstOp - deal with this after using eval.
// end section
   let endLocation = null;
   let endChars = end.split('');
      endChars.forEach((char, index) => {
        if (char === 'x'){
          endLocation = index;
        }
    });
    let finalEnd = end.substring(0, endLocation) * point.x + eval(end.substring(endLocation+1));
    let a = finalStart.toString();
    console.log(a, " <- a")
    let b = finalEnd.toString();
    console.log(b, " <- b")
    let y = eval(a + firstOp + b);

    console.log(y);
    yVals.push(y);
    })

    console.log(yVals);


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
      <h2>Equation Editing and Display</h2>
       <p> Math ML is rendered based on input and presented to the chart.js Scatter graph. <br/>Spacing is important, accepts equations in the forms;<br/>y = mx + c <br/> y = ax^n + bx + c </p>
      <form onSubmit={this.submit}>

       <input type="text" value={this.state.input} onChange={this.updateInput}/>
       <button>Convert</button>
     </form>
    <MathJax math={this.state.math}/>
    <div>
    < Scatter
          data={this.state.chartData}
          options={{maintainAspectRatio: false, showLine: true, animation: {duration: 0}, legend: {
            display: false}, scales: {
      yAxes: [{
          ticks: {
              beginAtZero:true
          }
        }],
        xAxes: [{
          ticks: {
              beginAtZero:true  
          }
        }]
     }}}
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