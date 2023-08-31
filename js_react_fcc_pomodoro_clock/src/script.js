const maxSess = 59;

function convertTime( time ){
	return [parseInt( time/60 ),time%60];
}

function TimeConf( props ){
	let [min,sec] = convertTime( props.time );
	const minRef = React.useRef( null ),
			secRef = React.useRef( null );;
	min = min<9 ? "0"+min : min;
	sec = sec<9 ? "0"+sec : sec;
	return (
		<>
			<button 
				disable={props.pause}
				type={props.type}
				onClick={props.changeClick}
				className="transparent noborder gray noout"
				id={`${props.type}-decrement`}>
				<i className="fas fa-arrow-down"></i>
			</button>
			<input 
				className="text-center noborder setbox lfont noout"
				placeholder="minutes"
				readOnly={!props.pause}
				type="number" 
				name="min"
				min={0}
				max={maxSess}
				ref={minRef}
				onChange={
					e => {
						const val = parseInt( minRef.current.value||0 );
						if ( val<=maxSess ){
							props.setTime(
								parseInt( e.currentTarget.value || 0 ),
								parseInt( secRef.current.value || 0 ),
								props.type
							);
							minRef.current.value = val<=9 ? "0"+val : val; 
						}
					}
				}
				value={min}/>
			<h2 className="inblock nomargin lgray" style={{paddingRight:"23px",width:"10px"}}>
				:
			</h2>
			<button 
				disable={props.pause}
				type={props.type}
				onClick={props.changeClick}
				className="transparent noborder gray noout"
				id={`${props.type}-increment`}>
				<i className="fas fa-arrow-up"></i>
			</button>
			<input 
				className="text-center lfont noborder setbox noout"
				placeholder="seconds"
				readOnly={!props.pause}
				type="number"
				min={0}
				max={59}
				name="sec"
				id={`${props.type}-length`}
				ref={secRef}
				onChange={
					e => {
						const val = parseInt( secRef.current.value||0 );
						if (val < 60) {
							props.setTime(
								parseInt( minRef.current.value||0 ),
								parseInt( e.currentTarget.value||0 ),
								props.type
							)
							secRef.current.value = val<=9 ? "0"+val : val;
						}
					}
				}
				value={sec}/>
			<strong style={{
					verticalAlign: "text-bottom",
				}} id={`${props.type}-label`}>
				{props.type}
			</strong>
		</>
	)
}

function Controls( props ){
	return(
		 <>
			<button
				className="padding transparent noborder xlfont stpadding gray noout"
				disabled={!props.pause||props.time===0}
				style={{paddingRight:"35px"}}
				onClick={props.start}>
				<div>
					<i className="fas fa-play"></i>
				</div>
				<div className="sfont" id="start_stop">start</div>
			</button>
			<button 
				className="cbutton transparent noborder xlfont stpadding gray noout"
				disabled={props.pause}
				onClick={props.pauseClick}>
				<div>
					<i className="fas fa-pause"></i>
				</div>
				<div className="sfont">pause</div>
			</button>
			<button 
				className="padding transparent noborder xlfont stpadding gray noout"
				disabled={props.past===0}
				style={{paddingLeft:"35px"}}
				id="reset"
				onClick={props.reset}>
				<div>
					<i className="fas fa-history"></i>
				</div>
				<div className="sfont">reset</div>
			</button>
		 </>
	);
}

function Title( props ){
	return (
		<>
			<h3 className="text-center nomargin">
				<strong>
					<i style={{color:"var(--main)"}} class="fab fa-free-code-camp"></i>
				</strong>
			</h3>
			<h1 className="title nomargin" 
				style={{color:"var(--main)"}}>
				<strong>
					pomodoro
				</strong>
			</h1>
			<h2 className="nomargin" >
				clock
			</h2>
		</>
	);
}

class PomodoroClock extends React.Component {
	constructor(){
		super();
		this.state = {
			on:false,
			past:0,
			pause:true,
			break:5,
			session:45,
			isTime:true
		};
		this.startClock = this.startClock.bind( this );
		this.activateClock = this.activateClock.bind( this );
		this.pauseClock = this.pauseClock.bind( this );
		this.setTime = this.setTime.bind( this );
		this.resetClock = this.resetClock.bind( this );
		this.changeClick = this.changeClick.bind( this );
	}		
	
	activateClock( past,time ){
		if ( past<=time )
			setTimeout( 
				() => { 
					if ( !this.state.pause )
						this.setState( 
							{past:past+1},
							() => this.activateClock( past+1,time ) 
						);
				},1000				
			) 
		else
			this.setState(
				{
					isTime:!this.state.isTime,
					past:0
				},
				() => this.activateClock(
					0,
					this.state.isTime 
						? this.state.session
						: this.state.break
				)
			)
	}
	
	setTime( min,sec,type ){
		const st = this.state;
		st[type] = 60*min+sec;
		st.past=0;
		if ( this.state.pause )
			this.setState(st);
	}
	
	startClock( e ){
		e.preventDefault(); 
		const st = this.state;
		this.setState(
			{pause:false},
			() => 
				this.activateClock( 
					st.past,
					st.isTime 
						? st.session 
						: st.break 
				)
		);
	}
	
	changeClick( e ){
		e.preventDefault();
		const type = e.currentTarget.getAttribute('type'),
				id = e.currentTarget.id,
				st = this.state;
		if ( this.state.pause ){
			st[type] = id.match( 'increment' ) 
				? st[type]+1
				: st[type]-1;
			if ( st[type]>=0 )
				this.setState( st )
		}
	}
	
	pauseClock( e ){
		e.preventDefault();
		this.setState({pause:true})
	}
	
	resetClock( e ){
		e.preventDefault();
		this.setState({
			pause:true,
			past:0
		});
	}
	
	render() {	
		const st = this.state,
				time = st.isTime 
					? st.session 
					: st.break,
				[pmin,psec] = convertTime( time-st.past );
		return (
			<div className="col-md-12 col-lg-8 col-xl-8 col-sm-10 col-xs-12 container-fluid" style={{paddingTop:"30px"}}>
				<div className="padding">
					<div className="row justify-content-center padding">
						<div className="col-md-6 text-center">
							<Title />
						</div>
					</div>
					<div className="row justify-content-center">
						<div className="col-md-4 text-center">
							<div id="time-left" style={{marginTop:"-20px"}}>
								<div className="xxlfont inblock">
									{pmin<10 ? "0"+pmin : pmin}
								</div>
								<div className="xxxlfont inblock">
									<span className="lgray">:</span>
									<strong>{psec<10 ? "0"+psec : psec}</strong>
								</div>
							</div>
							<div className="text-center" style={{marginTop:"-20px"}}>
								<strong id="timer-label">
									{st.isTime ? "session" : "break"}
								</strong>
							</div>
						</div>
						<div className="col-md-4 text-left">
							<div>
								<TimeConf
									changeClick={this.changeClick}
									type="session"
									time={st.session} 
									pause={st.pause}
									setTime={this.setTime}/>
							</div>
							<div>
								<TimeConf 
									changeClick={this.changeClick}
									type="break"
									time={st.break} 
									pause={st.pause}
									setTime={this.setTime}/>
								<div className="inblock margin">
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="padding col-md-12 text-center">
							<Controls
								past={st.past}
								pause={st.pause}
								time={st.time}
								start={this.startClock}
								pauseClick={this.pauseClock}
								reset={this.resetClock}/>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

ReactDOM.render(
  <PomodoroClock/>,
  document.getElementById('drum-machine')
);