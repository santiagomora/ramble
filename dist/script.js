const NUMTICK = 14;

const getTickValues = data => data.reduce(
(t, e) => [...t, e[0]],
[]);


const getMax = (a1, a2, a3) => {
  if (a1 > a2 && a1 > a3)
  return a1;
  if (a2 > a3)
  return a2;
  return a3;
};

//return [max,min]
const getPoints = data => data.reduce(
(res, e) => [...res, e.Time],
[]);


function mountGraph() {

  const dataset = this.state.data,

  cont = this.graph.current,

  w = cont.clientWidth,

  h = d3.max(dataset, d => d.Seconds / 4),

  xMax = d3.max(dataset, d => d.Year),

  xMin = d3.min(dataset, d => d.Year),

  padding = 60,

  xScale = d3.scaleLinear().
  domain([xMin, xMax]).
  range([padding, w - padding]),

  yScale = d3.scalePoint().
  domain(getPoints(dataset)).
  range([h - padding, padding]),

  svg = d3.select(cont).
  append("svg").
  attr("width", w).
  attr("height", h);

  const xAxis = d3.axisBottom(xScale).
  tickSize(-h + 2 * padding).
  tickSizeOuter(0);

  const yAxis = d3.axisLeft(yScale).
  tickSize(-w + 2 * padding).
  tickSizeOuter(0);
  //.tickFormat( (e,i) => i%3 === 0 ? e : "" );

  svg.append("g").
  attr("id", "x-axis").
  attr("class", "grid").
  attr("transform", `translate(0,${h - padding})`).
  call(xAxis);

  svg.append("g").
  attr("id", "y-axis").
  attr("class", "grid").
  attr("transform", `translate(${padding},0)`).
  call(yAxis);

  svg.append("text").
  attr("transform", "rotate(-90)").
  attr("y", 0).
  attr("x", -h / 2 - padding).
  attr("dy", "1em").
  style("font-weight", "bold").
  text("Time [ Minutes ]");

  svg.append("text").
  attr("transform", `translate(0,${h - padding + 20})`).
  attr("y", 0).
  attr("x", w / 2 - padding).
  attr("dy", "1em").
  style("font-weight", "bold").
  text("Year");

  svg.selectAll("circle").
  data(dataset).
  enter().
  append("circle").
  attr("class", "dot").
  attr("fill", d => d.Doping.length > 0 ? "#dc3545" : "#17a2b8").
  attr("stroke", "#333").
  attr("data-xvalue", d => d.Year).
  attr("data-yvalue", d => d.Time).
  attr("cx", d => xScale(d.Year)).
  attr("cy", d => h - yScale(d.Time)).
  attr("r", d => 5);

  const legendGroup = svg.append("g").
  attr("id", "legend").
  attr(
  "transform",
  `translate(${w - 300 - padding},${padding})`);


  legendGroup.append("rect").
  attr("fill", "#333").
  attr("opacity", 0.8).
  attr("rx", 5).
  attr("ry", 5).
  attr("width", 300).
  attr("height", 50);

  legendGroup.append("circle").
  attr("fill", "#17a2b8").
  attr("stroke", "white").
  attr("cx", 10).
  attr("cy", 34).
  attr("r", 5);

  legendGroup.append("circle").
  attr("fill", "#dc3545").
  attr("stroke", "white").
  attr("cx", 10).
  attr("cy", 14).
  attr("r", 5);

  legendGroup.append("text").
  attr("dy", "1em").
  attr("fill", "white").
  attr("font-size", 14).
  attr("x", 20).
  attr("y", 5).
  style("font-weight", "lighter").
  text("Riders with doping allegations");

  legendGroup.append("text").
  attr("dy", "1em").
  attr("fill", "white").
  attr("font-size", 14).
  attr("x", 20).
  attr("y", 25).
  style("font-weight", "lighter").
  text("Riders without doping allegations");

  const txtGroup = svg.append("g").
  attr("id", "tooltip").
  attr("class", "tp").
  attr("visibility", "hidden");

  txtGroup.append("rect").
  attr("class", "tptxt rect-txt-bg").
  attr("fill", "#333").
  attr("rx", 5).
  attr("ry", 5).
  attr("height", 70);

  txtGroup.append("text").
  attr("dy", "1em").
  attr("fill", "white").
  attr("class", "tptxt tp-name").
  attr("x", 10).
  attr("y", 5).
  style("font-weight", "lighter");

  txtGroup.append("text").
  attr("class", "tptxt tp-year").
  attr("fill", "white").
  attr("dy", "1em").
  attr("x", 10).
  attr("y", 25).
  style("font-weight", "lighter");

  txtGroup.append("text").
  attr("dy", "1em").
  attr("fill", "white").
  attr("class", "tptxt tp-dope").
  attr("x", 10).
  attr("y", 45).
  style("font-weight", "lighter");

  svg.selectAll(`circle.dot`).
  on("mouseover", el => {
    let txtWidth;
    const date = new Date(el[0]),
    box = cont.getBoundingClientRect(),
    mX = d3.event.clientX - box.left + 10,
    mY = d3.event.clientY - box.top + 10,
    txtName = txtGroup.select("text.tp-name"),
    txtYear = txtGroup.select("text.tp-year"),
    txtDope = txtGroup.select("text.tp-dope"),
    txtBg = txtGroup.select("rect.rect-txt-bg");

    txtGroup.attr("visibility", "visible");

    txtName.text(`${el.Name}: ${el.Nationality}`);
    txtYear.text(`Year: ${el.Year}, Time: ${el.Time}`);
    txtDope.text(el.Doping ? `Doping: ${el.Doping}` : "No Doping allegations");

    txtWidth = getMax(
    txtName.node().getComputedTextLength(),
    txtYear.node().getComputedTextLength(),
    txtDope.node().getComputedTextLength());


    txtBg.attr("width", txtWidth + 40);

    txtGroup.attr(
    "transform",
    `translate(${el.Year >= 2010 ? mX - (txtWidth + 30) : mX},${mY})`);

  }).
  on("mouseout", el => {
    txtGroup.attr("visibility", "hidden");
  });

}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
    this.graph = React.createRef(null);
    this.mount = mountGraph.bind(this);
  }

  componentDidMount() {
    const req = axios.get('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json').
    then(
    res => {this.setState({ data: res.data });}).
    catch(
    (err) =>
    console.log(err) // not handling api request errors
    );
  }

  render() {
    const data = this.state.data;
    if (data)
    this.mount();
    return /*#__PURE__*/(
      React.createElement(React.Fragment, null, /*#__PURE__*/
      React.createElement("div", { ref: this.graph })));



  }}


if (document.getElementById('app')) {
  ReactDOM.render( /*#__PURE__*/
  React.createElement(App, null),
  document.getElementById('app'));

}