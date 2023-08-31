const COLOR_SCHEME = [
["#23171b","#271a28","#2b1c33","#2f1e3f","#32204a","#362354","#39255f","#3b2768","#3e2a72","#402c7b","#422f83","#44318b","#453493","#46369b","#4839a2","#493ca8","#493eaf","#4a41b5","#4a44bb","#4b46c0","#4b49c5","#4b4cca","#4b4ecf","#4b51d3","#4a54d7","#4a56db","#4959de","#495ce2","#485fe5","#4761e7","#4664ea","#4567ec","#446aee","#446df0","#426ff2","#4172f3","#4075f5","#3f78f6","#3e7af7","#3d7df7","#3c80f8","#3a83f9","#3985f9","#3888f9","#378bf9","#368df9","#3590f8","#3393f8","#3295f7","#3198f7","#309bf6","#2f9df5","#2ea0f4","#2da2f3","#2ca5f1","#2ba7f0","#2aaaef","#2aaced","#29afec","#28b1ea","#28b4e8","#27b6e6","#27b8e5","#26bbe3","#26bde1","#26bfdf","#25c1dc","#25c3da","#25c6d8","#25c8d6","#25cad3","#25ccd1","#25cecf","#26d0cc","#26d2ca","#26d4c8","#27d6c5","#27d8c3","#28d9c0","#29dbbe","#29ddbb","#2adfb8","#2be0b6","#2ce2b3","#2de3b1","#2ee5ae","#30e6ac","#31e8a9","#32e9a6","#34eba4","#35eca1","#37ed9f","#39ef9c","#3af09a","#3cf197","#3ef295","#40f392","#42f490","#44f58d","#46f68b","#48f788","#4af786","#4df884","#4ff981","#51fa7f","#54fa7d","#56fb7a","#59fb78","#5cfc76","#5efc74","#61fd71","#64fd6f","#66fd6d","#69fd6b","#6cfd69","#6ffe67","#72fe65","#75fe63","#78fe61","#7bfe5f","#7efd5d","#81fd5c","#84fd5a","#87fd58","#8afc56","#8dfc55","#90fb53","#93fb51","#96fa50","#99fa4e","#9cf94d","#9ff84b","#a2f84a","#a6f748","#a9f647","#acf546","#aff444","#b2f343","#b5f242","#b8f141","#bbf03f","#beef3e","#c1ed3d","#c3ec3c","#c6eb3b","#c9e93a","#cce839","#cfe738","#d1e537","#d4e336","#d7e235","#d9e034","#dcdf33","#dedd32","#e0db32","#e3d931","#e5d730","#e7d52f","#e9d42f","#ecd22e","#eed02d","#f0ce2c","#f1cb2c","#f3c92b","#f5c72b","#f7c52a","#f8c329","#fac029","#fbbe28","#fdbc28","#feb927","#ffb727","#ffb526","#ffb226","#ffb025","#ffad25","#ffab24","#ffa824","#ffa623","#ffa323","#ffa022","#ff9e22","#ff9b21","#ff9921","#ff9621","#ff9320","#ff9020","#ff8e1f","#ff8b1f","#ff881e","#ff851e","#ff831d","#ff801d","#ff7d1d","#ff7a1c","#ff781c","#ff751b","#ff721b","#ff6f1a","#fd6c1a","#fc6a19","#fa6719","#f96418","#f76118","#f65f18","#f45c17","#f25916","#f05716","#ee5415","#ec5115","#ea4f14","#e84c14","#e64913","#e44713","#e24412","#df4212","#dd3f11","#da3d10","#d83a10","#d5380f","#d3360f","#d0330e","#ce310d","#cb2f0d","#c92d0c","#c62a0b","#c3280b","#c1260a","#be2409","#bb2309","#b92108","#b61f07","#b41d07","#b11b06","#af1a05","#ac1805","#aa1704","#a81604","#a51403","#a31302","#a11202","#9f1101","#9d1000","#9b0f00","#9a0e00","#980e00","#960d00","#950c00","#940c00","#930c00","#920c00","#910b00","#910c00","#900c00","#900c00","#900c00"],
["#6e40aa","#6f40aa","#7140ab","#723fac","#743fac","#753fad","#773fad","#783fae","#7a3fae","#7c3faf","#7d3faf","#7f3faf","#803eb0","#823eb0","#833eb0","#853eb1","#873eb1","#883eb1","#8a3eb2","#8b3eb2","#8d3eb2","#8f3db2","#903db2","#923db3","#943db3","#953db3","#973db3","#983db3","#9a3db3","#9c3db3","#9d3db3","#9f3db3","#a13db3","#a23db3","#a43db3","#a63cb3","#a73cb3","#a93cb3","#aa3cb2","#ac3cb2","#ae3cb2","#af3cb2","#b13cb2","#b23cb1","#b43cb1","#b63cb1","#b73cb0","#b93cb0","#ba3cb0","#bc3caf","#be3caf","#bf3caf","#c13dae","#c23dae","#c43dad","#c53dad","#c73dac","#c83dac","#ca3dab","#cb3daa","#cd3daa","#ce3da9","#d03ea9","#d13ea8","#d33ea7","#d43ea7","#d53ea6","#d73ea5","#d83fa4","#da3fa4","#db3fa3","#dc3fa2","#de3fa1","#df40a0","#e040a0","#e2409f","#e3409e","#e4419d","#e5419c","#e7419b","#e8429a","#e94299","#ea4298","#eb4397","#ed4396","#ee4395","#ef4494","#f04493","#f14592","#f24591","#f34590","#f4468f","#f5468e","#f6478d","#f7478c","#f8488b","#f9488a","#fa4988","#fb4987","#fc4a86","#fd4a85","#fe4b84","#fe4b83","#ff4c81","#ff4d80","#ff4d7f","#ff4e7e","#ff4e7d","#ff4f7b","#ff507a","#ff5079","#ff5178","#ff5276","#ff5275","#ff5374","#ff5473","#ff5572","#ff5570","#ff566f","#ff576e","#ff586d","#ff586b","#ff596a","#ff5a69","#ff5b68","#ff5c66","#ff5d65","#ff5d64","#ff5e63","#ff5f61","#ff6060","#ff615f","#ff625e","#ff635d","#ff645b","#ff655a","#ff6659","#ff6758","#ff6857","#ff6956","#ff6a54","#ff6b53","#ff6c52","#ff6d51","#ff6e50","#ff6f4f","#ff704e","#ff714d","#ff724c","#ff734b","#ff744a","#ff7549","#ff7648","#ff7847","#ff7946","#ff7a45","#ff7b44","#ff7c43","#ff7d42","#ff7e41","#ff8040","#ff813f","#ff823e","#ff833d","#ff843d","#ff863c","#ff873b","#ff883a","#ff893a","#ff8a39","#ff8c38","#ff8d37","#ff8e37","#ff8f36","#fe9136","#fd9235","#fd9334","#fc9534","#fb9633","#fa9733","#f99832","#f99a32","#f89b32","#f79c31","#f69d31","#f59f30","#f4a030","#f3a130","#f2a32f","#f1a42f","#f0a52f","#efa62f","#eea82f","#eda92e","#ecaa2e","#ebac2e","#eaad2e","#e9ae2e","#e8b02e","#e7b12e","#e6b22e","#e5b32e","#e4b52e","#e3b62e","#e2b72f","#e1b92f","#e0ba2f","#dfbb2f","#debc30","#ddbe30","#dbbf30","#dac030","#d9c131","#d8c331","#d7c432","#d6c532","#d5c633","#d4c833","#d3c934","#d2ca34","#d1cb35","#cfcc36","#cece36","#cdcf37","#ccd038","#cbd138","#cad239","#c9d33a","#c8d53b","#c7d63c","#c6d73c","#c5d83d","#c4d93e","#c3da3f","#c2db40","#c1dc41","#c0dd42","#bfdf43","#bee044","#bde146","#bce247","#bbe348","#bae449","#b9e54a","#b8e64b","#b7e74d","#b6e84e","#b6e94f","#b5ea51","#b4ea52","#b3eb53","#b2ec55","#b1ed56","#b1ee58","#b0ef59","#aff05b"],["#6e40aa","#6d41ab","#6d41ad","#6d42ae","#6c43af","#6c43b0","#6b44b2","#6b45b3","#6a46b4","#6a46b5","#6a47b7","#6948b8","#6849b9","#684aba","#674abb","#674bbd","#664cbe","#664dbf","#654ec0","#654fc1","#6450c2","#6350c3","#6351c4","#6252c5","#6153c6","#6154c7","#6055c8","#5f56c9","#5f57ca","#5e58cb","#5d59cc","#5c5acd","#5c5bce","#5b5ccf","#5a5dd0","#595ed1","#595fd1","#5860d2","#5761d3","#5662d4","#5663d5","#5564d5","#5465d6","#5366d7","#5267d7","#5168d8","#5169d9","#506ad9","#4f6bda","#4e6cda","#4d6ddb","#4c6edb","#4b70dc","#4b71dc","#4a72dd","#4973dd","#4874de","#4775de","#4676df","#4577df","#4479df","#447adf","#437be0","#427ce0","#417de0","#407ee0","#3f80e1","#3e81e1","#3d82e1","#3d83e1","#3c84e1","#3b86e1","#3a87e1","#3988e1","#3889e1","#378ae1","#378ce1","#368de1","#358ee1","#348fe1","#3390e1","#3292e1","#3293e1","#3194e0","#3095e0","#2f96e0","#2e98e0","#2e99df","#2d9adf","#2c9bdf","#2b9cde","#2b9ede","#2a9fdd","#29a0dd","#29a1dd","#28a2dc","#27a4dc","#26a5db","#26a6db","#25a7da","#25a8d9","#24aad9","#23abd8","#23acd8","#22add7","#22aed6","#21afd5","#21b1d5","#20b2d4","#20b3d3","#1fb4d2","#1fb5d2","#1eb6d1","#1eb8d0","#1db9cf","#1dbace","#1dbbcd","#1cbccc","#1cbdcc","#1cbecb","#1bbfca","#1bc0c9","#1bc2c8","#1ac3c7","#1ac4c6","#1ac5c5","#1ac6c4","#1ac7c2","#1ac8c1","#19c9c0","#19cabf","#19cbbe","#19ccbd","#19cdbc","#19cebb","#19cfb9","#19d0b8","#19d1b7","#19d2b6","#19d3b5","#1ad4b4","#1ad5b2","#1ad5b1","#1ad6b0","#1ad7af","#1bd8ad","#1bd9ac","#1bdaab","#1bdbaa","#1cdba8","#1cdca7","#1cdda6","#1ddea4","#1ddfa3","#1edfa2","#1ee0a0","#1fe19f","#1fe29e","#20e29d","#20e39b","#21e49a","#22e599","#22e597","#23e696","#24e795","#24e793","#25e892","#26e891","#27e98f","#27ea8e","#28ea8d","#29eb8c","#2aeb8a","#2bec89","#2cec88","#2ded87","#2eed85","#2fee84","#30ee83","#31ef82","#32ef80","#33f07f","#34f07e","#35f07d","#37f17c","#38f17a","#39f279","#3af278","#3bf277","#3df376","#3ef375","#3ff374","#41f373","#42f471","#43f470","#45f46f","#46f46e","#48f56d","#49f56c","#4bf56b","#4cf56a","#4ef56a","#4ff669","#51f668","#52f667","#54f666","#55f665","#57f664","#59f664","#5af663","#5cf662","#5ef661","#5ff761","#61f760","#63f75f","#64f75f","#66f75e","#68f75d","#6af75d","#6bf65c","#6df65c","#6ff65b","#71f65b","#73f65a","#74f65a","#76f659","#78f659","#7af659","#7cf658","#7ef658","#80f558","#81f558","#83f557","#85f557","#87f557","#89f557","#8bf457","#8df457","#8ff457","#91f457","#93f457","#94f357","#96f357","#98f357","#9af357","#9cf257","#9ef258","#a0f258","#a2f258","#a4f158","#a6f159","#a8f159","#aaf159","#abf05a","#adf05a","#aff05b"]
]; //d3 color schemes, one per dataset

