import { Router } from "@angular/router";
import { SimpleModalService } from "ngx-simple-modal";
import { RecipeService } from "src/app/recipes/services/recipe.service";

export interface OpenerComponent {
    simpleModalService: SimpleModalService;
    fetchData : () => any
}

export interface RecipeOpener {
    fetchData : (...args:any[]) => any,
    recipeService: RecipeService,
    router: Router,
    simpleModalService : SimpleModalService
}