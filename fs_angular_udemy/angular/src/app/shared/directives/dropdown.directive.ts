import { 
    Directive, 
    HostBinding, 
    HostListener, 
    OnInit } from "@angular/core";

@Directive({
    selector:"[dropdownMenu]"
})
export default class DropdownDirective implements OnInit
{
    @HostBinding('class.open')
    isOpen: boolean = false;

    buttonClicked: boolean = false;

    constructor(
        //private templateRef: TemplateRef<any>,
        //private viewContainerRef: ViewContainerRef,
        //private renderer: Renderer2
    )
    {}

    ngOnInit()
    {
  //      this.viewContainerRef.createEmbeddedView(this.templateRef)
    }
/*
    toggleDropdown()
    {
        if(this.display)
        {
            this.viewContainerRef.createEmbeddedView(this.templateRef)
            return
        }
        this.viewContainerRef.clear()
    }
*/
    @HostListener('click',['$event'])
    toggleButtonClicked = (ev: Event) => 
    {
        ev.stopPropagation();
        this.isOpen = !this.isOpen
        this.buttonClicked = true;
    }
    
    @HostListener('document:click',[])
    documentClicked = () => 
    {
        if (this.isOpen && this.buttonClicked)
        {
            this.isOpen = !this.isOpen
            this.buttonClicked = false;
        }
    }
}