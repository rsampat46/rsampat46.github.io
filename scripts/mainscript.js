var jsonCircles = [
{
"x_axis":30,
"y_axis":30,
"radius":20,
"color":"pink"
},{
"x_axis":60,
"y_axis":60,
"radius":20,
"color":"blue"
},{
"x_axis":90,
"y_axis":90,
"radius":20,
"color":"yellow"
}
];

var svgContainer = d3.select("body").append("svg")
                                    .attr("width", 200)
                                    .attr("height", 200);
var circles = svgContainer.selectAll("circle")
.data(jsonCircles)
.enter()
.append("circle");
var circleattr = circles.attr("cx",function(d){return d.x_axis;})
.attr("cy",function(d){return d.y_axis;})
.attr("r",function(d){return d.radius;})
.style("fill",function(d){return d.color;});
