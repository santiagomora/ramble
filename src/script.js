const sets = {
	'48':{
		key:'0',
		code:48,
		id:"zero",
		ref:React.createRef()
	},
	'49':{
		key:1,
		code:49,
		id:"one",
		ref:React.createRef()
	},
	'50':{
		key:2,
		code:50,
		id:"two",
		ref:React.createRef()
	},
	'51':{
		key:3,
		code:51,
		id:"three",
		ref:React.createRef()
	},
	'52':{
		key:4,
		code:52,
		id:"four",
		ref:React.createRef()
	},
	'53':{
		key:5,
		code:53,
		id:"five",
		ref:React.createRef()
	},
	'54':{
		key:6,
		code:54,
		id:"six",
		ref:React.createRef()
	},
	'55':{
		key:7,
		code:55,
		id:"seven",
		ref:React.createRef()
	},
	'56':{
		key:8,
		code:56,
		id:"eight",
		ref:React.createRef()
	},
	'57':{
		key:9,
		code:57,
		id:"nine",
		ref:React.createRef()
	},
	'42':{
		key:'✕',
		code:42,
		class:"operation",
		id:"multiply",
		ref:React.createRef()
	},
	'45':{
		key:'-',
		code:45,
		class:"operation",
		id:"subtract",
		ref:React.createRef()
	},
	'43':{
		key:'+',
		code:43,
		id:"add",
		class:"operation",
		ref:React.createRef()
	},
	'46':{
		key:'.',
		code:46,
		id:"decimal",
		ref:React.createRef()
	},
	'47':{
		key:'÷',
		code:47,
		class:"operation",
		id:"divide",
		ref:React.createRef()
	},
	'80':{
		key:'^',
		code:80,
		class:"smaller operation",
		ref:React.createRef()
	},
	'40':{
		key:'(',
		code:40,
		class:"smaller operation",
		ref:React.createRef()
	},
	'41':{
		key:')',
		code:41,
		class:"smaller operation",
		ref:React.createRef()
	},
	// special operations
	'69':{
		key:'E',
		code:69,
		class:"smaller operation",
		ref:React.createRef()
	},
	'112':{
		key:'π',
		code:112,
		class:"smaller operation",
		ref:React.createRef()
	},
	'101':{
		key:'e',
		code:101,
		class:"smaller operation",
		ref:React.createRef()
	},
	'33':{
		key:'!',
		code:33,
		class:"smaller operation",
		ref:React.createRef()
	},
	'114':{
		key:'√',
		code:114,
		class:"smaller operation",
		ref:React.createRef()
	}, 
	'108':{
		key:'log',
		code:108,
		class:"smaller operation",
		ref:React.createRef()
	}, 
	'76':{
		key:'ln',
		code:76,
		class:"smaller operation",
		ref:React.createRef()
	}, 
	'115':{
		key:'sin',
		code:115,
		class:"smaller operation",
		ref:React.createRef()
	}, 
	'99':{
		key:'cos',
		code:99,
		class:"smaller operation",
		ref:React.createRef()
	}, 
	'116':{
		key:'tan',
		code:116,
		class:"smaller operation",
		ref:React.createRef()
	}, 
	'83':{
		key:'asin',
		code:83,
		class:"smaller operation",
		ref:React.createRef()
	}, 
	'67':{
		key:'acos',
		code:67,
		class:"smaller operation",
		ref:React.createRef()
	}, 
	'84':{
		key:'atan',
		code:84,
		class:"smaller operation",
		ref:React.createRef()
	}, 
	'97':{
		key:'ans',
		code:97,
		class:"operation",
		ref:React.createRef()
	}, 
	'37':{
		key:'%',
		code:37,
		class:"smaller operation",
		ref:React.createRef()
	}
};

const control = {
	'8':{
		key:'C',
		class:"smaller clear",
		code:8,
		ref:React.createRef(),
		call:function( st ){
			const state=st.state,
					last = state.last.pop();
			state.op = state.op.slice( 0,state.op.length-last );
			if ( state.op.length===0 )
				state.first=true;
			st.setState(state);
		}
	},
	'13':{
		key:'=',
		code:13,
		class:"equal",
		id:"equals",
		ref:React.createRef(),
		call:function( st ){
			st.loadEquation();
		}
	},
	'32':{
		key:'AC',
		code:32,
		class:"clear",
		id:"clear",
		ref:React.createRef(),
		call: function( st ){
			const state = st.state;
			state.op="";
			state.first=true;
			st.setState( state );
		}
	},
};