const DATA_SETTINGS = {
	movies:{
		endpoint: 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json',
		title:"Movie Sales",
		sub: "Top 100 most seen Movies grouped by genre.",
		name:"movies",
		display: "Movie",
		catName:"Movie Genres",
		scheme:0,
		colors:null
	},
	games: {
		endpoint:'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json',
		title:"Video Games Sales",
		display: "Video Game",
		sub: "Top 100 most sold Video Games grouped by platform.",
		name:"games",
		catName:"Gaming Platform",
		scheme:1,
		colors:null
	},
	kickstarts: {
		endpoint:'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json',
		title:"Kickstart Sales",
		display: "Kickstart",
		catName:"Market Field",
		sub: "Top 100 most sold Kickstarts grouped by field.",
		name:"kickstarts",
		scheme:2,
		colors:null
	}
}

const SHOW_DEFAULT = "movies";

const getCategories = ( dataset ) => 
	dataset.reduce(
		(t,e) => t[e.name] = COLOR_SCHEME,{}
	)

function mountLegend( catName,container,categories,width ){
	//legend 
	const svg = d3.select(container)
			.append("svg")
			.attr("width",width)
			.attr("viewBox", [0, 0, width, 100]),
		  
		  	elemW = 30,
		  
			dom = Object.keys( categories ),

			ordinal = d3.scaleOrdinal()
				.domain( dom )
				.range( Object.values( categories ) ),

			legendOrdinal = d3.legendColor()
				.shape("circle")
				.shapeRadius(10)
  				.labelWrap( elemW )
				.shapePadding((width-elemW*dom.length)/(dom.length-1))
				.orient("horizontal")
				.title(catName)
				.scale(ordinal);
	
	svg.append("g")
		.attr("id","legend")
	  	.call(legendOrdinal)
		.attr("transform",`translate(30,30)`);
}

