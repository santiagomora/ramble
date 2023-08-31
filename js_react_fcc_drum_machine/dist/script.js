const bankOne = {
  '81': {
    code: 81,
    key: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
    ref: React.createRef() },

  '87': {
    code: 87,
    key: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
    ref: React.createRef() },

  '69': {
    code: 69,
    key: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
    ref: React.createRef() },

  '65': {
    code: 65,
    key: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
    ref: React.createRef() },

  '83': {
    code: 83,
    key: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
    ref: React.createRef() },

  '68': {
    code: 68,
    key: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
    ref: React.createRef() },

  '90': {
    code: 90,
    key: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
    ref: React.createRef() },

  '88': {
    code: 88,
    key: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
    ref: React.createRef() },

  '67': {
    code: 67,
    key: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
    ref: React.createRef() } };



const bankTwo = {
  '81': {
    code: 81,
    key: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3',
    ref: React.createRef() },

  '87': {
    code: 87,
    key: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3',
    ref: React.createRef() },

  '69': {
    code: 69,
    key: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3',
    ref: React.createRef() },

  '65': {
    code: 65,
    key: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3',
    ref: React.createRef() },

  '83': {
    code: 83,
    key: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3',
    ref: React.createRef() },

  '68': {
    code: 68,
    key: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3',
    ref: React.createRef() },

  '90': {
    code: 90,
    key: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3',
    ref: React.createRef() },

  '88': {
    code: 88,
    key: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3',
    ref: React.createRef() },

  '67': {
    code: 67,
    key: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3',
    ref: React.createRef() } };



function Volume(props) {
  const vol = parseFloat(props.volume) * 100;
  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("div", { className: "vmargin" }, /*#__PURE__*/
    React.createElement("div", { className: "mid inblock" }, /*#__PURE__*/
    React.createElement("strong", null, "volume")), /*#__PURE__*/



    React.createElement("div", { className: "mid text-right inblock" }, /*#__PURE__*/
    React.createElement("span", { className: "hmargin text.right" },

    props.mute ? /*#__PURE__*/
    React.createElement("i", { style: { color: "red" }, className: "fas fa-volume-mute" }) : /*#__PURE__*/
    React.createElement("strong", null, `${parseInt(vol)}%`)))), /*#__PURE__*/




    React.createElement("div", { className: "vmargin", style: { paddingTop: "3px" } }, /*#__PURE__*/
    React.createElement("div", {
      className: "relative vmargin linemid swcase inblock text-left",
      style: { width: "100%", height: "15px", marginRight: "10px" } }, /*#__PURE__*/
    React.createElement("button", {
      onMouseDown: props.clickIn,
      style: { left: `calc(${vol}% - 15px)`, marginTop: "-8px" },
      className: "sw inblock absolute" })))));




}

function Controls(props) {
  const changeSet = props.changeSet;
  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("div", { className: "vmargin" }, /*#__PURE__*/
    React.createElement("strong", null, "controls")), /*#__PURE__*/



    React.createElement("div", { className: "vmargin" }, /*#__PURE__*/
    React.createElement("div", {
      className: "linemid inblock hmargin linemid",
      style: { marginTop: "2px" } }, /*#__PURE__*/
    React.createElement("button", {
      onClick: props.changeMute,
      className: "sw gray" }, /*#__PURE__*/
    React.createElement("i", { className:
      !props.mute ?
      "fas fa-volume-up" :
      "fas fa-volume-mute" }))), /*#__PURE__*/



    React.createElement("div", { className:
      props.set === 1 ?
      "text-left swcase inblock hmargin" :
      "text-right swcase inblock hmargin" }, /*#__PURE__*/

    React.createElement("button", {
      onClick: changeSet,
      style: { marginTop: "-5px" },
      className: "sw inblock" })), /*#__PURE__*/

    React.createElement("div", {
      className: "gray hmargin inblock",
      style: { verticalAlign: "middle" } },
    `sound set ${props.set + 1}`), /*#__PURE__*/

    React.createElement("div", { className:
      props.active ?
      "hmargin text-left swcase inblock" :
      "hmargin text-right swcase inblock" }, /*#__PURE__*/

    React.createElement("button", {
      onClick: props.changeActive,
      style: { marginTop: "-5px" },
      className: "sw inblock" })), /*#__PURE__*/

    React.createElement("div", {
      className: "gray hmargin inblock",
      style: { verticalAlign: "middle" } },

    props.active ?
    "on" :
    "off"))));





}

