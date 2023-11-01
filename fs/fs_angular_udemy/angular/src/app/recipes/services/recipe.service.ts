import { FetchResponse, PlainHttpOptions, Recipe } from "src/types";
import { Injectable } from "@angular/core";
//import { ShoppingService } from "./shopping.service";
import { Router } from "@angular/router";
import { HttpService } from "../../../services/http.service";
import { CommunicationService } from "../../../services/communication.service";
import { RequestService } from "src/services";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class RecipeService
{
    public recipeList = [];
    constructor( 
        private requestService: RequestService,
        public commService: CommunicationService )
    {}

    get intercom()
    {
        return this.commService.intercom
    }

    get request()
    {
        return this.requestService
    }

    reloadDependencies = () => {
        this.commService.notify('reloadRecipes')
    }

}