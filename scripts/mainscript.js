d3.csv("data/10yravg.csv", function(data) {
  data[0];
});

var initialScaleData = [0, 1000, 3000, 2000, 5000, 4000, 7000, 6000, 9000, 8000, 10000];

var newScaledData = [];

var linearScale = d3.scale.linear()
                   .domain([0,d3.max(initialScaleData)])
                   .range([0,100]);

for (var i = 0; i < initialScaleData.length; i++) {
  newScaledData[i] = linearScale(initialScaleData[i]);
}

newScaledData;
//[0, 10, 30, 20, 50, 40, 70, 60, 90, 80, 100]


var circle = svg.selectAll("circle")
  .data(data);

circle.exit().remove();

circle.enter().append("circle")
    .attr("r", 2.5)
  .merge(circle)
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; });
	
	circle.enter().append("circle")
    .attr("r", 0)
  .transition()
    .attr("r", 2.5);
	
	circle.exit().transition()
    .attr("r", 0)
    .remove();