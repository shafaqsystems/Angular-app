import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/core/services/user-service.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  categoryForm !: FormGroup;
  displayMessage: any;
  @Input() id !: number;
  categoryData: any;
  constructor(private fb: FormBuilder,public activeModal: NgbActiveModal,private userService: UserService,public modalService: NgbModal) { }

  ngOnInit(): void {
    this.getCategoryDetail();
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]],
      image: [''],

  });
 
  }
  getCategoryDetail() {
    this.userService.getCategoryDetails(this.id).subscribe({
      next: (data: any) => {
        this.categoryData = data;
       this.categoryForm.controls['name'].setValue(this.categoryData.name);
       this.categoryForm.controls['image'].setValue(this.categoryData.image);
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  } 
  onSubmit() {
    if (!this.id) {
      this.userService.createCategory(this.categoryForm.value).subscribe((result:any) => {
        this.dismissModal();
    }, error => {
        this.displayMessage = error;
    });
    }else{
      this.userService.updateCategory(this.id,this.categoryForm.value).subscribe((result:any) => {
        this.dismissModal();
    }, error => {
        this.displayMessage = error;
    });
    }
 
}
dismissModal() {
  this.modalService.dismissAll('dissmiss modal');
}
}
