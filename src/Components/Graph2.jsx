import React, { Component } from 'react';
import * as d3 from 'd3';

class Graph2 extends Component {

  state = {
    source: 0,
    target: 0,
    nodes: [
 {name: '0', category: '0'},
 {name: '1', category: '0'},
 {name: '2', category: '0'},
 {name: '3', category: '0'},
 {name: '4', category: '1'},
 {name: '5', category: '1'},
 {name: '6', category: '1'},
 {name: '7', category: '1'}
],
    links: [
  {source: 0, target: 6},
  {source: 1, target: 7},
  {source: 2, target: 5},
  {source: 3, target: 4},
  // {source: 1, target: 5},
  // {source: 0, target: 5},
  // {source: 3, target: 6},
]
  }

componentDidMount() {
  this.setState({mounted: true})
}

componentDidUpdate = () => {
    const margin = {top: 30, right: 80, bottom: 30, left: 30};
    const width = 600;
    const height = 400;

  const xCenter = {
    0: (width / 1),
    1: (width / 3)
  }

  const yCenter = {
    0: (height / 2),
    1: (height / 2)
  }

const simulation = d3.forceSimulation(this.state.nodes)
  .force('charge', d3.forceManyBody().strength(0))
  .force('collisionForce', d3.forceCollide(12).strength(1))
  .force('center', d3.forceCenter(width / 2, height / 2))
  .force('link', d3.forceLink().links(this.state.links))
  .force('x', d3.forceX().x(function(d) {
  return xCenter[d.category];
  }).strength(1))
  .on('tick', ticked)

const updateLinks = () => {
  var u = d3.select('.links')
    .selectAll('line')
    .data(this.state.links)

  u.enter()
    .append('line')
    .merge(u)
    .attr('x1', function(d) {
      return d.source.x
    })
    .attr('y1', function(d) {
      return d.source.y
    })
    .attr('x2', function(d) {
      return d.target.x
    })
    .attr('y2', function(d) {
      return d.target.y
    })

  u.exit().remove()
}

const updateNodes = () => {
 const  u = d3.select('.nodes')
    .selectAll('text')
    .data(this.state.nodes)

  u.enter()
    .append('text')
    .text(function(d) {
      return d.name
    })
    .merge(u)
    .attr('x', function(d) {
      return d.x
    })
    .attr('y', function(d) {
      return d.y
    })
    .attr('dy', function(d) {
      return 5
    })

  u.exit().remove()
}

function ticked() {
  updateLinks()
  updateNodes()
}
}


onInput = (event) => {
  const id = event.target.id;
  const value = event.target.value;
  console.log(event.target.id, event.target.value);
  this.setState({[id]: value})
};

onSubmit = (event) => {
  event.preventDefault();
  console.log('sumbitted');
  this.setState(currentState => {
    const newLinks = [...currentState.links]
    newLinks.push({source: currentState.source, target: currentState.target});
    return {links: newLinks}
  })
}


  render() {
    console.log(this.state)
    return (
      <>
        <h2>Bigraph Display</h2>
       <p> An approach to displaying a Bigraph, use a force presentation and weight each node based on it set. </p>
        <div class="bigraph-container">
    <svg width="600" height="400">
      <g class="links"></g>
      <g class="nodes"></g>
    </svg>

    <div>
    <p>Add Link</p>
    <form action="/" onSubmit={this.onSubmit}>
    <input type='number' id="source" placeholder= 'Source Node' onChange={this.onInput}></input>
    <input type='number' id="target" placeholder= 'Target Node' onChange={this.onInput}></input>
    <button> add link </button>
    </form>
    </div>
      </div>
      </>
    );
  }
}

export default Graph2;