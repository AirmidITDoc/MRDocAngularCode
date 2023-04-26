import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { MRDetailsService } from '../../mrdetails.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-new-mrdetails',
  templateUrl: './new-mrdetails.component.html',
  styleUrls: ['./new-mrdetails.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class NewMRdetailsComponent implements OnInit {

  HeadQList:any=[];
  Today=[new Date().toISOString()];
  Password:any;
  MrName:any;
  MobileNo:any;
  HqId:any;
  IdentityNo:any;
  DailyAllowance:any;
  FuelRate:any;
  Address:any
  EmailId:any;
  UserName:any;
  MrId:any;


   // HeadQuarter filter
   public HeadquarterFilterCtrl: FormControl = new FormControl();
   public filteredheadquarter: ReplaySubject<any> = new ReplaySubject<any>(1);
 
  private _onDestroy = new Subject<void>();


  options = [];

  // @Input() childName: string[];
  // @Output() parentFunction: EventEmitter<any> = new EventEmitter();
  matDialogRef: any;

  constructor(public _MRDetailsService: MRDetailsService,
    
    private formBuilder: FormBuilder,
    private accountService: AuthenticationService,
    // public notification: NotificationServiceService,
    public _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NewMRdetailsComponent>,
    private _snackBar: MatSnackBar,
    public datePipe: DatePipe,
    private router: Router)  
    {}


  ngOnInit(): void {

    
  console.log(this.data)
 
    
  this.getHquaterList();
  
    this.HeadquarterFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterHeadQuarter();
      });


   
    
      
  }

  closeDialog() {
    console.log("closed")
     this.dialogRef.close();
   // this._MRDetailsService.mrsaveForm.reset();
  }
 


  // get f() { return this._MRDetailsService.mrsaveForm.controls }

 
  
  // Headquarter filter code
  private filterHeadQuarter() {

    if (!this.HeadQList) {
      return;
    }
    // get the search keyword
    let search = this.HeadquarterFilterCtrl.value;
    if (!search) {
      this.filteredheadquarter.next(this.HeadQList.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    // filter
    this.filteredheadquarter.next(
      this.HeadQList.filter(bank => bank.HqName.toLowerCase().indexOf(search) > -1)
    );
  }
  

  getHquaterList() {
    this._MRDetailsService.geHeadquaterList().subscribe(data => {
      this.HeadQList = data;
      console.log(this.HeadQList);
      this.filteredheadquarter.next(this.HeadQList.slice());
      this.HeadQList.citysaveForm.get('HeadQuarterId').setValue(this.HeadQList[0]);
    });
  }


  




  
  dateTimeObj: any;
  getDateTime(dateTimeObj) {
    console.log('dateTimeObj ==', dateTimeObj);
    this.dateTimeObj = dateTimeObj;
  }

 

 



  

  onClose() {
    this.dialogRef.close();
  }

  onSubmit(){

    // this.isLoading = 'submit';

  
      
        var m_data = {

         "meInsert":{
            "MrId": 0,
            "MrName": this._MRDetailsService.mrsaveForm.get('MrName').value || '',
            "Address": this._MRDetailsService.mrsaveForm.get('Address').value || '',
            "MobileNo": this._MRDetailsService.mrsaveForm.get('MobileNo').value || '',
            "EmailId": this._MRDetailsService.mrsaveForm.get('EmailId').value || 0,
            "HqId": this._MRDetailsService.mrsaveForm.get('HeadQuarterID').value.HqId || 0,
            "UserName": this._MRDetailsService.mrsaveForm.get('UserName').value || 0,
            "Password":  this._MRDetailsService.mrsaveForm.get('Password').value || '',
            "IdentityNo": this._MRDetailsService.mrsaveForm.get('IdentityNo').value || '',
            "DailyAllowance": parseInt(this._MRDetailsService.mrsaveForm.get('DailyAllowance').value) || 0,
            "FuelRate": parseInt(this._MRDetailsService.mrsaveForm.get('FuelRate').value) || '',
          
            "CreatedBy": this.accountService.currentUserValue.user.id,
            "UpdatedBy":this.accountService.currentUserValue.user.id,
                  }
        }
        console.log(m_data);
        this._MRDetailsService.MRInsert(m_data).subscribe(response => {
          if (response) {
            Swal.fire('Congratulations !', 'MR Master  Data  save Successfully !', 'success').then((result) => {
              if (result.isConfirmed) {
                this._matDialog.closeAll();

              }
            });
          } else {
            Swal.fire('Error !', 'MR Master Data  not saved', 'error');
          }

        });
            
  }


}