const firstOrder = {
	"π":
		( eq ) => {
			return Math.PI;
		},
	"e":
		( eq ) => {
			return Math.E;
		},
	"log(\\-|\\+)?\\d+\\.?\\d*": 
		( eq,a = eq.replace( "log","" ) ) => {
			return Math.log10( parseFloat( a ) );
		},
	"ln(\\-|\\+)?\\d+\\.?\\d*": 
		( eq,a = eq.replace( "ln","" ) ) => {
			return Math.log( parseFloat( a ) );
		},
	"asin(\\-|\\+)?\\d+\\.?\\d*": 
		( eq,a = eq.replace( "asin","" ) ) => {
			let res = Math.asin( parseFloat( a ) );
			if ( !radians )
				res = res * ( 180 / Math.PI );	
			return res;
		},
	"acos(\\-|\\+)?\\d+\\.?\\d*": 
		( eq,a = eq.replace( "acos","" ) ) => {
			let res = Math.acos( parseFloat( a ) );
			if ( !radians )
				res = res * ( 180 / Math.PI );	
			return res;
		},
	"atan(\\-|\\+)?\\d+\\.?\\d*": 
		( eq,a = eq.replace( "atan","" ) ) => {
			let res = Math.atan( parseFloat( a ) );
			if ( !radians )
				res = res * ( 180 / Math.PI );	
			return res;
		},
	"sin(\\-|\\+)?\\d+\\.?\\d*": 
		( eq,a = eq.replace( "sin","" ) ) => {
			let n = parseFloat( a );
			if ( !radians )
				n = n * ( Math.PI / 180 );
			return Math.sin( n );
		},
	"cos(\\-|\\+)?\\d+\\.?\\d*": 
		( eq,a = eq.replace( "cos","" ) ) => {
			let n = parseFloat( a );
			if ( !radians )
				n = n * ( Math.PI / 180 );
			return Math.cos( n );
		},
	"tan(\\-|\\+)?\\d+\\.?\\d*": 
		( eq,a = eq.replace( "tan","" ) ) => {
			let n = parseFloat( a );
			if ( !radians )
				n = n * ( Math.PI / 180 );
			return Math.tan( n );
		},
	"\\d+\\.?\\d*\\^(\\-|\\+)?\\d+\\.?\\d*": 
		( eq,[a,b] = eq.split("^") ) => {
			return Math.pow( parseFloat( a ),parseFloat( b ) )+'';
		},
	"√\\d+\\.?\\d*":  
		( eq,[b,a] = eq.split("√") ) => {
			return Math.sqrt( parseFloat( a ) )+'';
	},
	"\\d+\\.?\\d*%":  
		( eq,[a] = eq.split("%") ) => {
			return parseFloat( a )*0.01+'';
		},
	"\\d+\\.?\\d*E(\\-|\\+)?\\d+\\.?\\d*":  
		( eq,[a,b] = eq.split("E") ) => {
			return parseFloat( a )*Math.pow( 10,parseFloat( b ) ); 
		},
	"\\d+\\.?\\d*\\!": 
		( eq,[a] = eq.split("!") ) => {
			return factorial( parseFloat ( a ) )+'';
		},
};

const secondOrder = {
	"\\-?\\d+\\.?\\d*✕(\\-|\\+)?\\d+\\.?\\d*":
		( eq,[a,b] = eq.split("✕") ) => {
			return parseFloat( a )*parseFloat( b )+'';
		},
	"\\-?\\d+\\.?\\d*÷(\\-|\\+)?\\d+\\.?\\d*":
		( eq,[a,b] = eq.split("÷") ) => {
			return parseFloat( a )/parseFloat( b )+'';
		}
};

const thirdOrder = {
	"\\-?\\d+\\.?\\d*(\\+|\\-)+\\d+\\.?\\d*": 
		( eq,pos = eq.replace(/\-/g,'+-').split("+") ) => {
			return pos.reduce(
				(t,x) => x ? t+parseFloat( x ) : t,0
			);
		}
}

