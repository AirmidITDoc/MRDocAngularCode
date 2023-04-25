import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MRDetailComponent } from './MR/mrdetail/mrdetail.component';
import { CityDetailComponent } from './City/city-detail/city-detail.component';
import { ProductDetailsComponent } from './Product/product-details/product-details.component';




const appRoutes: Routes = [

  {
    path: "AddMR",
    loadChildren: () => import("./MR/mrdetails.module").then((m) => m.MRDetailsModule),


    // loadChildren: () => import("./MonthlyTourPlan/monthlytour.module").then((m) => m.MonthlytourModule),
  },
  {
    path: "AddCity",
    loadChildren: () => import("./City/city-detail/citydetail.module").then((m) => m.CitydetailModule),

  },
  {
    path: "AddStandardTourPlan",
    loadChildren: () => import("./Standard Tourplan/stdtourplan.module").then((m) => m.StdtourplanModule),
  },


  {
    path: "AddDoctors",
    loadChildren: () => import("./Doctors/doctordetail.module").then((m) => m.DoctordetailModule),
  },

  {
    path: "ProductReport",
    loadChildren: () => import("./Product/product-details/productdetail.module").then((m) => m.ProductdetailModule),
  },

  {
    path: "ExpenseReport",
    loadChildren: () => import("./ExpenceReport/expence-report/expensereport.module").then((m) => m.ExpensereportModule),
  },

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(appRoutes),
  ]
})
export class MasterModule { }
