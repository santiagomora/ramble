import React from 'react';

function Image({data,columns}){
    const col = parseInt(12/columns),
        {url,snippet,context} = data;
    return (
        <div key={data._id}
            className={`col-md-${col} col-sm-${col}`}>
            <a href={context}
                target="_blank">
                <img src={url}
                    className="img-responsive"
                    width="100%"/>
                <div className="svpadding">{snippet}</div>
            </a>
        </div>
    )
}

function DisplayGrid({
    data,
    columns
}){
    let rows = [],
        cols = [],
        init=0,
        stop;

    for( let i=0; i<data.length/columns; i++ ){

        stop = columns>data.length-i*columns
            ? data.length-i*columns
            : columns;

        for( let j=init; j<stop+init; j++){
            cols.push(
                Image({
                    data:data[j],
                    columns
                })
            )
        }

        rows.push(
            <div key={i} className="row displayflex">{cols}</div>
        );

        cols = [];
        init+=columns;
    }

    return rows;
}

export default function Results({columns,term,data}){
    return(
        <>
            <div className="row justify-content-center">
                <div className="col-md-8 svpadding">
                    {
                        term
                        ? `Showing results for ${term}`
                        : 'Showing all results'
                    }
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-8 svpadding">
                    {
                        DisplayGrid({
                            data,
                            columns
                        })
                    }
                </div>
            </div>
        </>
    )
}
