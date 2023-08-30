import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { RequestService } from "src/services";
import { FetchResponse, PlainHttpOptions, Unit } from "src/types";
import { ShoppingService } from "./shopping.service";

@Injectable()
export class UnitService
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