import { Subject } from "rxjs";
import { UnitModel } from "src/models";
import { PaginatedData, SubscriptionObject, Unit } from "src/types";

export const manageUnitsSubscriptions: SubscriptionObject[] = [
    {
        name:'fetchPaginatedUnits',
        callback: function(response){
            this.loading = false;
            this.units = response.data.data.map( e => new UnitModel(e) )
            this.pagination = response.data.pagination
        },
        generator: function(){
            return new Subject<PaginatedData<Unit[]>>()
        }
    },
    /*{
        name:'reloadRecipes',
        callback: function(type){
            if(type === 'reloadRecipes')
            {
                this.fetchData();
            }
        },
        generator: function(){
            return this.recipeService.intercom
        }
    }*/
]
