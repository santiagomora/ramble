import {searchByIdHelper} from '../../../helper/helper'
import * as classes from '../css/Food.module.css'

export default function ExtraSelector({extra,selectedExtra,hideOnDeselect,addSelectedExtraHandler}) 
{
    const mapped = extra.map(
        ext => 
        {   

            const isSelected = searchByIdHelper(ext._id,selectedExtra)>=0
            const extraComp = (
                <>
                    {ext.name}
                    <span className="mx-2">
                        <strong>+ $
                        {ext.price}
                        </strong>
                    </span>
                </>
            )
            return isSelected
            ?   
                (
                    <span 
                        key={ext._id}
                        className="mr-2 btn btn-light"
                    >
                        {extraComp}
                        <button
                            onClick={addSelectedExtraHandler} 
                            className={classes.delete}
                            data={ext._id}
                        >
                            <strong>×</strong>
                        </button>
                    </span>
                )
            : 
            (
                <button
                    key={ext._id}
                    disabled={!ext.available}   
                    onClick={addSelectedExtraHandler} 
                    className={`mr-2 btn ${isSelected? 'btn-success' : 'btn-light'}`} 
                    data={ext._id}
                >
                    {extraComp}
                </button>
            )
        }
    )
    return hideOnDeselect
        ? mapped.filter( ext => searchByIdHelper(ext._id,selectedExtra) )
        : mapped
}