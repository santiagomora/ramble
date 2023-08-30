import { Component, Input } from '@angular/core';
import { ServerService } from '../services/server.service';
import { ServerFormControl } from './form/server.form';

@Component({
  selector: 'add-server-form',
  templateUrl: './templates/add-server.template.html'
})
export class AddServerFormComponent
{
  noServerCreated: boolean = false; 
  displaySuccess: boolean = false;
  @Input() onAddServer: any;
  formControl: ServerFormControl;

  constructor(
    public serverService: ServerService )
  {
    this.formControl = new ServerFormControl()
  }

  cleanAll()
  {
    this.displaySuccess=false;
  }

  submitServer = ( ev:Event ) => 
  {
    ev.preventDefault();
    this.noServerCreated = true;
    this.displaySuccess = true;
    this.serverService.addServer(this.formControl.value)
    setTimeout(() => this.cleanAll(),1000)
  }
}
