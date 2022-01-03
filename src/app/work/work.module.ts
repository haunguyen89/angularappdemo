import { NgModule } from '@angular/core';
import {WorkListComponent} from "./work-list/work-list.component";
import {WorkCreateComponent} from "./work-create/work-create.component";
import {WorkRoutingModule} from "./work-routing.module";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";




@NgModule({
  declarations: [WorkListComponent, WorkCreateComponent],
  exports: [
    WorkListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    WorkRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FormsModule
  ]
})
export class WorkModule { }
