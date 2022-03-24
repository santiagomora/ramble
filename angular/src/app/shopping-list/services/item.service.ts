import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { RequestService } from "src/services";
import { FetchResponse, Item, PlainHttpOptions } from "src/types";
import { ShoppingService } from "./shopping.service";

@Injectable()
export class ItemService
{
    constructor(
        private shoppingService : ShoppingService,
        private requestService : RequestService )
    {}

    get request():RequestService
    {
        return this.requestService
    }

}