import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Customer} from 'src/app/model/Customer.model';
import {CustomerService} from 'src/app/service/customer/customer.service';
import {UserService} from "../../service/user/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  optionsSelect: Array<any>;
  selected: any;
  customer: Customer = new Customer();
  isEditable: boolean = false;

  constructor(private customerService: CustomerService, private toaster: ToastrService,
              private _userService: UserService) {
  }

  ngOnInit(): void {
    this.isEditable = false;
    this.getCustomerProfile()
  }

  public update(customer: Customer) {
    this.customerService.updateCustomer(this.customer).subscribe((response: Customer) => {
      console.log(customer);
      this.isEditable = false;
    }, (error: HttpErrorResponse) => {
      this.toaster.error(error.message)
    });


  }

  public edit() {
    this.isEditable = true;
  }

  public cancel() {
    this.isEditable = false;
  }

  private getCustomerProfile() {
    this.customerService.getCustomer(this._userService.getUserId()).subscribe((response: Customer) => {
      this.customer = response;
    }, (error: HttpErrorResponse) => {
      this.toaster.error(error.message)
    });
  }
}