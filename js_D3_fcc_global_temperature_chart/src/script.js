const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const evalIntervals = [{
        max:2.8,
        min:0,
        eval: (tmp) => tmp<=2.8,
        color:"rgb(49, 54, 149)"
    },{
        max:3.9,
        min:2.8,
        eval: (tmp) => tmp>2.8 && tmp<=3.9,
        color:"rgb(69, 117, 180)"
    },{
        max:5.0,
        min:3.9,
        eval: (tmp) => tmp>3.9 && tmp<=5.0,
        color:"rgb(116, 173, 209)"
    },{
        max:6.1,
        min:5.0,
        eval: (tmp) => tmp>5.0 && tmp<=6.1,
        color:"rgb(171, 217, 233)"
    },{
        max:7.2,
        min:6.1,
        eval: (tmp) => tmp>6.1 && tmp<=7.2,
        color:"rgb(224, 243, 248)"
    },{
        max:8.3,
        min:7.2,
        eval: (tmp) => tmp>7.2 && tmp<=8.3,
        color:"rgb(255, 255, 191)"
    },{
        max:9.5,
        min:8.3,
        eval: (tmp) => tmp>8.3 && tmp<=9.5,
        color:"rgb(254, 224, 144)"
    },{
        max:10.6,
        min:9.5,
        eval: (tmp) => tmp>9.5 && tmp<=10.6,
        color:"rgb(253, 174, 97)"
    },{
        max:11.7,
        min:10.6,
        eval: (tmp) => tmp>10.6 && tmp<=11.7,
        color:"rgb(244, 109, 67)"
    },{
        max:12.8,
        min:11.7,
        eval: (tmp) => tmp>11.7 && tmp<=12.8,
        color:"rgb(215, 48, 39)"
    },{
        max:"",
        min:12.8,
        eval: (tmp) => tmp>12.8,
        color:"rgb(165, 0, 38)"
    }
];

const getColor = (tmp) => evalIntervals.filter( ev => ev.eval(tmp) ).pop()

function mountGraph(){
    const baseTemp = this.state.data.baseTemperature,
        
        dataset = this.state.data.monthlyVariance,
        
        mkeys = Array.from({length: months.length}, (v, i) => i),
          
        cont = this.graph.current,
          
        w = cont.clientWidth,
          
        h = 12*50,
          
        rw = w/dataset.length,
          
        rh = h/months.length,
          
        max = d3.max(dataset, d => d.year ),
          
        min = d3.min(dataset, d => d.year ),
          
        padding = 80,
        
        xScale = d3.scaleLinear()
            .domain([min,max])
            .range([padding+1, w - padding]),
    
        yScale = d3.scaleBand()
            .domain(mkeys)           
            .range([h-padding, padding]),
          
        svg = d3.select(this.graph.current)
            .append("svg")
            .attr("width", w)
            .attr("height", h),
        
        xAxis = d3.axisBottom(xScale),

        yAxis = d3.axisLeft(yScale).tickFormat( x=>months[x] );
    
    svg.append("g")
        .attr("id","y-axis")
        .attr("class", "grid")
        .attr("transform", `translate(${padding},0)`)
        .call(yAxis);

    svg.append("g")
        .attr("id","x-axis")
        .attr("class", "grid")
        .attr("transform", `translate(0,${h - padding})`)
        .call(xAxis);

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0)
        .attr("x",- h/2 )
        .attr("dy", "1em")
        .style("font-weight", "bold")
        .text("[ Months ]");

    svg.append("text")
        .attr("transform", `translate(0,${h - padding+20})`)
        .attr("y", 0)
        .attr("x",w/2 -padding)
        .attr("dy", "1em")
        .style("font-weight", "bold")
        .text("[ Years ]");

    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("class","rect cell")
        .attr("data-month",d => baseTemp+d.variance)
        .attr("data-year",d => d.year)
        .attr("data-temp",d => d.month)
        .attr("fill", (d) => getColor( baseTemp+d.variance ).color )
        .attr("y", (d) => yScale(d.month-1) )
        .attr("x", (d) => xScale(d.year) )
        .attr("width",dataset.length/(w-2*padding)+2)
        .attr("height",yScale.bandwidth());

    const txtGroup = svg.append("g")
    .attr("id","tooltip")
    .attr("data-year",1754)
    .attr("class","tp")
    .attr("visibility","hidden");

    txtGroup.append("rect")
        .attr("class","rect-txt-bg")
        .attr("fill","#333")
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("height",55);

    txtGroup.append("text")
        .attr("dy", "1em")
        .attr("fill","white")
        .attr("class","tp-date")
        .attr("x",10)
        .attr("y",5)
        .style("font-weight", "bold")

    txtGroup.append("text")
        .attr("class","tp-temp")
        .attr("fill","white")
        .attr("dy", "1em")
        .attr("x",10)
        .attr("y",25)
        .style("font-weight", "light")
        .style("font-size", "15px")

    svg.selectAll(`rect.rect`)
        .on("mouseover", el => {
        let txtWidth, dtWidth,tempWidth;
        const box = cont.getBoundingClientRect(),
              mX = d3.event.clientX - box.left+10,
              mY = d3.event.clientY - box.top+10,
              txtDate = txtGroup.select("text.tp-date"),
              txtBg = txtGroup.select("rect.rect-txt-bg"),
              txtTemp = txtGroup.select("text.tp-temp");

        txtGroup.attr("visibility","visible");
        txtGroup.attr("data-year",el.year)
        d3.select ( d3.event.target ).attr("stroke","black")
        txtDate.text(`${months[el.month-1]} ${el.year}`);
        txtTemp.text( `Temperature: ${Math.round((baseTemp+el.variance)*100)/100}, Variance: ${el.variance}` );

        dtWidth = txtDate.node().getComputedTextLength();
        tempWidth = txtTemp.node().getComputedTextLength();
        txtWidth =  dtWidth>tempWidth ? dtWidth : tempWidth;

        txtBg.attr("width",txtWidth+40);

        txtGroup.attr(
            "transform",
            `translate(${el.year>=1927 ? mX - (txtWidth+30) : mX},${mY})`
        );
        svg.select(`rect.rect-${el[0]}`).style("fill", "#17a2b8");
    })
        .on("mouseout", el => {
        txtGroup.attr("visibility","hidden");
        d3.select ( d3.event.target ).attr("stroke","none")
        svg.select(`rect.rect-${el[0]}`).style("fill", "#144f61");
    });
}

