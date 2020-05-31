const COUNTRY_DATA = [
  { id: 1, value: 8.2, region: "Scotland" },
  { id: 2, value: 2.8, region: "Ireland" },
  { id: 3, value: 4.7, region: "Wales" },
  { id: 4, value: 84.25, region: "England" }
];

const BAR_WIDTH = 50;
const BAR_PADDING = 0.1;
const CHART_WIDTH = 500;
const CHART_HEIGHT = 500;
const HALF_WIDTH = CHART_WIDTH / 2;
const HALF_HEIGHT = CHART_HEIGHT / 2;
const CHART_FONT_SIZE = 18.75;
const CHART_MARGIN = {
  top: CHART_FONT_SIZE * 4,
  right: CHART_FONT_SIZE * 4,
  bottom: CHART_FONT_SIZE * 4,
  left: CHART_FONT_SIZE * 4
};

const container = d3
  .select("body")
  .append("svg")
  .style("padding", CHART_MARGIN)
  .attr("viewBox", [
    0, 0, CHART_WIDTH, CHART_HEIGHT
  ])
  .attr("font-size", CHART_FONT_SIZE);
const title = "Population of the United Kingdom by nation";
container
  .append("title")
  .text(title);

container
  .append("text")
  .style("text-anchor", "middle")
  .attr("transform", `
    translate(
      ${HALF_WIDTH},
      ${CHART_FONT_SIZE}
    )
  `)
  .text(title);

const bars = container
  .selectAll()
  .data(COUNTRY_DATA)
  .enter()
  .append("rect");

bars
  .append("title")
  .text(({ value, region }) => (
    `The population of ${region} is ${value}`
  ));

const xScale = d3
  .scaleBand()
  .domain(COUNTRY_DATA.map(d => d.region))
  .rangeRound([
    CHART_MARGIN.left,
    CHART_WIDTH - CHART_MARGIN.right
  ])
  .padding(BAR_PADDING);

const yScale = d3
  .scaleLinear()
  .domain([0, 100])
  .range([
    CHART_HEIGHT - CHART_MARGIN.bottom,
    CHART_MARGIN.top
  ]);

bars.attr("x", ({ region }) => xScale(region));
bars.attr("y", ({ value }) => yScale(value));
bars.attr("width", xScale.bandwidth())
bars.attr("height", ({ value }) => (
  CHART_HEIGHT - yScale(value) - CHART_MARGIN.bottom
));
bars.style("fill", function randomRGB() {
  const num = Math.round(
    0xffffff * Math.random()
  );
  const r = num >> 16;
  const g = num >> 8 & 255;
  const b = num & 255;
  return `rgb(${r}, ${g}, ${b})`;
});

// x axis
container
  .append("g")
  .attr(
    "transform",
    `translate(
      0, ${CHART_HEIGHT - CHART_MARGIN.bottom}
    )`
  )
  .call(d3.axisBottom().scale(xScale))
  .attr("font-size", CHART_FONT_SIZE);

// x axis text

container.append("text")
  .style("text-anchor", "middle")
  .attr(
    "transform",
    `translate(${HALF_WIDTH}, ${CHART_HEIGHT - CHART_FONT_SIZE})`
  )
  .text("Country");

// y axis
container
  .append("g")
  .attr(
    "transform",
    `translate(${CHART_MARGIN.left}, 0)`
  )
  .call(d3.axisLeft().scale(yScale))
  .attr("font-size", CHART_FONT_SIZE);

// y axis text
container.append("text")
  .style("text-anchor", "middle")
  .attr(
    "transform",
    `translate(
      ${CHART_FONT_SIZE},
      ${HALF_HEIGHT}
    ) rotate(-90)`
  )
  .text("Population (%)");