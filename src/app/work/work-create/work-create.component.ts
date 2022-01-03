import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WorkService} from "../work.service";
import {IWorkDTO} from "../../entity/IWorkDTO";
import {Router} from "@angular/router";
import {AlertService} from "../alert.service";

@Component({
  selector: 'app-work-create',
  templateUrl: './work-create.component.html',
  styleUrls: ['./work-create.component.css']
})

export class WorkCreateComponent implements OnInit {
  public formCreateWork: FormGroup | undefined;
  data = ''
  flagEdit = '0'
  works: IWorkDTO[] = [];
  workEdit = ''
  workName = ''
  dayStarting = ''
  dayEnding = ''
  workStatus = ''
  work: string[] = []

  constructor(private workService: WorkService, private router: Router,
              private alertService: AlertService) {
    this.work = []
    this.data = this.workService.getFlagEdit()
    this.workName = ''
    this.dayStarting = ''
    this.dayEnding = ''
    this.workStatus = ''

    this.work = this.data.split("/")
    if (this.work.length > 1) {
      this.flagEdit = '1';
      this.workName = this.work[1];
      this.dayStarting = this.work[2];
      this.dayEnding = this.work[3];
      if (this.work[4] == 'Planning')
        this.workStatus = '0';
      else if (this.work[4] == 'Doing') {
        this.workStatus = '1';
      } else {
        this.workStatus = '2';
      }
    } else {
      this.flagEdit = '0';
      this.workStatus = '0';
    }
  }

  validation_messages = {
    nameWork: [
      {type: 'required', message: '- Please input Work name'},
      {type: 'minlength', message: '- Name required 8 character or more'},
      {type: 'pattern', message: '- Name same'}
    ],
    dayReceive: [
      {type: 'required', message: 'Please input Day'},
    ],
  };

  ngOnInit(): void {

  }

  save() {
    let wStatus = ''
    if (this.workStatus == '0') {
      wStatus = 'Planning';
    } else if (this.workStatus == '1') {
      wStatus = 'Doing';
    } else {
      wStatus = 'Complete';
    }
    this.formCreateWork = new FormGroup({
      workName: new FormControl(this.workName, [Validators.required]),
      startingDate: new FormControl(this.dayStarting),
      endingDate: new FormControl(this.dayEnding),
      status: new FormControl(wStatus)
    });
    if (this.flagEdit == '0') {
      // @ts-ignore
      this.workService.createWorkDTO(this.formCreateWork.value).subscribe(() => {
        this.router.navigateByUrl('work-list').then(r => this.alertService.showMessage("Add work successFull!"));
      }, error => {
        this.alertService.showMessageErrors("Add work Error!")
      })
    } else {
      // @ts-ignore
      this.workService.editWorkDTO(this.work[0], this.formCreateWork.value).subscribe(() => {
        this.router.navigateByUrl('work-list').then(r => this.alertService.showMessage("Edit work successFull!"));
      }, error => {
        this.alertService.showMessageErrors("Edit work Error!")
      })
    }
  }
}
