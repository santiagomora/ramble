const NUMTICK = 14;

const getTickValues = ( data ) => data.reduce(
    ( t,e ) => [ ...t,e[0] ]
    ,[]
)

const month = [
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

function mountGraph(){
    const dataset = this.state.data.data.map( 
            x => 
                [ new Date( x[0] ).getTime(), x[1] ]
        ),
        
        cont = this.graph.current,
          
        w = cont.clientWidth,
          
        h = d3.max(dataset, d => d[1]/35),
          
        rw = w/dataset.length,
          
        max = d3.max(dataset, d => d[0] ),
          
        min = d3.min(dataset, d => d[0] ),
          
        padding = 60,
        
        xScale = d3.scaleLinear()
            .domain([min,max])
            .range([padding, w - padding]),
    
        yScale = d3.scaleLinear()
            .domain([
                0, 
                d3.max(dataset, (d) => d[1])
            ])
            .range([h-padding, padding]),
          
        svg = d3.select(this.graph.current)
            .append("svg")
            .attr("width", w)
            .attr("height", h);
    
        const xAxis = d3.axisBottom(xScale)
            .ticks(14)
            .tickFormat( x => new Date(x).getFullYear() )
            .tickSize( -h+2*padding  )
            .tickSizeOuter(0);

        const yAxis = d3.axisLeft(yScale)
            .tickSize( -w+2*padding )
            .tickSizeOuter(0);
    
        svg.append("g")
            .attr("id","y-axis")
            .attr("class", "grid")
            .attr("transform", `translate(${padding},0)`)
            .call(yAxis);
    
        svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("class", (x,i) => `rect rect-${x[0]} bar`)
            .attr("fill","#144f61")
            .attr("data-date", d => d[0] )
            .attr("data-gdp", d => d[1] )
            .attr("x", (d) => xScale(d[0]) )
            .attr("y", (d) => yScale(d[1]) )
            .attr("width",rw)
            .attr("height",(d) => h-padding-yScale(d[1]));
    
        svg.append("g")
            .attr("id","x-axis")
            .attr("class", "grid")
            .attr("transform", `translate(0,${h - padding})`)
            .call(xAxis)
    
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0)
            .attr("x",2*padding - h )
            .attr("dy", "1em")
            .style("font-weight", "bold")
            .text("Gross Domestic Product ( Millions )[ $ ]");
        
        svg.append("text")
            .attr("transform", `translate(0,${h - padding + 20})`)
            .attr("y", 0)
            .attr("x",w/2 -padding)
            .attr("dy", "1em")
            .style("font-weight", "bold")
            .text("Quarter[ month & year ]");
    
        const txtGroup = svg.append("g")
            .attr("id","tooltip")
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
            .attr("class","tp-gdp")
            .attr("fill","white")
            .attr("dy", "1em")
            .attr("x",10)
            .attr("y",25)
            .style("font-weight", "bold")

        svg.selectAll(`rect.rect`)
            .on("mouseover", el => {
                let txtWidth, dtWidth,gdpWidth;
                const date = new Date( el[0] ),
                      box = cont.getBoundingClientRect(),
                      mX = d3.event.clientX - box.left+10,
                      mY = d3.event.clientY - box.top+10,
                      txtDate = txtGroup.select("text.tp-date"),
                      txtBg = txtGroup.select("rect.rect-txt-bg"),
                      txtGdp = txtGroup.select("text.tp-gdp");
            
                txtGroup.attr("visibility","visible");
            
                txtDate.text(`${month[date.getMonth()]} ${date.getFullYear()}`);
                txtGdp.text( `GDP: $${el[1]}` );
            
                dtWidth = txtDate.node().getComputedTextLength();
                gdpWidth = txtGdp.node().getComputedTextLength();
                txtWidth =  dtWidth>gdpWidth ? dtWidth : gdpWidth;
            
                txtBg.attr("width",txtWidth+40);
                
                txtGroup.attr(
                    "transform",
                    `translate(${el[0]>=1151712000000 ? mX - (txtWidth+30) : mX},${mY})`
                );
                svg.select(`rect.rect-${el[0]}`).style("fill", "#17a2b8");
            })
            .on("mouseout", el => {
                txtGroup.attr("visibility","hidden");
                svg.select(`rect.rect-${el[0]}`).style("fill", "#144f61");
            });
}

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {data:null};
        this.graph = React.createRef(null);
        this.mount = mountGraph.bind(this);
    }
    
    componentDidMount(){
        const req = axios.get('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json')
            .then( 
                res => {this.setState({data:res.data})}
            ).catch(
                err => 
                    console.log(err) // not handling api request errors
            );
    }
    
    render(){
        const data = this.state.data;
        if (data)
            this.mount();
        return (
            <>
                <div ref={this.graph}>
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