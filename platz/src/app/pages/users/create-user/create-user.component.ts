import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/core/services/user-service.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  userForm !: FormGroup;
  displayMessage: any;
  @Input() id !: number;
  @Input() userId !: number;
  ProductData: any;
  product: any;
  user: any;
  isAvailable!: boolean;
  checkAvailabilityUser!: boolean;
  constructor(private fb: FormBuilder,public activeModal: NgbActiveModal,private userService: UserService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      avatar: [''],
  });
 this.getUser();
  }
  getUser() {
    this.userService.getUserDetail(this.userId).subscribe({
      next: (data: any) => {
        this.user = data;
        this.userForm.controls['name'].setValue(this.user.name);
        this.userForm.controls['email'].setValue(this.user.email);
        this.userForm.controls['password'].setValue(this.user.password);
        this.userForm.controls['avatar'].setValue(this.user.avatar);
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  } 
  onSubmit() {
   if (!this.userId) {
      this.userService.createUser(this.userForm.value).subscribe((result:any) => {
        this.closeModal();
    }, error => {
        this.displayMessage = error;
    });
   }
    else{
      this.userService.updateUser(this.userId,this.userForm.value).subscribe((result:any) => {
        this.closeModal();
    }, (error:any) => {
        this.displayMessage = error;
    });
    }
 
}
checkAvailability(){
  let email = this.userForm.value.email;
  this.userService.userAvailability({email}).subscribe((result:any) => {
    this.checkAvailabilityUser = true;
    this.isAvailable = result;
}, (error:any) => {
    
});
}
closeModal() {
  this.activeModal.close('close modal');
}
}
