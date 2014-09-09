var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 500,
    height = 240 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select("#contribution-chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data.tsv", type, function(error, data) {
  x.domain(data.map(function(d) { return d.month; }));
  y.domain([0, d3.max(data, function(d) { return d.amount; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Amount");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.month) + .5; })
      .attr("y", function(d) { return height + .5; })   
      .attr("width", x.rangeBand())
      .transition().delay(function (d,i){ return i * 50;})    
      .attr("height", function(d) { return height - y(d.amount); })
      .attr("y", function(d) { return y(d.amount) +.5; });
});

function type(d) {
  d.amount = +d.amount;
  return d;
}
