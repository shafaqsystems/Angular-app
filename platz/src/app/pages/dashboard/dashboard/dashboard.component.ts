import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/core/services/user-service.service';
import { CreateProductComponent } from '../../categories/create-product/create-product.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  products: any;
  currentPage = 1;
  pageSize = 10;
  constructor( private userService: UserService,private router: Router,private modalService: NgbModal) { }
  loading!: boolean;
  ngOnInit(): void {
    this.getProduct(0, this.pageSize);
  }
  getProduct(offset?: any, limit?: any) {
    this.loading = true;
      this.userService.getProducts(offset, limit).subscribe({
        next: (data: any) => {
          this.products = data;
          this.loading = false;
        },
        error: (error: any) => {
          console.error(error);
        },
      });
    } 
    productDetail(product:any){
      this.router.navigate(['dashboard', 'detail'], {
        queryParams: {
          id: product.id,
        },
      });
    }
    pageChanged(newPage: number) {
      this.currentPage = newPage;
      const offset = (newPage - 1) * this.pageSize;
      this.getProduct(offset, 10);
    }
    editProduct(product?:any){
      const modalRef = this.modalService.open(CreateProductComponent, { centered: true });
      modalRef.componentInstance.productId = product.id;
      modalRef.result.then((result) => {
      }, (dismiss) => {
          this.getProduct();
      })
    }
}
