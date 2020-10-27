const DUMMY_DATA = [
  { id: "d1", region: "Germany", value: 10 },
  { id: "d2", region: "United Kingdom", value: 12 },
  { id: "d3", region: "China", value: 11 },
  { id: "d4", region: "India", value: 6 }
];

const CHART_MARGINS = { top: 20, bottom: 10 };
const CHART_WIDTH = 600;
const CHART_HEIGHT = 400 - CHART_MARGINS.top - CHART_MARGINS.bottom;

const CHART_CONTAINER = d3.select("svg");
CHART_CONTAINER.attr("viewBox", `0 0 ${CHART_WIDTH} ${CHART_HEIGHT + CHART_MARGINS.top + CHART_MARGINS.bottom}`);

const CHART = CHART_CONTAINER.append("g");

const X_SCALE = d3.scaleBand();
X_SCALE.rangeRound([0, CHART_WIDTH]);
X_SCALE.padding(0.1);
X_SCALE.domain(DUMMY_DATA.map(point => point.region));

const Y_SCALE = d3.scaleLinear();
Y_SCALE.range([CHART_HEIGHT, 0]);
Y_SCALE.domain([0, d3.max(DUMMY_DATA, point => point.value) + 3]);

renderChart(CHART, DUMMY_DATA, {
  CHART_WIDTH,
  CHART_HEIGHT,
  SCALES: { X_SCALE, Y_SCALE }
});