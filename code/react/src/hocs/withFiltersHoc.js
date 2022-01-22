import React from 'react';

// expecting a series of filters to apply on data
// filters would have to be an array

export default function withFiltersHoc(Component)
{
    return class FiltersHoc extends React.Component
    {
        constructor(props)
        {
            super(props);
            this.filters = this.props.filters
            this.state = {
                filters:this.filters,
                appliedFilters:[]
            };
        }

        getFilterByName = (name) =>
        {
            for (let i=0;i<this.filters.length;i++)
            {
                if( this.filters[i].filterName === name )
                    return this.filters[i];
            }
            return null;
        }

        checkFiltersOnItem = ( filters,item ) =>
        {
            let fil;
            const filterLen = filters.length;
            for( let i = 0; i<filterLen; i++ )
            {
                fil = this.getFilterByName(filters[i].name);
                if(fil.accessField(item) != filters[i].value)
                    return false;
            }
            return true;
        }

        applyFilters = (data,filters) =>
        {
            let filteredData = data;
            return data.reduce(
                (t,e) => {
                    if (filters.length>0)
                        filteredData = this.checkFiltersOnItem(filters,e)
                            ? [...t,e]
                            : t;
                    return filteredData;
                },[]
            )
        }

        changeFilter = (e) =>
        {
            const {name,value} = e.currentTarget;
            const filtered = this.state.appliedFilters.filter( e => e.name!==name );
            const appliedFilters = (!value)
                ? filtered
                : [...filtered,{name,value}];
            this.setState({appliedFilters})
        }

        generateFilterInputs = () =>
        {
            return this.filters.map(
                (e,i) => (
                    <select
                        key={i}
                        name={e.filterName}
                        onChange={this.changeFilter}
                    >
                        <option value="">{e.selectTitle}</option>
                        {
                            e.validValues.map(
                                (j,k) => (
                                    <option
                                        key={k}
                                        value={j.value}
                                    >
                                        {j.title}
                                    </option>
                                )
                            )
                        }
                    </select>
                )
            )
        }

        render(){
            const {appliedFilters} = this.state;
            return (
                <>
                    <div className="container-fluid list-group-item mt-3">
                        <div className="row">
                            <div className="col-2">
                                <h6 className="font-weight-bold">Filters</h6>
                            </div>
                            <div className="col-10 text-right">
                                <form>
                                    {this.generateFilterInputs()}
                                </form>
                            </div>
                        </div>
                    </div>
                    <Component
                        {...this.props}
                        data={this.applyFilters(this.props.data,appliedFilters)}
                    />
                </>
            )
        }
    }
}
