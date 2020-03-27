import React, { Component } from 'react';
import * as d3 from 'd3';

class Graph2 extends Component {

  componentDidMount() {

    const margin = {top: 30, right: 80, bottom: 30, left: 30};
    const width = 700;
    const height = 300;
    // const svg = d3.select(this.refs.canvas)
    // .append('svg')
    // .style('border', '1px solid black')
    // .attr("width", width + margin.left + margin.right)
    // .attr("height", height + margin.top + margin.bottom)
    // .append("g")
    // .attr("transform", `translate(${margin.left},${margin.top})`);

const nodes = [
 {name: 'A', category: '0'},
 {name: 'B', category: '0'},
 {name: 'C', category: '0'},
 {name: 'D', category: '0'},
 {name: 'E', category: '1'},
 {name: 'F', category: '1'},
 {name: 'G', category: '1'},
 {name: 'H', category: '1'}
]

const links = [
  {source: 0, target: 1},
  {source: 2, target: 3},
  {source: 3, target: 1},
  {source: 6, target: 6},
  {source: 4, target: 2},
  {source: 1, target: 7},
  {source: 7, target: 4},
  {source: 1, target: 7}
]

    // const link = svg.append("g")
    //     .attr("class", "links")
    //     .selectAll("line")
    //     .data(links)
    //     .enter().append("line");

    // const node = svg.append("g")
    //     .attr("class", "nodes")
    //     .selectAll("circle")
    //     .data(nodes)
  
  const xCenter = {
    0: (width / 1),
    1: (width / 3)
  }

  const yCenter = {
    0: (height / 2),
    1: (height / 2)
  }

const simulation = d3.forceSimulation(nodes)
  .force('charge', d3.forceManyBody().strength(null))
  .force('center', d3.forceCenter(width / 2, height / 2))
  .force('link', d3.forceLink().links(links))
  .force('x', d3.forceX().x(function(d) {
  return xCenter[d.category];
  }).strength(1))
  // .force('y', d3.forceY().y(function(d) {
  // return yCenter[d.category];
  // }))
  .on('tick', ticked);



function updateLinks() {
  var u = d3.select('.links')
    .selectAll('line')
    .data(links)

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

function updateNodes() {
 const  u = d3.select('.nodes')
    .selectAll('text')
    .data(nodes)

  u.enter()
    // .append('circle')
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



  render() {
    return (
        // <div ref="canvas"></div>
    <svg width="700" height="300">
      <g class="links"></g>
      <g class="nodes"></g>
    </svg>

    );
  }
}

export default Graph2;