import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunicationService, LoggerService } from 'src/services';

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

@NgModule({
  declarations: [
    ConditionalComponent,
    ErrorBagComponent,
    LoggingComponent,
    PaginationComponent,
    ConditionalContentDirective, 
    PaginateContentDirective,
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
    CommunicationService
  ]
})
export class SharedModule { }
