import { Subject } from "rxjs";
import { ItemFormData, SubscriptionObject } from "src/types";
import { ItemFormControl } from "../forms/item.form";

export const itemFormSubscriptions: SubscriptionObject[] = [
    {
        name:'fetchFormData',
        callback: function(response){
            const {units} = response.data||{units:[]};
            this.loading=false
            this.formControl = new ItemFormControl(this.currentItem,{units})
        },
        generator: function(){
            return new Subject<ItemFormData>()
        }
    }
]
