import { Directive, TemplateRef } from "@angular/core";

@Directive({
    selector:"[paginatedContent]"
})
export class PaginateContentDirective
{
    constructor(public paginatedRef: TemplateRef<unknown>) {}
}

@Directive({
    selector:"[conditionalContent]"
})
export class ConditionalContentDirective
{
    constructor(public conditionalRef: TemplateRef<unknown>) {}
}