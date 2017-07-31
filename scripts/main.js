var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;
	

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);




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
	  population.push(d.AvgRuralPopln);
	  d.AvgGDP = +d.AvgGDP;
	  gdparr.push(d.AvgGDP);
	  d.AvgArableLand = +d.AvgArableLand;
	  arableland.push(d.AvgArableLand);
	  d.LandArea = +d.LandArea;
	  landarea.push(d.landarea);
	 // d.continent = +d["continent"];
	  Country_continent_code.push(d["continent"]);	  
  });
  var pop_range = d3.extent(population);
  var circle_size = d3.scale.log().domain([1,pop_range[1]]).range([2,10]);
 
 var gdp_range = d3.extent(gdparr);
 var x_new = d3.scale.log()
                .domain([1,gdp_range[1]])
                .range([1000000,width]);
  var arableland_range = d3.extent(arableland);
  var y_new = d3.scale.linear()
                .domain([arableland_range[0],arableland_range[1]]).nice()
                .range([height,0]);
var color = d3.scale.category10();
  //x.domain(d3.extent(CountryData, function(d) { return d.AvgGDP; })).nice();
  //y.domain(d3.extent(CountryData, function(d) { return d.AvgArableLand; })).nice();
var xAxis = d3.svg.axis()
    .scale(x_new)
	.tickValues([1000000,1000000000,  100000000000,  10000000000000])
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y_new)
	.tickValues([10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
    .orient("left");
var tooltip = d3.select("svg").append("div")
                  .attr("class", "tooltip")
                  .style("opacity", 0);

              // tooltip mouseover event handler
              var tipMouseover = function(d) {
                  //var color = colorScale(d.manufacturer);
                  var html  = d.CountryName + "<br/>" +
                              "<span style='color:black;'>" + d.AvgRuralPopln + "</span><br/>" +
                              "<b>" + d.LandArea + "</b> , <b/>" + d.AvgArableLand + "</b> % arable";

                  tooltip.html(html)
                      .style("left", (d3.event.pageX + 15) + "px")
                      .style("top", (d3.event.pageY - 28) + "px")
                    .transition()
                      .duration(200) // ms
                      .style("opacity", .9) // started as 0!

              };
              // tooltip mouseout event handler
              var tipMouseout = function(d) {
                  tooltip.transition()
                      .duration(300) // ms
                      .style("opacity", 0); // don't care about position!
              };
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Average 10 year GDP(US$)");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)	
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Arable Land (% of Land area)")

  svg.selectAll(".dot")
      .data(CountryData)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", function(d) { var retval=0; if(d.AvgRuralPopln === 0) { retval=0;}else{retval=circle_size(d.AvgRuralPopln);} return retval;})
	  .attr("cx",function(d) { var retval=0; if(d.AvgGDP === 0) { retval=0;}else{retval=x_new(d.AvgGDP);} return retval; })
      //.attr("cx", function(d) { return x(d.AvgGDP); })
      .attr("cy", function(d) { return y_new(d.AvgArableLand); })
      .style("fill", function(d){return color(d.continent);})
	  .on("mouseover", tipMouseover)
      .on("mouseout", tipMouseout);

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
      .text(function(d) { return d.continent; });

});
  
