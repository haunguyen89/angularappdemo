import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {WorkListComponent} from "./work-list/work-list.component";
import {WorkCreateComponent} from "./work-create/work-create.component";
// import {ImportAndExportModule} from "../import-and-export/import-and-export.module";
// import {AuthGuard} from "../security/auth.guard";


const routes: Routes = [
  {
    path: 'work-list', component: WorkListComponent
  },
  {
    path: 'work-create', component: WorkCreateComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class WorkRoutingModule {
}