function addHoverHandler( svg,cont,handler,width ){
	const txtGroup = svg.append("g")
        .attr("id","tooltip")
        .attr("class","tp")
        .attr("visibility","hidden");

    txtGroup.append("rect")
        .attr("class","rect-txt-bg")
        .attr("fill","#333")
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("height",50);
	
    txtGroup.append("text")
        .attr("class","tp-name")
        .attr("fill","white")
        .attr("dy", "1em")
        .attr("x",10)
        .attr("y",4)
        .style("font-weight", "light")
        .style("font-size", "15px")
	
	txtGroup.append("text")
        .attr("class","tp-category")
        .attr("fill","white")
        .attr("dy", "1em")
        .attr("x",10)
        .attr("y",20)
        .style("font-weight", "light")
        .style("font-size", "15px")
	
	
	svg.selectAll(".data-cell")
        .on("mouseover", el => {
			let txtWidth,nameWidth,catWidth;
			const box = cont.getBoundingClientRect(),
				  mX = d3.event.clientX - box.left+10,
				  mY = d3.event.clientY - box.top+10,
				  txtName = txtGroup.select("text.tp-name"),
				  txtCat = txtGroup.select("text.tp-category"),
				  txtBg = txtGroup.select("rect.rect-txt-bg");

			txtName.text(`${handler.display}: ${el.data.name}`);
			txtCat.text(`Category: ${el.data.category}`);
		
			nameWidth = txtName.node().getComputedTextLength();
			catWidth = txtCat.node().getComputedTextLength();
			
			txtWidth = (nameWidth>catWidth) ? nameWidth : catWidth;

			txtBg.attr("width",txtWidth+40);

			txtGroup.attr("visibility","visible");
			txtGroup.attr("data-value",el.data.value);
		
			txtGroup.attr(
				"transform",
				`translate(${mX>2.5*width/4 ? mX - (txtWidth+30) : mX},${mY})`
			);
    	})
        .on("mouseout", el => {
			txtGroup.attr("visibility","hidden");
			d3.select ( d3.event.target ).attr("stroke","none")
    	});
}