function Button(props) {
  const hand = props.audio;
  return /*#__PURE__*/(
    React.createElement("div", {
      className: "inblock",
      style: { margin: "5px" } }, /*#__PURE__*/
    React.createElement("button", {
      className: "drum-pad dial gray",
      id: hand.id,
      onMouseDown:
      e => {
        props.handler(e);
        dispatchClick(e.currentTarget, true);
      },

      audio: hand.code }, /*#__PURE__*/
    React.createElement("audio", {
      ref: hand.ref,
      className: "hidden clip",
      id: hand.key,
      type: "audio/mp3",
      src: hand.url }), /*#__PURE__*/
    React.createElement("strong", null, hand.key))));



}

function Dial(props) {
  const bank = props.set,
  set = Object.values(bank);
  return /*#__PURE__*/(
    React.createElement("div", {
      className: "text-center",
      style: { width: "100%" } }, /*#__PURE__*/
    React.createElement("div", { className:
      props.active ?
      "hidden" :
      "absolute overlay" }), /*#__PURE__*/

    React.createElement("div", null, /*#__PURE__*/
    React.createElement(Button, {
      audio: set[4],
      handler: props.handle }), /*#__PURE__*/
    React.createElement(Button, {
      audio: set[6],
      handler: props.handle }), /*#__PURE__*/
    React.createElement(Button, {
      audio: set[3],
      handler: props.handle })), /*#__PURE__*/

    React.createElement("div", null, /*#__PURE__*/
    React.createElement(Button, {
      audio: set[0],
      handler: props.handle }), /*#__PURE__*/
    React.createElement(Button, {
      audio: set[5],
      handler: props.handle }), /*#__PURE__*/
    React.createElement(Button, {
      audio: set[2],
      handler: props.handle })), /*#__PURE__*/

    React.createElement("div", null, /*#__PURE__*/
    React.createElement(Button, {
      audio: set[8],
      handler: props.handle }), /*#__PURE__*/
    React.createElement(Button, {
      audio: set[7],
      handler: props.handle }), /*#__PURE__*/
    React.createElement(Button, {
      audio: set[1],
      handler: props.handle }))));



}

function clickListeners(arr) {
  let el;
  for (let i = 0; i < arr.length; i++) {
    el = arr[i];
    el.onmouseup = e => e.currentTarget.classList.remove("active");
    el.onmousedown = e => e.currentTarget.classList.add("active");
  }
}

function createMouseEvent(elem, type) {
  let mouse = new MouseEvent(type);
  mouse.initEvent(type, true, true);
  elem.dispatchEvent(mouse);
}

function dispatchClick(elem, isdown) {
  if (!isdown)
  createMouseEvent(elem, "mousedown");
  setTimeout(() => createMouseEvent(elem, "mouseup"), 200);
}

const sets = [bankOne, bankTwo];

class DrumMachine extends React.Component {
  constructor() {
    super();
    this.state = {
      last: "",
      set: 0,
      active: true,
      volume: 0.5,
      vol: false,
      mute: false,
      el: null };

    this.dialClick = this.dialClick.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.changeSet = this.changeSet.bind(this);
    this.enableDial = this.enableDial.bind(this);
    this.changeVol = this.changeVol.bind(this);
    this.volIn = this.volIn.bind(this);
    this.volOut = this.volOut.bind(this);
    this.changeMute = this.changeMute.bind(this);
  }

