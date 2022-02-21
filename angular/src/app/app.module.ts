import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { FooterComponent} from './footer.component';
import { HeaderComponent } from './header.component';
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
import { NavComponent } from './nav.component';
import { SimpleModalModule } from 'ngx-simple-modal';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AppComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    ServerListModule,
    ShoppingListModule,
    RecipesModule,
    GameModule,
    HttpClientModule,
    SharedModule,
    SimpleModalModule.forRoot(
      {container:document.body},
      {
        closeOnEscape: true,
        closeOnClickOutside: true,
        wrapperDefaultClasses: 'modal o-modal o-modal--fade',
        wrapperClass: 'modal o-modal--fade-in',
        animationDuration: 300,
        autoFocus: true,
        draggable: false,
        draggableClass: 'modal draggable',
        bodyClass:'modal-open'
      }
    ),
    RouterModule.forRoot([]),
    AuthModule
  ],
  providers: [
    Services.CommunicationService,
    Services.AuthenticationService,
    Services.HttpService,
    Services.RequestService,
    Guards.isAuthenticatedGuard,
    Interceptors.isAuthenticatedInterceptor
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
