import {Component, OnInit} from '@angular/core';
import {IWorkDTO} from "../../entity/IWorkDTO";
import {WorkService} from "../work.service";
import {Router} from "@angular/router";
import {AlertService} from "../alert.service";

@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.scss']
})
export class WorkListComponent implements OnInit {

  indexPagination: number = 1;
  sizePagination: number = 10;
  totalPagination: number = 1;
  works: IWorkDTO[] = [];
  listWorkNotPagination: IWorkDTO[] = [];

  constructor(private workService: WorkService, private router: Router,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.workService.getAllWork(this.indexPagination, this.sizePagination, "workName", "false").subscribe((data: IWorkDTO[]) => {
      this.works = data;
    });

    this.workService.getAllWorkNotPagination().subscribe((data: IWorkDTO[]) => {

      this.listWorkNotPagination = data;

      if ((this.listWorkNotPagination.length % 10) != 0) {
        this.totalPagination = (Math.round(this.listWorkNotPagination.length / 10)) + 1;
      }
    })
  }

  indexPaginationChange(value: number) {
    this.indexPagination = value;
  }

  firtPage() {
    this.indexPagination = 0;
    this.ngOnInit();
  }

  nextPage() {
    this.indexPagination = this.indexPagination + 1;
    if (this.indexPagination >= this.totalPagination) {
      this.indexPagination = this.totalPagination - 1;
    }
    this.workService.getAllWork(this.indexPagination, this.sizePagination, "workName", "false").subscribe((data: IWorkDTO[]) => {
      this.works = data;
    })
  }

  prviousPage() {
    this.indexPagination = this.indexPagination - 1;
    if (this.indexPagination < 0) {
      this.indexPagination = 0;
      this.ngOnInit();
    } else {
      this.workService.getAllWork(this.indexPagination, this.sizePagination, "workName", "false").subscribe((data: IWorkDTO[]) => {
        this.works = data;
      })
    }
  }

  lastPage() {
    this.indexPagination = this.totalPagination - 1;
    this.workService.getAllWork(this.indexPagination, this.sizePagination, "workName", "false").subscribe((data: IWorkDTO[]) => {
      this.works = data;
    })
  }

  onClickDelete(id: string) {
    this.workService.deleteWorkDTO(id).subscribe(data => {
      this.ngOnInit()
      this.alertService.showMessage("Delete work successFull!");
    }, error => {
      this.alertService.showMessageErrors("Delete work Error!")
    })
  }

  onClickEdit(id: string) {
    this.workService.setFlagEdit(id);
    this.router.navigateByUrl('/work-create');
  }
}
