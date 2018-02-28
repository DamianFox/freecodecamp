
var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 1200 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

// Parse the date / time
// var parseDate = d3.timeParse("%Y-%m-%d");

var svg = d3.select("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

var jsonUrl = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json";

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json(jsonUrl, function(error, data) {
  if (error) return console.warn(error);

  var array = data.data;
  var l = array.length;

  // var minDate = new Date(array[0][0]);
  // var maxDate = new Date(array[l-1][0]);
  // var minYear = minDate.getFullYear();
  // var maxYear = maxDate.getFullYear();

  var x = d3.scaleBand().rangeRound([0, width]);

  var y = d3.scaleLinear().range([height, 0]);
    
  var xAxis = d3.axisBottom()
      .scale(x).ticks(d3.timeInterval(4));

  var yAxis = d3.axisLeft()
      .scale(y).ticks(10);

  array.forEach(function(d) {
        d[0] = new Date(d[0]).getFullYear();
        d[1] = +d[1];
  });

  x.domain(array.map(function(d) { return d[0] }));
  y.domain([0, d3.max(array, function(d) { return d[1]; })]);

  d3.select(".description")
      .append("text")
      .text(data.description);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Value ($)");

  svg.selectAll("bar")
      .data(array)
    .enter().append("rect")
      .style("fill", "steelblue")
      .attr("x", function(d) { return x(d[0]); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d[1]); })
      .attr("height", function(d) { return height - y(d[1]); });
});
