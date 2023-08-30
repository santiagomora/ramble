const maxSess = 59;

function convertTime(time) {
  return [parseInt(time / 60), time % 60];
}

function TimeConf(props) {
  let [min, sec] = convertTime(props.time);
  const minRef = React.useRef(null),
  secRef = React.useRef(null);;
  min = min < 9 ? "0" + min : min;
  sec = sec < 9 ? "0" + sec : sec;
  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("button", {
      disable: props.pause,
      type: props.type,
      onClick: props.changeClick,
      className: "transparent noborder gray noout",
      id: `${props.type}-decrement` }, /*#__PURE__*/
    React.createElement("i", { className: "fas fa-arrow-down" })), /*#__PURE__*/

    React.createElement("input", {
      className: "text-center noborder setbox lfont noout",
      placeholder: "minutes",
      readOnly: !props.pause,
      type: "number",
      name: "min",
      min: 0,
      max: maxSess,
      ref: minRef,
      onChange:
      e => {
        const val = parseInt(minRef.current.value || 0);
        if (val <= maxSess) {
          props.setTime(
          parseInt(e.currentTarget.value || 0),
          parseInt(secRef.current.value || 0),
          props.type);

          minRef.current.value = val <= 9 ? "0" + val : val;
        }
      },

      value: min }), /*#__PURE__*/
    React.createElement("h2", { className: "inblock nomargin lgray", style: { paddingRight: "23px", width: "10px" } }, ":"), /*#__PURE__*/


    React.createElement("button", {
      disable: props.pause,
      type: props.type,
      onClick: props.changeClick,
      className: "transparent noborder gray noout",
      id: `${props.type}-increment` }, /*#__PURE__*/
    React.createElement("i", { className: "fas fa-arrow-up" })), /*#__PURE__*/

    React.createElement("input", {
      className: "text-center lfont noborder setbox noout",
      placeholder: "seconds",
      readOnly: !props.pause,
      type: "number",
      min: 0,
      max: 59,
      name: "sec",
      id: `${props.type}-length`,
      ref: secRef,
      onChange:
      e => {
        const val = parseInt(secRef.current.value || 0);
        if (val < 60) {
          props.setTime(
          parseInt(minRef.current.value || 0),
          parseInt(e.currentTarget.value || 0),
          props.type);

          secRef.current.value = val <= 9 ? "0" + val : val;
        }
      },

      value: sec }), /*#__PURE__*/
    React.createElement("strong", { style: {
        verticalAlign: "text-bottom" },
      id: `${props.type}-label` },
    props.type)));



}

function Controls(props) {
  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("button", {
      className: "padding transparent noborder xlfont stpadding gray noout",
      disabled: !props.pause || props.time === 0,
      style: { paddingRight: "35px" },
      onClick: props.start }, /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("i", { className: "fas fa-play" })), /*#__PURE__*/

    React.createElement("div", { className: "sfont", id: "start_stop" }, "start")), /*#__PURE__*/

    React.createElement("button", {
      className: "cbutton transparent noborder xlfont stpadding gray noout",
      disabled: props.pause,
      onClick: props.pauseClick }, /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("i", { className: "fas fa-pause" })), /*#__PURE__*/

    React.createElement("div", { className: "sfont" }, "pause")), /*#__PURE__*/

    React.createElement("button", {
      className: "padding transparent noborder xlfont stpadding gray noout",
      disabled: props.past === 0,
      style: { paddingLeft: "35px" },
      id: "reset",
      onClick: props.reset }, /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("i", { className: "fas fa-history" })), /*#__PURE__*/

    React.createElement("div", { className: "sfont" }, "reset"))));



}

function Title(props) {
  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("h3", { className: "text-center nomargin" }, /*#__PURE__*/
    React.createElement("strong", null, /*#__PURE__*/
    React.createElement("i", { style: { color: "var(--main)" }, class: "fab fa-free-code-camp" }))), /*#__PURE__*/


    React.createElement("h1", { className: "title nomargin",
      style: { color: "var(--main)" } }, /*#__PURE__*/
    React.createElement("strong", null, "pomodoro")), /*#__PURE__*/



    React.createElement("h2", { className: "nomargin" }, "clock")));




}

