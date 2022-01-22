import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { FooterComponent} from './footer.component';
import { HeaderComponent } from './header.component';
import { NavComponent } from './nav.component';
import { AppComponent } from './app.component';

import { ServerListModule } from './server-list/server-list.module';
import {ShoppingListModule} from './shopping-list/shopping-list.module'
import { GameModule } from './game/game.module';
import { RecipesModule } from './recipes/recipe.module';

import * as Services from 'src/services';
import * as Guards from 'src/services/guards';
import * as Interceptors from 'src/services/interceptors';
import { RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    ServerListModule,
    ShoppingListModule,
    RecipesModule,
    GameModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot([]),
    AuthModule
  ],
  providers: [
    Services.ShoppingService,
    Services.RecipeService,
    Services.LoggerService,
    Services.AuthenticationService,
    Services.HttpService,
    Guards.isAuthenticatedGuard,
    Interceptors.isAuthenticatedInterceptor
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
