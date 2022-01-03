import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toast: ToastrService) { }
  showMessage(message: string | "undefined"){
    this.toast.success(message, "Notification:");
  }

  showMessageErrors(message: string | "undefined"){
    this.toast.error(message, "Notification:")
  }
}