function mountLegend(){
    
    const dataset = evalIntervals,
          
        cont = this.legend.current,
          
        w = 100,
          
        h = 500,
          
        rh = w/dataset.length,
          
        rw = 20,
          
        padding = 45,
         
        yScale = d3.scalePoint()
            .domain( [...dataset,{min:13}].map( x => x.min ) ) 
            .range([h-padding,padding]),
       
        svg = d3.select(this.legend.current)
            .append("svg")
            .attr("width", w)
            .attr("height", h),
        
        yAxis = d3.axisLeft(yScale)
            .tickFormat( d => d<2.8||d>12.8 ? "" : `${d}°C` )
            .tickSizeOuter(0);
    
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("class","rect")
        .attr("fill", (d) => d.color )
        .attr("x",  padding)
        .attr("y", (d) => yScale(d.min)-padding/2-14)
        .attr("width",rw)
        .attr("height",(h-2*padding)/dataset.length);

    svg.append("g")
        .attr("id","y-lg-axis")
        .attr("class", "grid")
        .attr("transform", `translate(${padding},0)`)
        .call(yAxis);
    
}

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {data:null};
        this.graph = React.createRef(null);
        this.legend = React.createRef(null);
        this.mountGraph = mountGraph.bind(this);
        this.mountLegend = mountLegend.bind(this);
    }
    
    componentDidMount(){
        const req = axios.get('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json')
            .then( 
                res => {this.setState({data:res.data})}
            ).catch(
                err => 
                    console.log(err) // not handling api request errors
            );
    }
    
    render(){
        if (this.state.data){
            this.mountLegend();            
            this.mountGraph();
        }
        return (
            <>
                <div class="row justify-content-center">
                    <div class="col-md-12">
                        <h2 class="title" id="title">
                            Monthly Global Land-Surface Temperature
                            <div id="description" style={{fontSize:"18px",fontWeight:200}}>
                                1753 - 2015: base temperature 8.66℃
                            </div>
                        </h2>
                    </div>
                </div>
                <div class="row" style={{marginTop:"-30px"}}>
                    <div class="col-md-10" style={{paddingRight:"0px"}}>
                        <div style={{marginTop:"-30px"}} ref={this.graph}></div>
                    </div>
                    <div class="col-md-2" style={{paddingLeft:"0px",marginTop:"40px"}}>
                        <div style={{fontSize:"16px",fontWeight:"bold"}}>Legend</div>
                        <div style={{marginTop:"-35px"}} ref={this.legend}></div>
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