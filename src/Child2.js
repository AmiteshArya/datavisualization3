import React, { Component } from "react";
import * as d3 from "d3";

class Child2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {
    var data = this.props.data2;

    var avgTipByDay = d3.rollups(data, 
      v => d3.mean(v, d => d.tip),
      d => d.day
    ).sort((a, b) => ["Sun", "Sat", "Thur", "Fri"].indexOf(a[0]) - ["Sun", "Sat", "Thur", "Fri"].indexOf(b[0]));

    var margin = { top: 50, right: 50, bottom: 50, left: 50 },
      w = 500 - margin.left - margin.right,
      h = 300 - margin.top - margin.bottom;

    var container = d3.select(".child2_svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom);

    var g = container.select(".g_2")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const x_scale = d3.scaleBand().domain(avgTipByDay.map(d => d[0])).range([0, w]).padding(0.2);

    g.selectAll(".x_axis_g").data([0]).join('g').attr("class", 'x_axis_g')
      .attr("transform", `translate(0, ${h})`).call(d3.axisBottom(x_scale));

    const y_scale = d3.scaleLinear().domain([0, d3.max(avgTipByDay, d => d[1])]).range([h, 0]);

    g.selectAll(".y_axis_g").data([0]).join('g').attr("class", 'y_axis_g')
      .call(d3.axisLeft(y_scale));

    g.selectAll(".bar")
      .data(avgTipByDay)
      .join("rect")
      .attr("class", "bar")
      .attr("x", d => x_scale(d[0]))
      .attr("y", d => y_scale(d[1]))
      .attr("width", x_scale.bandwidth())
      .attr("height", d => h - y_scale(d[1]))
      .attr("fill", "#69b3a2");

    container.selectAll(".x_label").data([0]).join("text")
      .attr("class", "x_label")
      .attr("x", w / 2 + margin.left)
      .attr("y", h + margin.top + 40)
      .style("text-anchor", "middle")
      .text("Day");

    container.selectAll(".y_label").data([0]).join("text")
      .attr("class", "y_label")
      .attr("x", -(h / 2) - margin.top)
      .attr("y", margin.left - 30)
      .attr("transform", "rotate(-90)")
      .style("text-anchor", "middle")
      .text("Average Tip");

    container.selectAll(".chart_title").data([0]).join("text")
      .attr("class", "chart_title")
      .attr("x", w / 2 + margin.left)
      .attr("y", margin.top - 20)
      .style("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Average Tip by Day");
  }

  render() {
    return <svg className="child2_svg">
      <g className="g_2"></g>
    </svg>;
  }
}

export default Child2;
