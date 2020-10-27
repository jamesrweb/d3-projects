function createBars(chart, data, params) {
  chart
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("width", params.SCALES.X_SCALE.bandwidth())
    .attr("height", data => params.CHART_HEIGHT - Y_SCALE(data.value))
    .attr("id", data => data.id)
    .attr("x", data => params.SCALES.X_SCALE(data.region))
    .attr("y", data => params.SCALES.Y_SCALE(data.value));
}

function createBarLabels(chart, data, params) {
  const barX = data => params.SCALES.X_SCALE(data.region);
  const barWidth = data => params.SCALES.X_SCALE.bandwidth();
  const barHeight = data => params.SCALES.Y_SCALE(data.value);

  chart
    .selectAll(".label")
    .data(data)
    .enter()
    .append("text")
    .text(data => data.value)
    .attr("id", data => `label-${data.id}`)
    .attr("x", data => barX(data) + barWidth(data) / 2)
    .attr("y", data => barHeight(data) - 20)
    .attr("text-anchor", "middle")
    .classed("label", true);
}

function createAxisLabels(chart, data, params) {
  const X_AXIS = d3.axisBottom(params.SCALES.X_SCALE);
  chart
    .append("g")
    .call(X_AXIS.tickSizeOuter(0))
    .attr("color", "#4f009e")
    .attr("transform", `translate(0, ${params.CHART_HEIGHT})`)
}

let UNSELECTED_IDS = [];
function createControls(chart, data, params) {
  const ITEMS = d3
    .select("#data")
    .select("ul")
    .selectAll("li")
    .data(data)
    .enter()
    .append("li");

  ITEMS
    .append("span")
    .text(data => data.region);

  ITEMS
    .append("input")
    .attr("type", "checkbox")
    .attr("checked", true)
    .on("change", point => {
      const BAR = d3.select(`#${point.id}`);
      const BAR_LABEL = d3.select(`#label-${point.id}`);
      if (UNSELECTED_IDS.includes(point.id)) {
        BAR.attr("visibility", "visible");
        BAR_LABEL.attr("visibility", "visible");
        UNSELECTED_IDS = UNSELECTED_IDS.filter(id => point.id !== id);
      } else {
        BAR.attr("visibility", "hidden");
        BAR_LABEL.attr("visibility", "hidden");
        UNSELECTED_IDS.push(point.id);
      }
    });
}

function renderChart(chart, data, params) {
  createBars(chart, data, params);
  createBarLabels(chart, data, params);
  createAxisLabels(chart, data, params);
  createControls(chart, data, params);
}