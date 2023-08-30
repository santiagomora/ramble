import { ViewOrderComponent } from "src/app/shopping-list/components/place-order/orders/visualize/view-order.component";
import { OrderService } from "src/app/shopping-list/services/order.service";
import { castModel } from "src/helper/castModel";
import { ActionDescriptor, CastedOrder, CastedOrderWithoutItems, OpenerComponent, Order, OrderItem } from "src/types";
import { ItemModel } from "./item.model";

const cast = {
    createdAt: (date:string) => new Date(date),
    updatedAt: (date:string) => new Date(date),
}

const castWithItems = {
    createdAt: (date:string) => new Date(date),
    updatedAt: (date:string) => new Date(date),
    items: (items:OrderItem[]) => items.map( ({item,quantity}) => ({item:new ItemModel(item),quantity}) )
}

class OrderModel<T extends CastedOrderWithoutItems | CastedOrder>
{
    private casted :T

    private original : Order

    constructor( order: Order,cast )
    {
        this.original = order;
        this.casted = castModel<T>(order,cast)
    }

    get data() : T
    {
        return this.casted
    }

    actions( 
        orderService : OrderService,
        opener : OpenerComponent ) : {[key:string]:ActionDescriptor[]}
    {
        return {
            'crud':[
                {
                    type:"button",
                    action: OrderModel.staticActions(opener,orderService,this.data._id)['viewOrder'],
                    name:"view",
                    classes:["btn","px-2","py-0","btn-warning","mr-2","font-weight-bolder","small"],
                    data: this.data
                }
            ]
        }
    }

    static staticActions( 
        opener: OpenerComponent,
        orderService : OrderService,
        orderId : string ) 
    {
        return {
            'viewOrder': () => 
            {
                const disposable = opener
                    .simpleModalService
                    .addModal(ViewOrderComponent,{orderId})
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

export class OrderModelWithItems extends OrderModel<CastedOrder>
{
    constructor(order: Order)
    {
        super(order,castWithItems)
    }
}


export class OrderModelWithoutItems extends OrderModel<CastedOrderWithoutItems>
{
    constructor(order: Order)
    {
        super(order,cast)
    }
}