function mountGraph(){
	
	const data = this.state.data,
		
		  handler = this.state.handler,
		  
		  categoryColors = this.state.colors,
		  
		  cont = this.graph.current,
		  
		  w = cont.clientWidth,
		  
		  h = 610,
		  		  
		  svg = d3.select(cont)
				.append("svg")
				.attr("viewBox", [0, 0, w, h]),
		  
		  treemap = d3.treemap()
				.tile(d3.treemapBinary)
				.size([w, h])
				.round(true)
				.paddingInner(1),
		  
		  root = d3.hierarchy(data)
				.sum(d => d.value)
				.sort((a, b) => b.value - a.value);
	
	treemap(root);
	
	const leaf = svg.selectAll("g")
		.data( root.leaves() ) 
		.join("g")
		.attr("class","data-cell")
		.attr("transform", d => `translate(${d.x0},${d.y0})`);

	leaf.append("rect")
		.attr("class","tile")
		.attr("data-category",d => d.data.category)
		.attr("data-value",d => d.data.value)
		.attr("data-name",d => d.data.name)
		.attr("fill", d => categoryColors[d.data.category] )
		.attr("stroke","white")
		.attr("width", d => d.x1 - d.x0)
		.attr("height", d => d.y1 - d.y0);
	
	leaf.append("text")
		.selectAll("tspan")
		.data(d => d.data.name.split(/(?=[A-Z][a-z])|\s+/g))
		.join("tspan")
		.attr("x", 5)
		.attr("y", (d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`)
		.text(d => d);
	
	mountLegend(handler.catName,cont,categoryColors,w);
	
	addHoverHandler( svg,cont,handler,w );
	
}

function SelectData({ current,handler }){
	const change = (e) => {
		e.preventDefault();
		handler( DATA_SETTINGS[ e.currentTarget.getAttribute("handler") ] );
	}
	
	return(
		<ul className="option-set">
			{
				Object.values( DATA_SETTINGS ).map(
					e => (
						<li className={
								current===e.name 
									? "selected option" 
									: "option"
							}
							style={{width:"33.333334%"}}>
							<button handler={e.name} 
								className="obutton"
								onClick={change}>
								{e.display}
							</button>
						</li>
					)
				)
			}
		</ul>	
	)
}

function assignColors( dataset,handler ){
	const colors = handler.colors;
	return colors 
		? colors 
		: dataset.children.reduce(
			(t,e) => {
				t[e.name] = COLOR_SCHEME[handler.scheme][ Math.round( Math.random()*255 ) ]
				return t;
			},{}
		)
}

function handleData( handler ){
	d3.selectAll("svg").remove();
	return this.setState(
		{ handler,loading:true },
		() => axios.get( handler.endpoint )
				.then( res => this.setState( {data:res.data,loading:false,colors:assignColors( res.data,handler )} ) )
				.catch( err => console.log( err ) ) // not handling errors
	)
}

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
			data:null,
			handler:DATA_SETTINGS[SHOW_DEFAULT],
			loading:false,
			colors:{}
		};
        this.graph = React.createRef(null);
        this.mountGraph = mountGraph.bind(this);
		this.handleData = handleData.bind(this);
    }
    
    componentDidMount(){
		this.handleData( DATA_SETTINGS[SHOW_DEFAULT] );
    }
    
    render(){
		const hand = this.state.handler,
			  title = hand.title,
			  sub = hand.sub;
        if (this.state.data && !this.state.loading)
            this.mountGraph();
        return (
            <>
                <div class="row justify-content-center">
                    <div class="col-md-12 col-lg-12 col-xl-9 dark-bg" style={{padding:"0"}}>
                        <h2 class="title" id="title">
                            {title}
                            <div id="description" style={{fontSize:"18px",fontWeight:200}}>
                                {sub}
                            </div>
                        </h2>
						<SelectData handler={this.handleData}
							current = {hand.name}/>
					</div>
                </div>
				<div className="row justify-content-center" style={{marginTop:"20px"}}>
					<div class="col-md-12 col-lg-12 col-xl-10">
						{
							this.state.loading
								? <h5 style={{padding:"15px",textAlign:"center"}}>Cargando...</h5>
								: ""
						}
						<div ref={this.graph}></div>
					</div>
				</div>
            </>
        )
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    )
}