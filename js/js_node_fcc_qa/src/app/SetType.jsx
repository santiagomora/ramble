import React from 'react';

export default function SetType({change}){
    return(
        <div className="right">
            <select onChange={change}>
                <option value='local'>Local search</option>
                <option value='extern'>External search</option>
            </select>
        </div>
    )
}
