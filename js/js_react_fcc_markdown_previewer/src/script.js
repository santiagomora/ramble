// all possible regex available to mark
// down and its corresponding callbacks 
// to manage actions on match
const markdown = {
	"<(u|o)l>.*<\\/\\1l>": 
		( str,mtc,tag= mtc.match(/<(u|o)l>/)[0].replace("<","").replace(">","") ) => {
			const otg = `<${tag}>`,
					ctg = `</${tag}>`,
					sib = checksibl( mtc,otg,ctg );
			mtc = ( typeof sib === "string" ) ? sib : mtc;
			return maketag( 
				str,
				mtc,
				mtc.replace( otg,"" ).replace( new RegExp( `${ctg}$` ),"" ),
				tag, 
				{}
			)
		},
	"^#+.+": 
		( str,mtc ) => maketag( 
			str,
			mtc,
			mtc.replace(/^#*/,""),
			`h${str.match( /^#*/ )[0].length}`,
			{} 
		),
	"(\\*\\*).+?\\1": 
		( str,mtc ) => maketag( 
			str,
			mtc,
			mtc.replace(/(^\*\*|\*\*$)/g,""),
			"strong",
			{} 
		),
	"(_).+?\\1": 
		( str,mtc ) => maketag( 
			str,
			mtc,
			mtc.replace(/(^_|_$)/g,""),
			"i",
			{} 
		),
	"(~~).+?\\1": 
		( str,mtc ) => maketag( 
			str,
			mtc,
			mtc.replace(/(^~~|~~$)/g,""),
			"span",
			{class:"crossed"} 
		),
	"^>.+":
		( str,mtc ) => maketag( 
			str,
			mtc,
			mtc.replace(/^>/g,""),
			"span",
			{class:"vmargin quoteblock"} 
		),
	"(```).+\\1":
		( str,mtc ) => maketag( 
			str,
			mtc,
			mtc.replace( new RegExp( "<br>","g" ),"\n" ).replace( /^```|```$/g,"" ),
			"span",
			{class:"vmargin codeblock block",id:"code"} 
		),
	"(`).+?\\1":
		( str,mtc ) => maketag( 
			str,
			mtc,
			mtc.replace(/(^`|`$)/g,""),
			"span",
			{class:"codeblock"} 
		),
	"(<(?!br|\\/|ul|ol).+?>).*?\\1":
		( str,mtc,tag = mtc.match(/<.+?>/)[0].replace(/^<|>$/g,"") ) => maketag( 
			str,
			mtc,
			mtc.replace( `<${tag}>`,"" ).replace( `<${tag}>`,"" ),
			tag,
			tag === "table" ? { 
				border: "solid 1px #f5f5f5",
				class:"vmargin"
			} : {}
		),
	"\\[.+\\][\\ |\\t]*\\(.+\\)": 
		( str,mtc ) => maketag( 
			str,
			mtc,
			str.match(/\[.+\]/g)[0].replace(/(^\[|\]$)/g,""),
			"a",
			{href:str.match(/\(.+\)/g)[0].replace(/(^\(|\)$)/g,""),target:"_blank"}
		),
	"!\\[.+\\][\\ |\\t]*\\(.+\\)": 
		( str,mtc ) => maketag( 
			str,
			mtc,
			mtc,
			"img",
			{id:"img",src:str.match(/\(.+\)/g)[0].replace(/(^\(|\)$)/g,"")}
		),
	"<br>": 
		( str,mtc ) => maketag( 
			str,
			mtc,
			"",
			"div",
			{}
		),
};

// regex to match backtick multi-code, ul and ol:
// multiple line matches, and some additional inf
// ormation
const multi = [
	{
		r:/^\ *```\ *$/
	},
	{
		r:/.*\|.*/,
		op:"<table>",
		en:"<table>",
		t:{
			c:"<tr>",
			n:"<td>"
		}
	},
	{
		r:/^\ *\-.*/,
		op:"<ul>",
		en:"</ul>",
		t:{
			e:/-\ */, 
			c:"<li>"
		}
	},
	{
		r:/^\ *\d+\..*/,
		op:"<ol>",
		en:"</ol>",
		t:{
			e:/\d+\.\ */,  
			c:"<li>"
		}
	}
];


/* 
 * Markdown callback
 * builds object used by tree
 * */
function maketag( str,mtc,cont,tag,props ) {
	return {
		ind:str.indexOf(mtc),
		tag:tag,
		props:props,
		cont:cont,
		str:str.replace(mtc,cont)
	};
} 

function process( str,mtc ){
	let ctr = ( str.match( /<(u|o)l>/g )||[] ).length,
		 res=str,
		 k, el;
	if ( ctr>0 ){
		k = mtc.indexOf( str )+str.length;
		while ( ctr>1 && k<mtc.length ){
			if ( mtc.slice( k,k+4 ).match( /<(u|o)l>/ ) ){
				res=res.concat( mtc.slice( k,k+4 ) );
				k=k+4;
				ctr++;
			} else if ( mtc.slice( k,k+5 ).match( /<\/(u|o)l>/ ) ){
				res=res.concat( mtc.slice( k,k+5 ) );
				k=k+5;
				ctr--;
			} else res += mtc[k++];
		}
		return res;
	}
	return mtc;
}

function checksibl( mtc ){
	let el;
	const sib = mtc.match( /<(u|o)l>.*?(<\/\1l>)/g );
	if ( sib )
		return process( sib[0],mtc );
	return -1
}

/* 
 * Tree building functions
 * */
// tests strings entered into editor against 
// regular expresions in the markdown object
function teststr( str ) {
	let match,
		 m,
		 comp;
	const marks = Object.keys( markdown ),
			matches = [];
	for ( let i=0; i < marks.length; i++ ){
		m = marks[i];
		match = str.match( new RegExp( m,"gi" ) );
		if ( match ){ 
			comp = markdown[m]( str,match[0] );
			matches.push( comp );
		}
	}
	return matches;
}

// gets first element matched from 
// markdown ( first to appear )
function getmin( arr ){
	return arr.reduce( 
		( x,e,i ) => ( e.ind < x.i )
			? {
				i:e.ind,
				pos:i
			}
			: x
	,{
		i:arr[0].ind,
		pos:0
	});
}

// exceptional cases for tree build
function manageexcp( str,props ) {
	if ( props.id === "code" )
		return str
	else if ( props.id === "img" )
		return null
	else return buildtree(str);
}

// recursion to read string pieces
// and create react elements at once
function buildtree ( str ) {
	let min,
		 matches,
		 len,
		 ini;
	if ( str.length>0 ) {
		matches = teststr( str );
		if ( matches.length > 0 ) {
			min = matches[getmin( matches ).pos];
			len = min.cont.length;
			ini = min.ind;
			return [
				buildtree( min.str.slice( 0,ini ) ),
				React.createElement(
					min.tag,
					min.props || {},
					manageexcp( min.str.slice( ini,ini+len ),min.props )
				),
				buildtree( min.str.slice( ini+len,min.str.length ) )
			];
		}	
		return React.createElement("span",{class:"mmar"},str);	
	}  
	return "";
}

// main function that gets called from React component
// to implement tree build
function parsetext( target ) {
	return target.map(
		( e,i ) => 
			React.createElement(
				"div",
				{},
				buildtree( e )
			)
	);
}
/* 
 * Preformatting functions
 * */
// checks for multiline matches
// available in multi regex array
function checkmulti( str ) {
	let i = 0,
		 reg;
	for ( i = 0; i < multi.length; i++ ) {
		reg = multi[i].r;
		if ( str.match( reg ) )
			return i;
	}
	return -1;
}

/*
 * Preformatting the lists before passing to
 * regex callback
 * */
// used when a list is matched, applies corres
// ponding tags according to backspaces in the
// beginning of the array 
function nest( {el,lv},tg ) {
	return ( lv>0 )
		? nest( { el:tg.op+el+tg.en, lv:lv-1 },tg )
		: el;
}

// calculates where to insert the next li item
// inside the list tree
function insertpoint( lv,tree,dif,tlv ) {
	return [ 
		( dif<0 )
			? tree.length-5*( tlv+dif )
			: tree.length-5*( tlv ),
		lv 
	];
}

// inserts ul nested or single li into list
// tree
function findnode ( des,el,ip ) {
	return des.slice( 0,ip ) + el + des.slice( ip );
}

// main nested list building function
// relies on nest, insertpoint and fi
// ndnode functions to build nested u
// l or li accumulator string
function listtree( elems,tg ) {
	let tlv=elems[0].lv;
	const res = elems.reduce(
		( x,e,i,ar ) => {
			const li = tg.t.c + e.el + tg.t.c;
			let ip=0,dif = e.lv-tlv;
			if ( i>0 ) {
				e.el = nest( { el:li, lv:dif },tg );
				[ip,tlv] = insertpoint( e.lv,x,dif,tlv );
				return findnode( x,e.el,ip );
			}
			return nest( { el:li, lv:e.lv },tg );
		},""
	);
	return res;
}

// preformats read line to determine 
// each child level according to the
// whitespaces before every #. or - 
// list indicator
function readlevels( strpc,tg ) {
	const map = strpc.map(
		elem => {
			const lv = ( elem.match( /^\ */ ) || [] )[0] || "" ;
			return ({
				lv:lv.length,
				el:elem
			})
		}
	);
	return listtree( map,tg );
}

// removes existing tags, used when 
// user writes down string
function prelist( str,tg ) {
	const res = str
		.replace( new RegExp( tg.op,"g" ),"" )
		.replace( new RegExp( tg.en,"g" ),"" )
		.split( tg.t.c )
		.filter( x=>x );
	return res;
}

// calls readlevels and prelist, returns
// built nested list string 
function solvenest( str,tg ) {
	const pre = prelist( str,tg );
	return readlevels( pre,tg );
}

// adds li tags when reading each line i
// dentified as a list element
function listformat( lis,tag ) {
	return tag.c+lis.replace( tag.e,"" )+tag.c;
}

// adds table tags when reading each line i
// dentified as a table element
function tableformat( el,tag ) {
	const res =  el.split( "|" )
		.map( x => tag.n + x + tag.n )
		.join( "" );
	return tag.c + res + tag.c;
}

// helps to discern if multi-line
// read element is list or table
function applytag( res,tg ){
	return tg.n 
		? tableformat( res,tg )
		: listformat( res,tg )
}

// finds ul, ol and table elements
// as they dont require closing el
// ement inside editor
function findsin( arr,res,reg,ind ) {
	let i = ind,
		 re = res.length - 1;
	res[re] = applytag( res[re],reg.t );
	for ( i = ind+1; i < arr.length; i++ ) {
		if ( arr[i].match( reg.r ) ) {
			res[re] = res[re].concat( applytag( arr[i],reg.t ) );
			if ( !reg.t.n ) {
				res[re] = solvenest( res[re],reg )				
			}
		} else break;
	}
	res[re] = reg.op + res[re] + reg.en;
	return [res,re,i-1];
}

// finds multi line code  element
// as it requires ending tag in e
// ditor
function findmul( arr,res,reg,ind ) {
	let i,
		 re=res.length-1;
	for ( i = ind+1; i < arr.length; i++ ){
		res[re] = res[re].concat( `${arr[i]}<br>` );
		if ( arr[i].match( reg ) )
			return [res,re,i];
	}
	return [res,re,i];
}

// applies pre-formatting for 
// each line read from editor
// gets called inside react c
// omponent
function preformat( usarr ){
	let el, 
		 check, 
		 res=[], 
		 read = 0;
	for ( let k = 0; k < usarr.length; k++ ) {
		el = usarr[k];
		check = checkmulti( el );
		res.push( el );
		if ( check > 0 )
			[res,read,k] = findsin( usarr,res,multi[check],k );
		else if ( check === 0 )
			[res,read,k] = findmul( usarr,res,multi[0].r,k );
	}
	return res;
}

const placeholder = 
`# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`

// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}

\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and

> Block Quotes!

And if you want to get really crazy, even tables:

**Wild Header** | **Crazy Header** | **Another Header?**
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`

class MarkdownPreview extends React.Component {
	constructor(){
		super();
		this.state={
			text:"",
			mark:[]
		};
		this.format = this.format.bind(this);
		this.clear = this.clear.bind(this);
		this.expand = this.expand.bind(this);	
	}
	
	format(e) {
		e.preventDefault();
		const value = e.currentTarget.value;
		this.setState({
			text:value,
			mark:parsetext( preformat( value.split( "\n" ) ) )
		});
	}
	
	clear (e) {
		e.preventDefault();
		this.setState({
			text:"",
			mark:""
		})
	}
	
	expand(e) {
		e.preventDefault();
		const id = e.currentTarget.id;
		this.setState({
			expand:this.state.expand === id ? "" : id
		});
	}
	
	componentDidMount(){
		this.setState({
			text: placeholder,
			mark: parsetext( preformat( placeholder.split( '\n' ) ) )
		})
	}
	
	render(){
		const state = this.state;
		return (
			<div className="container-fluid">
				<div className="row">
					<div style={{paddingLeft:"0px"}}className={
							state.expand==="ed" 
								? "col-md-8 mbottom" 
								: state.expand==="pv" 
									? "col-md-4 mbottom" 
							: "col-md-5 mbottom"}>
						<p>
							Enter the text you wish to markdown in the editor.
						</p>
						<div className="textarea" style={{paddingTop:"1px"}}>
							<div className="smpadding smargin sub">
								<div className="inblock spadding" style={{width:"70%"}}>
									<strong>Editor</strong>
								</div>
								<div className="inblock text-right" style={{width:"30%"}}>
									<button className="noborder transparent smpadding nomargin sfont" id="ed" onClick={this.expand}>
										<p className="buttontext nopadding nomargin sfont">
											<i className={
													state.expand ==="ed" 
														? "fas fa-compress-arrows-alt"
														: "fas fa-expand-arrows-alt"
												}></i>
										</p>
									</button>
								</div>
							</div>
							<textarea id="editor" className="textarea mpadding" rows="12" onChange={this.format} value={state.text}/>
						</div>
					</div>
					<div className={
							state.expand==="pv" 
								? "col-md-8" 
								: state.expand==="ed" 
									? "col-md-4" 
							: "col-md-7"} style={{overflowY:"auto"}}>
						<div className="sub smpadding">
							<div className="mid inblock">
								<p className="nomargin"><strong>Preview</strong></p>
							</div>
							<div className="inblock mid text-right">
								<button className="noborder transparent smpadding nomargin sfont" id="pv" onClick={this.expand}>
									<p className="buttontext nopadding nomargin sfont">
										<i className={
													state.expand ==="pv" 
														? "fas fa-compress-arrows-alt"
														: "fas fa-expand-arrows-alt"
												}></i>
									</p>
								</button>
							</div>
						</div>
						<div id="preview" className="mpadding limitheight">{state.mark}</div>
					</div>
				</div>
				<div className="row justify-content-end stpadding">
					<button className="transparent smpadding nomargin" style={{verticalAlign:"middle"}}>
						<p className="buttontext nopadding nomargin" onClick={this.clear}>
							clear text box
						</p>
					</button>
				</div>
			</div>
		);
	}
}


ReactDOM.render(
	<MarkdownPreview/>,
	document.getElementById("markdown-preview")
);