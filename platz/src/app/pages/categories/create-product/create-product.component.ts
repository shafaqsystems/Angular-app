import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/core/services/user-service.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  ProductForm !: FormGroup;
  displayMessage: any;
  @Input() id !: number;
  @Input() productId !: number;
  ProductData: any;
  product: any;
  constructor(private fb: FormBuilder,public activeModal: NgbActiveModal,private userService: UserService) { }

  ngOnInit(): void {
    this.ProductForm = this.fb.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      categoryId: [this.id],
      images: [''],
  });
 this.getProductDetail();
  }
  getProductDetail() {
    this.userService.getProductDetail(this.productId).subscribe({
      next: (data: any) => {
        this.product = data;
        this.ProductForm.controls['title'].setValue(this.product.title);
        this.ProductForm.controls['price'].setValue(this.product.price);
        this.ProductForm.controls['description'].setValue(this.product.title);
        this.ProductForm.controls['images'].setValue(this.product.images[0]);
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  } 
  onSubmit() {
    this.ProductForm.controls['images'].setValue([this.ProductForm.value.images])
   if (!this.productId) {
      this.userService.createProduct(this.ProductForm.value).subscribe((result:any) => {
        this.closeModal();
    }, error => {
        this.displayMessage = error;
    });
   }
    else{
      this.userService.updateProduct(this.productId,this.ProductForm.value).subscribe((result:any) => {
        this.closeModal();
    }, (error:any) => {
        this.displayMessage = error;
    });
    }
 
}
closeModal() {
  this.activeModal.close('close modal');
}
}
