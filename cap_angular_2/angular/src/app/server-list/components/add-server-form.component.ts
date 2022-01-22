import { Component, Input, OnInit } from '@angular/core';
import { ServerFormControl } from './form/server.form';
import { ServerService } from 'src/services';

@Component({
  selector: 'add-server-form',
  templateUrl: './templates/add-server.template.html'
})
export class AddServerFormComponent implements OnInit 
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

  ngOnInit(): void { }

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
