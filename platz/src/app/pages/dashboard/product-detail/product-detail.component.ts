import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user-service.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: any;
  productId: any;
  loading!: boolean;
  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  
      this.productId = this.route.snapshot.queryParams['id']
      this.getProductDetail();


  }
  getProductDetail() {
    this.loading = true;
    this.userService.getProductDetail(this.productId).subscribe({
      next: (data: any) => {
        this.product = data;
        this.loading = false;
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  } 
  
}
