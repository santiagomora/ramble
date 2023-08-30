import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'footer-component',
  template:`
    <footer class="container-fluid">
      <div class="row">
        <div class="col-12">
          <hr/>
          this is the footer!
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent implements OnInit 
{
 
  ngOnInit()
  {

  }
}
