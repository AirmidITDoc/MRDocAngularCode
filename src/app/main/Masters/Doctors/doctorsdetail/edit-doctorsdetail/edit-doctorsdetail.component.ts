import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { DoctordetailService } from '../doctordetail.service';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-edit-doctorsdetail',
  templateUrl: './edit-doctorsdetail.component.html',
  styleUrls: ['./edit-doctorsdetail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class EditDoctorsdetailComponent implements OnInit {

  QualificationList: any = [];
  SpecializationList: any = [];
  CityList: any = [];
  DoctorId: any;
  DoctorCode: any;
  DoctorName: any;
  Qualification: any;
  Specialization: any;
  Frequency: any;
  CityId: any;
  Address: any;
  MobileNo: any;
  DOB: any;
  Today = [new Date().toISOString()];


  // City filter
  public CityFilterCtrl: FormControl = new FormControl();
  public filteredcity: ReplaySubject<any> = new ReplaySubject<any>(1);


  private _onDestroy = new Subject<void>();


  options = [];


  matDialogRef: any;

  constructor(public _DoctordetailService: DoctordetailService,

    private formBuilder: FormBuilder,
    private accountService: AuthenticationService,
    // public notification: NotificationServiceService,
    public _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditDoctorsdetailComponent>,
    private _snackBar: MatSnackBar,
    public datePipe: DatePipe,
    private router: Router) { }


  ngOnInit(): void {

    if (this.data) {

      this.DoctorId = this.data.registerObj.DoctorId;
      this.DoctorCode = this.data.registerObj.DoctorCode;
      this.DoctorName = this.data.registerObj.DoctorName;
      this.Qualification = this.data.registerObj.Qualification;
      this.Specialization = this.data.registerObj.Specialization;

      this.Frequency = this.data.registerObj.Frequency;
      this.CityId = this.data.registerObj.CityId;
      this.Address = this.data.registerObj.Address;
      this.MobileNo = this.data.registerObj.MobileNo;
      this.DOB = this.data.registerObj.DOB;

    }
    console.log(this.data)

    this.getCityList();
    this.getQualificationList();
    this.getCityList();
    this.geSpecilazationList();


    this.CityFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCity();
      });



  }

  closeDialog() {
    console.log("closed")
    this.dialogRef.close();
    // this._DoctordetailService.DoctoraveForm.reset();
  }



  // get f() { return this._DoctordetailService.DoctoraveForm.controls }


  // City filter code
  private filterCity() {

    if (!this.CityList) {
      return;
    }
    // get the search keyword
    let search = this.CityFilterCtrl.value;
    if (!search) {
      this.filteredcity.next(this.CityList.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    // filter
    this.filteredcity.next(
      this.CityList.filter(bank => bank.AccountType.toLowerCase().indexOf(search) > -1)
    );
  }






  dateTimeObj: any;
  getDateTime(dateTimeObj) {
    console.log('dateTimeObj ==', dateTimeObj);
    this.dateTimeObj = dateTimeObj;
  }





  getCityList() {
    this._DoctordetailService.geCityList().subscribe(data => {
      this.CityList = data;
      this.filteredcity.next(this.CityList.slice());
      this.CityList.DoctoraveForm.get('CityId').setValue(this.CityList[0]);
    });
  }


  getQualificationList(){
    this._DoctordetailService.geQualificationList().subscribe(data => {
      this.QualificationList = data;
      // this.filteredcity.next(this.QualificationList.slice());
      this.CityList.DoctoraveForm.get('Qualification').setValue(this.QualificationList[0]);
    });
  }
  
  geSpecilazationList(){
    this._DoctordetailService.geSpecialList().subscribe(data => {
      this.SpecializationList = data;
      // this.filteredcity.next(this.QualificationList.slice());
      this.CityList.DoctoraveForm.get('Specialization').setValue(this.SpecializationList[0]);
    });
  }




  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {

    // this.isLoading = 'submit';

    console.log()


    var m_data = {

      "doctordetailUpdate": {
        "operation":"Update",
        "DoctorId": this.data.registerObj.DoctorID,
        "DoctorName": this._DoctordetailService.DoctoraveForm.get('DoctorName').value || '',
        "Qualification": this._DoctordetailService.DoctoraveForm.get('Qualification').value.QualifictionID || '',
        "Specialization": this._DoctordetailService.DoctoraveForm.get('Specialization').value.SpecializationId || '',
        "Frequency": this._DoctordetailService.DoctoraveForm.get('Frequency').value || 0,
        "CityId": this._DoctordetailService.DoctoraveForm.get('CityId').value.CityId || '',
        "Address": this._DoctordetailService.DoctoraveForm.get('Address').value || 0,
        "MobileNo": this._DoctordetailService.DoctoraveForm.get('MobileNo').value || 0,
        "DOB": this._DoctordetailService.DoctoraveForm.get('DOB').value || '01/01/1900',


        "UpdatedBy": this.accountService.currentUserValue.user.id,
      }
    }
    console.log(m_data);
    this._DoctordetailService.DoctorUpdate(m_data).subscribe(response => {
      if (response) {
        Swal.fire('Congratulations !', 'Doctor Master  Data  Updated Successfully !', 'success').then((result) => {
          if (result.isConfirmed) {
            this._matDialog.closeAll();

          }
        });
      } else {
        Swal.fire('Error !', 'Doctor Master Data  not saved', 'error');
      }

    });

  }


}

