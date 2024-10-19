import React, { Component } from "react";
import * as d3 from "d3";

class Child1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {
    var data = this.props.data1;

    var margin = { top: 50, right: 50, bottom: 50, left: 50 },
      w = 500 - margin.left - margin.right,
      h = 300 - margin.top - margin.bottom;

    var container = d3.select(".child1_svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom);

    var g = container.select(".g_1")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    var x_data = data.map(item => item.total_bill);
    const x_scale = d3.scaleLinear().domain([0, d3.max(x_data)]).range([0, w]);

    g.selectAll(".x_axis_g").data([0]).join('g').attr("class", 'x_axis_g')
      .attr("transform", `translate(0, ${h})`).call(d3.axisBottom(x_scale));

    var y_data = data.map(item => item.tip);
    const y_scale = d3.scaleLinear().domain([0, d3.max(y_data)]).range([h, 0]);

    g.selectAll(".y_axis_g").data([0]).join('g').attr("class", 'y_axis_g')
      .call(d3.axisLeft(y_scale));

    g.selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", d => x_scale(d.total_bill))
      .attr("cy", d => y_scale(d.tip))
      .attr("r", 3)
      .style("fill", "#69b3a2");

    container.selectAll(".x_label").data([0]).join("text")
      .attr("class", "x_label")
      .attr("x", w / 2 + margin.left)
      .attr("y", h + margin.top + 40)
      .style("text-anchor", "middle")
      .text("Total Bill");

    container.selectAll(".y_label").data([0]).join("text")
      .attr("class", "y_label")
      .attr("x", -(h / 2) - margin.top)
      .attr("y", margin.left - 30)
      .attr("transform", "rotate(-90)")
      .style("text-anchor", "middle")
      .text("Tips");

    container.selectAll(".chart_title").data([0]).join("text")
      .attr("class", "chart_title")
      .attr("x", w / 2 + margin.left)
      .attr("y", margin.top - 20)
      .style("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Total Bill vs Tips");
  }

  render() {
    return <svg className="child1_svg">
      <g className="g_1"></g>
    </svg>;
  }
}

export default Child1;
