import { Component } from '@angular/core';

@Component({
  selector: 'recipes',
  template:`
    <div class="container-fluid">
        <div class="row">
            <div class="col-4">
              <div class="py-3" [ngStyle]="{backgroundColor:'var(--light)'}">
                <recipe-sidebar>
                </recipe-sidebar>
              </div>
            </div>
            <div class="col-8">
                <router-outlet>
                </router-outlet>
            </div>
        </div>
    </div>
  `
})
export class RecipesComponent
{}
