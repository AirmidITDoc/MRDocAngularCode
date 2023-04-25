
import { NewCityComponent } from './new-city/new-city.component';
import { EditCityComponent } from './edit-city/edit-city.component';

import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import { DatePipe } from "@angular/common";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatTabsModule } from "@angular/material/tabs";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDividerModule } from "@angular/material/divider";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatStepperModule } from "@angular/material/stepper";
import { ReactiveFormsModule } from "@angular/forms";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatBadgeModule } from "@angular/material/badge";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NotificationServiceService } from 'app/core/notification-service.service';
import { CitydetailService } from './citydetail.service';
import { CityDetailComponent } from './city-detail.component';




const appRoutes: Routes = [

  {
    path: "**",
    component: CityDetailComponent
},

{
  // City
   path: "ADMIN/AddCity",
   loadChildren: () =>
  //  import("./invoice-list/invoice-list.module").then((m) => m.InvoiceListModule),
  CityDetailComponent
},

];
@NgModule({
  declarations: [CityDetailComponent,
    NewCityComponent,
    EditCityComponent
  ],
  imports: [
    RouterModule.forChild(appRoutes),
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatRadioModule,
    MatTabsModule,
    MatCardModule,
    MatDividerModule,  
    MatProgressSpinnerModule,
    FuseSharedModule,
    FuseConfirmDialogModule,
    FuseSidebarModule,
    MatDialogModule,
    MatGridListModule,
    MatSnackBarModule,
    MatSlideToggleModule ,
    MatDividerModule,
    MatDialogModule,
    FuseSharedModule,
    FuseConfirmDialogModule,
    FuseSidebarModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    FuseSharedModule,
    
    NgxMatSelectSearchModule,
    MatBadgeModule,
    MatTooltipModule,
    MatExpansionModule
        
    ],
    providers: [
      CitydetailService,
        NotificationServiceService,
        DatePipe
    ],
    entryComponents: [
      CityDetailComponent,
        NotificationServiceService
    ]
})
export class CitydetailModule { }