const errors = [
	{
		check: 
			( eq ) => ( eq.match( /\(/g )||[] ).length !== ( eq.match( /\)/g )||[] ).length,
		message:"missing parentheses"
	},
	{
		check: 
			( eq ) => eq.match( /(sin|cos|tan|asin|acos|atan|log|ln|√|✕|\-|÷|\+)$/ ),
		message:"missing operand"
	},
	{
		check: 
			( eq ) => eq.length===0,
		message:"no operation"
	}
];

const checkChar = {
	"(%|\\^|E|\\!)":
		( op,char,last,reg ) => {
			return (
				( 
					last.length>0 || last.match(/\)$/) 
				) 
				&& !last.match( reg ) 
				&& !last.match(/(sin|cos|tan|asin|acos|atan|log|ln|√)$/) 
					? op+char 
					: op
			)
		},
	"0":
		( op,char,last,reg ) => {
			return (
				last.length===0
				|| last.match(/(\(|\)|ans|sin|cos|tan|asin|acos|atan|log|ln|√)$/) 
					? op 
					: op+char
			)
		},
	"\\.":
		( op,char,last,reg ) => {
			return (
				last.match( reg )
				|| last.match(/(\)|ans|sin|cos|tan|asin|acos|atan|log|ln)$/) 
					? op 
					: ( last.length === 0 || last.match( /(\(|✕|\-|÷|\+|√)$/ ) ) 
						? op+'0'+char
						: op+char
			)
		},
	"(ans|sin|cos|tan|asin|acos|atan|log|ln|√)":
		( op,char,last ) => {
			return (
				last.length===0||last.match(/\($/) 
					? op+char 
					: op
			)
		},
	"[✕\\-÷\\+]$":
		( op,char,last ) =>{
			if ( char === '-' && last.match(/\($/) )
				return op+char;
			return (
				op.match( /[✕\-÷\+]$/ )
				|| last.match(/(\(|sin|cos|tan|asin|acos|atan|log|ln|√|\.)$/)
				|| op.length===0 
					? op 
					: op+char
			);
		},
	"\\(":
		( op,char,last ) => {
			return (
				last.length>0
				&& !last.match(/(sin|cos|tan|asin|acos|atan|log|ln|√)$/) 
					? op 
					: op+char
			)
		},
	"\\)":
		( op,char,last ) => {
			return ( 
				( 
					last.match( /(\d|e|π)/ ) 
					|| last.match( /\)/ ) 
				) && ( 
					( op.match( /\(/g )||[] ).length > ( op.match( /\)/g )||[] ).length  
				)
					? op+char 
					: op 
			)
		},
	"(e|π)":
		( op,char,last ) =>{
			return ( 
				last.match( /\)$/ ) 
				|| last.match( /(\d|e|π|ans|sin|cos|tan|asin|acos|atan|log|ln|√)$/) 
			) 
				? op
				: op+char;
		},
	"\\d":
		( op,char,last ) =>{
			return ( 
				last.match( /\)$/ ) 
				|| last.match( /(ans|e|π|ans|sin|cos|tan|asin|acos|atan|log|ln|√)$/ ) 
			) 
				? op
				: op+char 
		},
}

var radians = true;

function factorial ( a ) {
	if ( a>1 )
		return a*factorial( a-1 );
	return a;
}

function solveOcurrences( eq,reg,call ){
	return ( eq.match( reg ) ) 
		? solveOcurrences( eq.replace( reg, x => call( x ) ),reg,call )
		: eq;
}

function solveRoutine( set,eq ) {
	const ks = Object.keys( set );
	for ( let i=0;i<ks.length;i++ )
		eq = solveOcurrences( eq,new RegExp( ks[i],"g" ),set[ks[i]] );
	return eq;
}

function checkSign( eq ){
	return eq.replace(/(\+\-)|(\-\+)/,"-").replace("--","+");
}

function solveOperations( eq ){
		eq = solveRoutine( firstOrder,checkSign( eq ) );
		eq = solveRoutine( secondOrder,checkSign( eq ) );
		return solveRoutine( thirdOrder,checkSign( eq ) );
}

