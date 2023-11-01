import { AddItemFormComponent } from "src/app/shopping-list/components/manage/items/edit-add/add-item.component";
import { EditItemFormComponent } from "src/app/shopping-list/components/manage/items/edit-add/edit-item.component";
import { ItemService } from "src/app/shopping-list/services/item.service";
import { castModel } from "src/helper/castModel";
import { ActionDescriptor, CastedItem, Item, OpenerComponent, Unit } from "src/types";
import { UnitModel } from "./unit.model";

const cast = {
    createdAt: (date:string) => new Date(date),
    updatedAt: (date:string) => new Date(date),
    unit: (unit: Unit) => new UnitModel(unit)
}

export class ItemModel
{
    private casted :CastedItem

    private original : Item

    constructor( item: Item )
    {
        this.original = item;
        this.casted = castModel<CastedItem>(item,cast)
    }

    get data() : CastedItem
    {
        return this.casted
    }

    actions( 
        itemService : ItemService,
        opener : OpenerComponent ) : {[key:string]:ActionDescriptor[]}
    {
        return {
            'crud':[
                {
                    type:"button",
                    name:"delete",
                    action: (unt : Unit) => itemService.request.delete(`unit/${unt._id}`).finally( () => opener.fetchData() ),
                    classes:["btn","px-2","py-0","btn-danger","mr-2","small","font-weight-bolder"],
                    data: this.data
                },
                {
                    type:"button",
                    action: ItemModel.staticActions(opener,itemService,this.data._id)['createEditItem'],
                    name:"edit",
                    classes:["btn","px-2","py-0","btn-success","mr-2","font-weight-bolder","small"],
                    data: this.data
                }
            ]
        }
    }

    static staticActions( 
        opener: OpenerComponent,
        itemService : ItemService,
        itemId? : string ) 
    {
        return {
            'createEditItem': () => 
            {
                const component = itemId 
                    ? EditItemFormComponent
                    : AddItemFormComponent
                const data = itemId 
                ? {itemId} 
                : {}
                const disposable = opener
                    .simpleModalService
                    .addModal(component,data)
                    .subscribe( 
                        (isConfirmed) => 
                        {
                            if(isConfirmed)
                            {
                                opener.fetchData()
                            }
                            disposable.unsubscribe() 
                        }
                    );
            }
        }
    }

}