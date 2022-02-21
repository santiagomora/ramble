import { Component, ContentChild, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PaginateContentDirective } from "../directives";
import { rangeHelper } from "src/helper";
import { Pagination } from "src/types";

@Component({
    selector: 'pagination-component',
    template:`
        <ng-container 
            [ngTemplateOutlet]="content.paginatedRef">
        </ng-container>
        <div class="container-fluid mt-2 px-0">
            <div class="row">
                <div class="col">
                    <input 
                        #paginationLimit
                        (change)="changeLimit(+paginationLimit.value)"
                        type="number" 
                        [value]="pagination.limit"
                        class="px-2 py-1"
                        [ngStyle]="{width:'70px',border:'solid 1px var(--light)'}">
                </div>
                <div class="col-auto text-right">
                    <ul class="m-0" [ngStyle]="{listStyle:'none'}">
                        <li 
                            *ngFor="let page of pages"
                            class="d-inline ml-1">
                            <button 
                                (click)="changePage(page)"
                                [disabled]="current===page-1">
                                {{page}}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `
})
export class PaginationComponent implements OnInit
{
    @ContentChild(PaginateContentDirective)
    content!: PaginateContentDirective;
    
    @Input() pagination: Pagination;

    @Input() loading: boolean;

    @Input() fetchData;

    pages : number[];

    get current(){
        return Math.ceil(this.pagination.skip/this.pagination.limit)
    }

    ngOnInit()
    {
        const {total,limit} = this.pagination||{};
        this.pages = rangeHelper(1,Math.ceil(total/limit))
    }

    changePage( page: number )
    {
        this.fetchData({skip:page-1,limit:this.pagination.limit})
    }

    changeLimit( limit: number )
    {
        if(limit)
        {
            this.fetchData({skip:this.pagination.skip,limit})
        } 
    }
}