  dialClick(e) {
    e.preventDefault();
    const id = e.currentTarget.getAttribute("audio"),
    targ = sets[this.state.set][id],
    audio = targ.ref.current;
    audio.volume = this.state.mute ?
    0 :
    Math.round(this.state.volume * 10) / 10;
    audio.currentTime = 0;
    audio.play();
    this.setState({
      last: targ.id.replace(/-/g, " ") });

  }

  changeSet(e) {
    e.preventDefault();
    const set = this.state.set === 0 ?
    1 :
    0;
    this.setState({ set });
  }

  enableDial(e) {
    e.preventDefault();
    this.setState({
      active: !this.state.active,
      last: !this.state.active ?
      "none" :
      "-" });

  }

  keyPress(e) {
    const set = sets[this.state.set][e.keyCode];
    let audio, mouse;
    if (this.state.active && set) {
      e.preventDefault();
      dispatchClick(set.ref.current.parentNode, false);
    }
  }

  volIn(e) {
    e.preventDefault();
    this.setState({
      vol: true,
      el: e.currentTarget });

  }

  volOut(e) {
    if (this.state.vol) {
      e.preventDefault();
      this.setState({
        vol: false,
        el: null });

    }
  }

  changeVol(e) {
    if (this.state.vol) {
      e.preventDefault();
      const vol = this.state.el,
      par = vol.offsetParent,
      lvol = vol.getBoundingClientRect().x,
      lpar = par.getBoundingClientRect();
      let volume;
      if (e.clientX >= lpar.x && e.clientX < lpar.width + lpar.x) {
        this.setState({
          volume: (e.clientX - lpar.x) / lpar.width });

      }
    }
  }

  changeMute(e) {
    e.preventDefault();
    this.setState({ mute: !this.state.mute });
  }

  componentDidMount() {
    document.onkeydown = this.keyPress;
    document.onmousemove = this.changeVol;
    document.onmouseup = this.volOut;
    clickListeners(document.getElementsByClassName("drum-pad"));
  }

  render() {
    const set = sets[this.state.set];
    return /*#__PURE__*/(
      React.createElement("div", { className: "col-md-12 col-lg-8 col-xl-8 col-sm-10 col-xs-12 container-fluid", style: { paddingTop: "100px" } }, /*#__PURE__*/
      React.createElement("div", { className: "row" }, /*#__PURE__*/
      React.createElement("div", { className: "col-md-6 text-center" }, /*#__PURE__*/
      React.createElement(Dial, {
        set: set,
        active: this.state.active,
        handle: this.dialClick })), /*#__PURE__*/

      React.createElement("div", { className: "col-md-6" }, /*#__PURE__*/
      React.createElement("h1", { className: "inblock title",
        style: { margin: "auto 5px auto 0px", color: "var(--main)" } }, /*#__PURE__*/
      React.createElement("strong", null, " ", /*#__PURE__*/React.createElement("i", { style: { color: "var(--main)" }, class: "fab fa-free-code-camp" }), " drum")), /*#__PURE__*/

      React.createElement("h2", { class: "nomargin inblock title",
        style: { margin: "auto 0px auto 5px" } }, "machine"), /*#__PURE__*/


      React.createElement("div", { style: { paddingTop: "15px" } }, /*#__PURE__*/
      React.createElement("strong", null, "last played")), /*#__PURE__*/

      React.createElement("h3", { id: "display" }, /*#__PURE__*/
      React.createElement("strong", null, this.state.last || "none")), /*#__PURE__*/

      React.createElement("div", { className: "vpadding" }, /*#__PURE__*/
      React.createElement(Controls, {
        changeActive: this.enableDial,
        active: this.state.active,
        set: this.state.set,
        changeSet: this.changeSet,
        mute: this.state.mute,
        changeMute: this.changeMute })), /*#__PURE__*/

      React.createElement("div", null, /*#__PURE__*/
      React.createElement(Volume, {
        volume: this.state.volume,
        change: this.changeVol,
        clickIn: this.volIn,
        mute: this.state.mute }))))));





  }}
;

ReactDOM.render( /*#__PURE__*/
React.createElement(DrumMachine, null),
document.getElementById('drum-machine'));