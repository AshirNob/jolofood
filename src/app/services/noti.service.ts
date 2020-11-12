import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class NotiService {

  constructor(private toastr: ToastrService) { }
  showSuccess(message, title){
    this.toastr.success(message, title)
}

showError(message, title){
    this.toastr.error(message, title)
}

showInfo(message, title){
    this.toastr.info(message, title)
}

showWarning(message, title){
    this.toastr.warning(message, title)
}
showinfocart(message,title){
  this.toastr.info(message,title,{timeOut:2000,closeButton:true,positionClass:'toast-bottom-center'});
}

}
