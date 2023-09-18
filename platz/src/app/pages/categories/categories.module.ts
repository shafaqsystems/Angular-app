import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CreateProductComponent } from './create-product/create-product.component';


@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryDetailComponent,
    CreateCategoryComponent,
    CreateProductComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class CategoriesModule { }
