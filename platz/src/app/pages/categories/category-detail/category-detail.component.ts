import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user-service.service';
import { CreateProductComponent } from '../create-product/create-product.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {
  categoryId: any;
  loading!: boolean;
  category: any;
constructor(private userService: UserService,private route: ActivatedRoute,private modalService: NgbModal){}
  ngOnInit(): void {
    this.categoryId = this.route.snapshot.queryParams['id']
    this.getCategoryDetail();
}

getCategoryDetail() {
  this.loading = true;
  this.userService.getCategoryDetails(this.categoryId).subscribe({
    next: (data: any) => {
      this.category = data;
      this.loading = false;
    },
    error: (error: any) => {
      console.error(error);
    },
  });
} 
createProduct(){
  const modalRef = this.modalService.open(CreateProductComponent, { centered: true });
  modalRef.componentInstance.id = this.categoryId;
  modalRef.result.then((result) => {
  }, (dismiss) => {
      //this.getCategories();
  })
}
}
