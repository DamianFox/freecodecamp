var margin = {
    top: 20,
    right: 20,
    bottom: 70,
    left: 40
  },
  width = 1200 - margin.left - margin.right,
  height = 700 - margin.top - margin.bottom;

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var formatCurrency = d3.format("$,.2f");

// Parse the date / time
var parseDate = d3.timeParse("%Y-%m-%d");

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

  var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);

  var y = d3.scaleLinear().range([height, 0]);

  array.forEach(function(d) {
    d[0] = parseDate(d[0]);
    d[1] = +d[1];
  });

  x.domain(array.map(function(d) {
    return new Date(d[0])
  }));
  y.domain([0, d3.max(array, function(d) {
    return d[1];
  })]);
  
  var xAxis = d3.axisBottom(x)
    .tickValues(x.domain().filter(function(d, i) {
      return !(i%20);
    })).tickFormat(d3.timeFormat("%Y"));

  var yAxis = d3.axisLeft()
    .scale(y).ticks(10);

  d3.select(".description")
    .append("text")
    .text(data.description);

  var div = d3.select(".wrapper").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", "-.55em")
    .attr("transform", "rotate(-90)");

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
    .attr("x", function(d) {
      return x(d[0]);
    })
    .attr("width", x.bandwidth())
    .attr("y", function(d) {
      return y(d[1]);
    })
    .attr("height", function(d) {
      return height - y(d[1]);
    })
    .on("mouseover", function(d) {
        var rect = d3.select(this);
        rect.attr("class", "mouseover");
        var currentDateTime = new Date(d[0]);
        var year = currentDateTime.getFullYear();
        var month = currentDateTime.getMonth();
        var dollars = d[1];
        div.transition()
          .duration(200)
          .style("opacity", 0.9);
        div.html("<span class='amount'>" + formatCurrency(dollars) + "&nbsp;Billion </span><br><span class='year'>" + year + ' - ' + months[month] + "</span>")
          .style("left", (d3.event.pageX + 5) + "px")
          .style("top", (d3.event.pageY - 50) + "px");
      })
      .on("mouseout", function() {
        var rect = d3.select(this);
        rect.attr("class", "mouseoff");
        div.transition()
          .duration(500)
          .style("opacity", 0);
      });
});