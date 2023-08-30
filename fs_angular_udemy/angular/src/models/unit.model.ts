import { AddUnitFormComponent } from "src/app/shopping-list/components/manage/units/edit-add/add-unit.component";
import { EditUnitFormComponent } from "src/app/shopping-list/components/manage/units/edit-add/edit-unit.component";
import { UnitService } from "src/app/shopping-list/services/unit.service";
import { castModel } from "src/helper/castModel";
import { ActionDescriptor, CastedUnit, OpenerComponent, Unit } from "src/types";

const cast = {
    createdAt: (date:string) => new Date(date),
    updatedAt: (date:string) => new Date(date),
}

export class UnitModel
{
    private casted :CastedUnit

    private original : Unit

    constructor( unit: Unit )
    {
        this.original = unit;
        this.casted = castModel<CastedUnit>(unit,cast)
    }

    get data() : CastedUnit
    {
        return this.casted
    }

    actions( 
        unitService : UnitService,
        opener : OpenerComponent ) : {[key:string]:ActionDescriptor[]}
    {
        return {
            'crud':[
                {
                    type:"button",
                    name:"delete",
                    action: (unt : Unit) => unitService.request.delete(`unit/${unt._id}`).finally( () => opener.fetchData() ),
                    classes:["btn","px-2","py-0","btn-danger","mr-2","small","font-weight-bolder"],
                    data: this.data
                },
                {
                    type:"button",
                    action: UnitModel.staticActions(opener,unitService,this.data._id)['createEditUnit'],
                    name:"edit",
                    classes:["btn","px-2","py-0","btn-success","mr-2","font-weight-bolder","small"],
                    data: this.data
                }
            ] 
        }
    }

    static staticActions( 
        opener: OpenerComponent,
        unitService: UnitService,
        unitId? : string ) 
    {
        return {
            'createEditUnit': () => 
            {
                const component = unitId 
                    ? EditUnitFormComponent
                    : AddUnitFormComponent
                const data = unitId 
                ? {unitId} 
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