class PomodoroClock extends React.Component {
  constructor() {
    super();
    this.state = {
      on: false,
      past: 0,
      pause: true,
      break: 5,
      session: 45,
      isTime: true };

    this.startClock = this.startClock.bind(this);
    this.activateClock = this.activateClock.bind(this);
    this.pauseClock = this.pauseClock.bind(this);
    this.setTime = this.setTime.bind(this);
    this.resetClock = this.resetClock.bind(this);
    this.changeClick = this.changeClick.bind(this);
  }

  activateClock(past, time) {
    if (past <= time)
    setTimeout(
    () => {
      if (!this.state.pause)
      this.setState(
      { past: past + 1 },
      () => this.activateClock(past + 1, time));

    }, 1000);else


    this.setState(
    {
      isTime: !this.state.isTime,
      past: 0 },

    () => this.activateClock(
    0,
    this.state.isTime ?
    this.state.session :
    this.state.break));


  }

  setTime(min, sec, type) {
    const st = this.state;
    st[type] = 60 * min + sec;
    st.past = 0;
    if (this.state.pause)
    this.setState(st);
  }

  startClock(e) {
    e.preventDefault();
    const st = this.state;
    this.setState(
    { pause: false },
    () =>
    this.activateClock(
    st.past,
    st.isTime ?
    st.session :
    st.break));


  }

  changeClick(e) {
    e.preventDefault();
    const type = e.currentTarget.getAttribute('type'),
    id = e.currentTarget.id,
    st = this.state;
    if (this.state.pause) {
      st[type] = id.match('increment') ?
      st[type] + 1 :
      st[type] - 1;
      if (st[type] >= 0)
      this.setState(st);
    }
  }

  pauseClock(e) {
    e.preventDefault();
    this.setState({ pause: true });
  }

  resetClock(e) {
    e.preventDefault();
    this.setState({
      pause: true,
      past: 0 });

  }

  render() {
    const st = this.state,
    time = st.isTime ?
    st.session :
    st.break,
    [pmin, psec] = convertTime(time - st.past);
    return /*#__PURE__*/(
      React.createElement("div", { className: "col-md-12 col-lg-8 col-xl-8 col-sm-10 col-xs-12 container-fluid", style: { paddingTop: "30px" } }, /*#__PURE__*/
      React.createElement("div", { className: "padding" }, /*#__PURE__*/
      React.createElement("div", { className: "row justify-content-center padding" }, /*#__PURE__*/
      React.createElement("div", { className: "col-md-6 text-center" }, /*#__PURE__*/
      React.createElement(Title, null))), /*#__PURE__*/


      React.createElement("div", { className: "row justify-content-center" }, /*#__PURE__*/
      React.createElement("div", { className: "col-md-4 text-center" }, /*#__PURE__*/
      React.createElement("div", { id: "time-left", style: { marginTop: "-20px" } }, /*#__PURE__*/
      React.createElement("div", { className: "xxlfont inblock" },
      pmin < 10 ? "0" + pmin : pmin), /*#__PURE__*/

      React.createElement("div", { className: "xxxlfont inblock" }, /*#__PURE__*/
      React.createElement("span", { className: "lgray" }, ":"), /*#__PURE__*/
      React.createElement("strong", null, psec < 10 ? "0" + psec : psec))), /*#__PURE__*/


      React.createElement("div", { className: "text-center", style: { marginTop: "-20px" } }, /*#__PURE__*/
      React.createElement("strong", { id: "timer-label" },
      st.isTime ? "session" : "break"))), /*#__PURE__*/



      React.createElement("div", { className: "col-md-4 text-left" }, /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement(TimeConf, {
        changeClick: this.changeClick,
        type: "session",
        time: st.session,
        pause: st.pause,
        setTime: this.setTime })), /*#__PURE__*/

      React.createElement("div", null, /*#__PURE__*/
      React.createElement(TimeConf, {
        changeClick: this.changeClick,
        type: "break",
        time: st.break,
        pause: st.pause,
        setTime: this.setTime }), /*#__PURE__*/
      React.createElement("div", { className: "inblock margin" })))), /*#__PURE__*/




      React.createElement("div", { className: "row" }, /*#__PURE__*/
      React.createElement("div", { className: "padding col-md-12 text-center" }, /*#__PURE__*/
      React.createElement(Controls, {
        past: st.past,
        pause: st.pause,
        time: st.time,
        start: this.startClock,
        pauseClick: this.pauseClock,
        reset: this.resetClock }))))));





  }}
;

ReactDOM.render( /*#__PURE__*/
React.createElement(PomodoroClock, null),
document.getElementById('drum-machine'));