/*
 * Search for siblings in nested parentheses
 * used in markdown list callback
 * */
function process( str,mtc ){
	let ctr = ( str.match( /\(/g )||[] ).length,
		 res=str,
		 k, el;
	if ( ctr>0 ){
		k = mtc.indexOf( str )+str.length;
		while ( ctr>1 && k<mtc.length ){
			el = mtc[k++];
			res+=el;
			if ( el===')' )ctr--;
			else if ( el==='(' ) ctr++;
		}
		return res;
	}
	return str;
}

function checkSibl( mtc ){
	let el;
	const sib = mtc.match( /\(.*?\)/g );
	if (sib)
		return process( sib[0],mtc );
	return -1
}

function makePar( par ){
	const nes = checkSibl( par ),
			mtc = ( typeof nes === 'string' ) ? nes : par;
		return [mtc,resolveEquation( mtc.replace( /(^\(|\)$)/g,"" ) )]
}

// divides problem into subsets
// first resolve first priority operations * and / 
// parentheses will be solved calling this function for nested operations
// then resolve special operations
// lastly resolve adds and substractions
function resolveEquation( eq ){
	let mtc,ind,nes,con;
	const par = eq.match( /\(.*\)/g );
	if( par ){
		[mtc,con] = makePar( par[0] )
		eq = eq.replace( mtc,con );
		ind = eq.indexOf( con );
		return resolveEquation(
			eq.slice(0,ind)
			+ solveOperations( eq.slice( ind,ind+con.length ) )
			+ eq.slice( ind+con.length,eq.length )
		)
	}
	return solveOperations( eq );
}

function enable( e ){
	const el = e.currentTarget;
	const tar = ( el.classList.value.match(/(clear|equal|operation)/)||[] ) [0];
	const cl = tar ?  tar+"al" : "active";
	return el.classList.add( cl );
}

function disable( e ){
	const el = e.currentTarget;
	const cl = ( el.classList.value.match(/(clearal|equalal|operational)/)||[] ) [0] ||"active";
	return el.classList.remove( cl );
}

function clickListeners( arr ) {
	let el;
	for ( let i=0;i<arr.length;i++ ){
		el = arr[i];
		el.onmouseup = disable;
		el.onmousedown = enable;
	}
}

function controlChars( op,char ){
	const charr = op.split( /[✕\-÷\+]/ ),
			chk = Object.keys( checkChar );
	let reg;
	for( let k=0;k<chk.length;k++ ){
		reg = new RegExp( chk[k],"g" );
		if ( char.match( reg ) )
			return checkChar[ chk[k] ]( op,char,charr[charr.length-1],reg );
	}
	return op+char;
}

function createMouseEvent( elem,type ){
	let mouse = new MouseEvent( type );
	mouse.initEvent( type,true,true )
	elem.dispatchEvent( mouse );
}

function triggerKey( elem,code,type ) {
	const keyb = new KeyboardEvent( type,{
		keyCode:code,
		which:code,
		charCode:code,
		bubbles:true,
		cancelable:true
	});
	elem.dispatchEvent( keyb );
}

function checkEquation( eq ){
	const err = [];
	for ( let i = 0; i<errors.length; i++ )
		if ( errors[i].check( eq ) )
			err.push( errors[i].message )
	return err;
}

function dispatchClick( elem,isdown ) {
	if ( !isdown )
		createMouseEvent( elem,"mousedown" );
	setTimeout( () => createMouseEvent( elem,"mouseup" ), 100 )	
}

function performOperation( st ){
	const hist = st.history;
	if ( st.op.match("ans") )
		if ( hist.length>0 ){
			st.op = st.op.replace( /ans/g, hist[hist.length-1].re );
		} else {
			st.errors = ['invalid operation'];
			return st;
		}
	st.res =	resolveEquation( st.op );
	if ( !st.res.match('NaN') ){
		st.history.push({op:st.op,re:st.res});
		st.op = st.res;
		st.errors = [];
	} else 
		st.errors = ['invalid operation'];
	return st;
}

function Button( props ) {
	return (
		<>
			<button
				ref={props.num.ref}
				id={props.num.id ? props.num.id : ""}
				onMouseDown={
					e => {
						props.handler( e );
						dispatchClick( e.currentTarget,true );
					}
				}
				code={props.num.code}
				value={props.num.key}
				className={
					props.class 
						? `${props.class} dial inblock margin`
						: "dial inblock margin"
				}> 
				<strong>{props.num.key}</strong>
			</button>
		</>
	);
}

function Panel( props ){
	return (
		<div className="container-fluid">
			{
				props.elems.map(
					(e,i) => (
						<div className="row justify-content-between vmmargin">
						{
							e.map(
								r => {
									let set;
									if (r) {
										set = control[r] && !sets[r] 
											? control[r] 
											: sets[r];
										return (
											<Button 
												num={set} 
												class={set.class}
												handler={props.handler}/>			
										)
									}
									return <div className="noop"/>
								}
							)	
						}
						</div>
					)
				)
			}
		</div>
	)
}

function FullDial( props ) {
	const panel1 = [
			[43,42,47,45],
			[49,50,51,37],
			[52,53,54,97],
			[55,56,57,13],
			[46,48,null]
		],
		panel2 = [
			[69,114,40,41],
			[80,101,112,33],
			[116,115,99,76],
			[84,83,67,108],
			[null,8,32]
		];
	
	return (
		<>
			<div className="col-md-6 shpadding">
				<Panel elems={panel1} {...props}/>
			</div>
			<div className="col-md-6 shpadding">
				<Panel elems={panel2} {...props}/>
			</div>
		</>	
	)
}

function Title( props ){
	return (
		<div className="col-md-12 nopadding nomargin">	
			<h1 className="inblock title" 
				style={{margin:"auto 5px auto 0px",color:"var(--main)"}}>
				<strong> <i style={{color:"var(--main)"}} class="fab fa-free-code-camp"></i> javaScript</strong>
			</h1>
			<h2 class="nomargin inblock title" 
				style={{
					margin:"auto 0px auto 5px",
						fontWeight:"lighter"
				}}>
				calculator
			</h2>
		</div>
	);
}

function History( props ){
	const history = props.content;
	return (
		<ul className="history darkgray absolute sfont" style={{zIndex:40}}>
			{
				history.length>0
				?
					history.map(
						( e,i ) => {
							return (
								<li style={{padding:"5px"}}>
									<button 
										onClick={props.seeOperation} 
										index={i}
										type='operation'
										className="hitem transparent">
										{ e.op }
									</button> 
									<span 
										className="inblock" 
										style={{color:"#f5f5f5"}}>
										=
									</span>
									<button 
										onClick={props.seeOperation} 
										index={i}
										type='result'
										className="hitem transparent">
										{ e.re }
									</button>
								</li>
							)
						}
					)
				:
					<li>no previous operations</li>
			}
		</ul>
	)
}


function DisplayErrors( props ) {
	return (
		<ul className="nomargin nopadding " style={{color:"red"}}>
			{
				props.err.map(
					(e,i) => (
						<>
							<li className="linemid hmargin error inblock sfont">
								{e}
							</li>
							<span>
								{(i !== props.err.length-1) ? '|' : ''}
							</span>
						</>
					)
				)	
			}
		</ul>
	)
}

function Input( props ) {
	const button = "sfont noborder transparent linemid gray",
			[showHis,changeShow] = React.useState( false ),
			history = props.history,
			prev = ( history[history.length-1]||{} ).op; 
	return(
		<div className="result" style={{overflow:"visible"}}>
			<div className="calc gray mfont">
				<div className="mid inblock text-left" style={{verticalAlign:"top"}}>
					<div className="linemid inblock relative">
						<button 
							className={
								showHis 
									? `${button} selected darkgray` 
									: button
							}
							onClick={ 
								e => {
									e.preventDefault();
									changeShow(!showHis);
								}
							}>
							History
						</button>
						{
							showHis 
								? <History 
									  seeOperation={props.seeOperation}
									  content={history}/>
								: ""
						}
					</div>
					<span className="linemid">|</span>
					<button 
						className={props.radians ? button+" selected" : button}
						onClick={props.changeMode}>
						Radians
					</button>
					<span className="linemid">|</span>
					<button 
						className={props.radians ? button : button+" selected"}
						onClick={props.changeMode}>
						Degrees
					</button>
				</div>
				<div className="mid inblock" style={{overflow:"hidden"}}>
					{ 
						prev 
							? `ans = ${prev}`
							:"no previous operations" 
					}
				</div>
			</div>
			<div 
				style={{
					marginTop:"-11px",
						overflow:"auto"
				}}>
				<input
					readOnly
					ref={props.input}
					value={!props.first ? props.op : "0"}
					onKeyPress={props.keypress}
					onKeyDown={props.keydown}
					id="display"
					className="text-right calc xlfont current noborder transparent"
					type="text"/>
				<div>
					{
						props.errors.length>0
							? <DisplayErrors err={props.errors}/>
							: ""
					}
				</div>
			</div>	
		</div>
	);
}  

class Calculator extends React.Component {
	constructor(){
		super();		
		this.state={
			op:"",
			last:[],
			res:"",
			first:true,
			history:[],
			radians:radians,
			errors:[]
		}
		this.inputHandler = this.inputHandler.bind( this );
		this.clickHandler = this.clickHandler.bind( this );
		this.controlHandler = this.controlHandler.bind( this );
		this.changeMode = this.changeMode.bind( this );
		this.loadEquation = this.loadEquation.bind( this );
		this.seeOperation = this.seeOperation.bind( this );
		this.input = React.createRef();
	}
	
	seeOperation( e ){
		e.preventDefault();
		const hist = this.state.history,
				el = e.currentTarget,
				ind = parseInt( el.getAttribute( 'index' ) ),
				type = el.getAttribute( 'type' )==='operation'
					? 'op'
					: 're';
		this.setState({
			history:hist,
			op:hist[ind][type]
		});
	}
	
	loadEquation(){
		let st = this.state;
		const errors = checkEquation( st.op );
		if ( errors.length>0 ){
			this.setState({errors})
		} else {
			st = performOperation( st );
			this.setState(st);
		}
	}
	
	inputHandler( e ){
		const key = e.which,
				set = sets[ key ],
				st = this.state,
				el = e.currentTarget,
				len = st.op.length;
		let keycp;
		if ( set ){
			if ( st.first&&set.code!==48 ){
				st.op = "";
				st.first=false;
			}
			keycp = set.key+'';
			if ( !el.fromclick ) {
				dispatchClick( set.ref.current,false );
				el.fromclick=false;		
			} else {
				st.op = controlChars( this.state.op,keycp );
				if ( len<st.op.length )
					st.last.push( st.op.length-len );
				this.setState( st );
			}
		}
	}
	
	controlHandler( e ) {
		const ctl = control[e.keyCode],
				input = this.input.current;
		if ( ctl ){
			if ( !input.fromclick ){
				dispatchClick( ctl.ref.current,false );
				input.fromclick = false;
			} else 
				ctl.call( this );
		}
	}
	
	clickHandler( e ){
		e.preventDefault();
		const el = e.currentTarget,
				code = el.getAttribute("code"),
				input = this.input.current;
		input.fromclick = true;
		if ( control[code] )
			triggerKey( input,code,"keydown" )
		else
			triggerKey( input,code,"keypress" );
	}
	
	changeMode( e ){
		e.preventDefault();
		radians = !this.state.radians;
		this.setState({radians})
	}
	
	componentDidMount(){
		this.input.current.focus();
		clickListeners( document.getElementsByClassName( "dial" ) );
	}
	
	render() {
		return (
			<div className="row justify-content-center ">
				<div className="col-md-10 col-lg-8 col-xl-6 col-sm-10 col-xs-12">
					<Title />
					<div className="calculator row">
						<div className="container-fluid calculator col-md-12" style={{padding:"5px"}}>
							<div className="row">
								<Input
									radians={this.state.radians}
									changeMode={this.changeMode}
									history={this.state.history}
									seeOperation={this.seeOperation}
									input={this.input}
									op={this.state.op}
									errors={this.state.errors}
									keypress={this.inputHandler}
									keydown={this.controlHandler}
									first={this.state.first}/>
							</div>
							<div className="row vmargin justify-content-end">
								<FullDial handler={this.clickHandler}/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

ReactDOM.render(
  <Calculator/>,
  document.getElementById('calculator')
);