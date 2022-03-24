import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggerService } from './services/logger.service';

import { FilterPipe, ReversePipe } from 'src/pipes';
import { ConditionalComponent } from './components/conditional.component'
import { ErrorBagComponent } from './components/error-bag.component'
import { LoggingComponent } from './components/logging.component'
import { PaginationComponent } from './components/pagination.component'
import { MessageComponent, MessageOutletComponent } from './components/message-outlet.component';
import { 
  DropdownDirective,
  ConditionalContentDirective, 
  PaginateContentDirective 
} from './directives';
import { ActionComponent } from './components/action.component';
import { NavigationStateResolver } from './services/resolver/navigation-state.resolver';

@NgModule({
  declarations: [
    ConditionalComponent,
    ErrorBagComponent,
    LoggingComponent,
    PaginationComponent,
    ConditionalContentDirective, 
    PaginateContentDirective,
    ActionComponent,
    ReversePipe,
    FilterPipe,
    DropdownDirective,
    MessageOutletComponent,
    MessageComponent
  ],
  imports:[
    CommonModule 
  ],
  exports: [
    ActionComponent,
    ConditionalComponent,
    ErrorBagComponent,
    LoggingComponent,
    PaginationComponent,
    ConditionalContentDirective, 
    PaginateContentDirective,
    ReversePipe,
    FilterPipe,
    DropdownDirective,
    MessageOutletComponent
  ],
  providers:[
    LoggerService,
    NavigationStateResolver
  ]
})
export class SharedModule { }
