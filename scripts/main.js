var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var CountryData = new Array();

var Country_continent_code = new Array();

var selectedCountries = new Array();
var selectedCountries_ESData = new Object();

var load_state =
{
  "Page3Part1" : false,
  "Page3Part2" : false,
  "Page3Part3" : false,
  "Page3Part4" : false
}
 var population = new Array();
  var gdparr = new Array();
  var arableland = new Array();
  var landarea = new Array();

d3.json('data/10yravg.json',function(e,d2){

  // console.log(e);
  CountryData = d2;
  CountryData.forEach(function(d) {
	  d.AvgRuralPopln = +d.AvgRuralPopln;
	  population.push(d.population);
	  d.AvgGDP = +d.AvgGDP;
	  gdparr.push(d.AvgGDP);
	  d.AvgArableLand = +d.AvgArableLand;
	  arableland.push(d.AvgArableLand);
	  d.LandArea = +d.LandArea;
	  landarea.push(d.landarea);
  });
 var gdp_range = d3.extent(gdparr);
  //var circle_size = d3.scaleLog().domain([pop_range[0],pop_range[1]]).range([2,10]);
  var x_new = d3.scaleLog()
                .domain([gdp_range[0],gdp_range[1]]).nice()
                .range([0,width]);
  var arableland_range = d3.extent(arableland);
  var y_new = d3.scaleLinear()
                .domain([arableland_range[0],arableland_range[1]]).nice()
                .range([0,height]);

  x.domain(d3.extent(CountryData, function(d) { return d.AvgGDP; })).nice();
  y.domain(d3.extent(CountryData, function(d) { return d.AvgArableLand; })).nice();

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Sepal Width (cm)");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Sepal Length (cm)")

  svg.selectAll(".dot")
      .data(CountryData)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
	  .attr("cx",function(d) { return x_new(d[AvgGDP]);  })
      //.attr("cx", function(d) { return x(d.AvgGDP); })
      .attr("cy", function(d) { return y_new(d.AvgArableLand); });
      //.style("fill", function(d) { return color(d.species); });

  var legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });

});
  
