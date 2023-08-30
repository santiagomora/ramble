
const mapEdu = data => 
	data.reduce( 
		(t,e) =>{
			t[e.fips] = e;
			return t;
		},{} 
	)

function mountGraph(){
	
	const mapData = this.state.map,
		  
		  cont = this.graph.current,
		  
		  w = cont.clientWidth,
		  
		  colorScheme = d3.schemePurples[9],
		  	
		  eduData = mapEdu( this.state.edu ),
		  
		  svg = d3.select(this.graph.current)
				.append("svg")
				.attr("viewBox", [0, 0, 975, 610]),
		  
		  min = d3.min( this.state.edu, d =>  d.bachelorsOrHigher  ),
		  
		  max = d3.max( this.state.edu, d =>  d.bachelorsOrHigher  ),
		  
		  color = d3.scaleQuantize( [ min,max ], colorScheme ),
		  
		  format = d => `${d}%`,
		  
		  states = new Map(mapData.objects.states.geometries.map(d => [d.id, d.properties])),
		  
		  path = d3.geoPath(),
		  
		  scaleLeg = d3.scaleQuantize( colorScheme ).domain( [min,max] ),
		  
		  legendScale = d3.legendColor()
				.shapeWidth(30)
				.cells(10)
				.orient('horizontal')
				.scale(scaleLeg),
		  
		  legend = svg.append("g")
				.attr("id","legend")
				.attr("class", "legendScale")
				.attr("transform", "translate(610,40)")
				.call(legendScale);
	
	svg.append("g")
		.selectAll("path")
		.data(topojson.feature(mapData, mapData.objects.counties).features)
		.join("path")
		.attr("class","county")
		.attr("fill", d => color( eduData[d.id].bachelorsOrHigher ) )
		.attr("data-fips", d => eduData[d.id].fips)
		.attr("data-education", d => eduData[d.id].bachelorsOrHigher )
		.attr("d", path)
		.append("title");
	
	legend.append("text")
		.attr("font-size","13px")
		.attr("font-weight","bold")
		.attr("transform","translate(-50,-10)")
		.text("Population with bachelor's degree or higher and older than 25. [ % ]")

	svg.append("path")
		.datum(topojson.mesh(mapData, mapData.objects.states, (a, b) => a !== b))
		.attr("fill", "none")
		.attr("stroke", "white")
		.attr("stroke-linejoin", "round")
		.attr("d", path);

	const txtGroup = svg.append("g")
        .attr("id","tooltip")
        .attr("class","tp")
        .attr("visibility","hidden");

    txtGroup.append("rect")
        .attr("class","rect-txt-bg")
        .attr("fill","#333")
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("height",30);
	
    txtGroup.append("text")
        .attr("class","tp-data")
        .attr("fill","white")
        .attr("dy", "1em")
        .attr("x",10)
        .attr("y",4)
        .style("font-weight", "light")
        .style("font-size", "15px")

    svg.selectAll(".county")
        .on("mouseover", el => {
			let txtWidth;
			const box = cont.getBoundingClientRect(),
				  mX = d3.event.clientX - box.left+10,
				  mY = d3.event.clientY - box.top+10,
				  txtData = txtGroup.select("text.tp-data"),
				  data = eduData[el.id],
                  txtBg = txtGroup.select("rect.rect-txt-bg");

			txtWidth = txtData.node().getComputedTextLength();
			txtGroup.attr("visibility","visible");
			txtGroup.attr("data-year",el.year)
			
			d3.select ( d3.event.target ).attr("stroke","black")
			txtData.text(`${data.area_name}, ${data.state}. bachelors: ${data.bachelorsOrHigher}%.`);
			
			txtBg.attr("width",txtWidth+40);
		
			txtGroup
				.attr("data-education",data.bachelorsOrHigher)
				.attr(
					"transform",
					`translate(${mX>2.5*w/4 ? mX - (txtWidth+30) : mX},${mY})`
				);
    	})
        .on("mouseout", el => {
			txtGroup.attr("visibility","hidden");
			d3.select ( d3.event.target ).attr("stroke","none")
    	});
}

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = { map:null,edu:null };
        this.graph = React.createRef(null);
        this.mountGraph = mountGraph.bind(this);
    }
    
    componentDidMount(){
        const req = axios.get('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json')
            .then( 
                res => this.setState(
					{map:res.data},
					() => axios.get('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json')
							.then( res => this.setState( {edu:res.data} ) )
							.catch( err => console.log({message:"error querying education info",err}) )
				)
            ).catch( err => console.log({message:"error querying map info",err}) );//wont handle errors
    }
    
    render(){
        if (this.state.map && this.state.edu)
            this.mountGraph();
        return (
            <>
                <div class="row justify-content-center">
                    <div class="col-md-12 col-lg-12 col-xl-9">
                        <h2 class="title" id="title">
                            United States Educational Attainment
                            <div id="description" style={{fontSize:"18px",fontWeight:200}}>
                                Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)
                            </div>
                        </h2>
						<div  ref={this.graph}></div>
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