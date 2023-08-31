import React from 'react';

const LIMITS = {
    offset:{
        MAX:100,
        MIN:1
    },
    limit:{
        MAX:20,
        MIN:1
    },
    columns:{
        MAX:6,
        MIN:3
    }
}

const HANDLER = (change,state,type) => {

    const {MAX,MIN} = LIMITS[type];

    return ({currentTarget}) => {

        const value = parseInt(currentTarget.value||MIN+'');

        if ( value<=MAX && value>=MIN ){
            state[type] = value;
            change(state);
        }

    }

}

export default function Controls({state,change}){

    const {limit,offset,columns} = state;

    return(

        <div className="row justify-content-center">
            <div className="col-md-2 col-sm-5 left svpadding">
                results per page:
                <input
                    type="number"
                    name="limit"
                    max={LIMITS['limit'].MAX}
                    min={LIMITS['limit'].MIN}
                    className="smallwidth"
                    onChange={HANDLER(change,state,'limit')}
                    value={limit}/>
            </div>
            <div className="col-md-2 col-sm-3 center svpadding">
                page:
                <input
                    type="number"
                    name="offset"
                    max={LIMITS['offset'].MAX}
                    min={LIMITS['offset'].MIN}
                    className="smallwidth"
                    onChange={HANDLER(change,state,'offset')}
                    value={offset}/>
            </div>
            <div className="col-md-2 col-sm-4 right svpadding">
                columns:
                <input
                    type="number"
                    name="columns"
                    max={LIMITS['columns'].MAX}
                    min={LIMITS['columns'].MIN}
                    className="smallwidth"
                    onChange={HANDLER(change,state,'columns')}
                    value={columns}/>
            </div>
        </div>

    )

}
