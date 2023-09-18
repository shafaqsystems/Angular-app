import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/core/services/user-service.service';
import { CreateCategoryComponent } from '../create-category/create-category.component';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  products: any;
  constructor( private userService: UserService,private router: Router,private modalService: NgbModal) { }
  loading!: boolean;
  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {
    this.loading = true;
      this.userService.getCategoryList().subscribe({
        next: (data: any) => {
          this.products = data;
          this.loading = false;
        },
        error: (error: any) => {
          console.error(error);
        },
      });
    } 
    categoryDetail(category:any){
      this.router.navigate(['categories', 'detail'], {
        queryParams: {
          id: category.id,
        },
      });
    }

    createCategory(category?:any){
      const modalRef = this.modalService.open(CreateCategoryComponent, { centered: true });
      modalRef.componentInstance.id = category.id;
      modalRef.result.then((result) => {
      }, (dismiss) => {
          this.getCategories();
      })
    }
    
}
