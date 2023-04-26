import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { ReplaySubject, Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { CitydetailService } from '../citydetail.service';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-new-city',
  templateUrl: './new-city.component.html',
  styleUrls: ['./new-city.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class NewCityComponent implements OnInit {

  HeadQList:any=[];
  Today=[new Date().toISOString()];
  DailyAllowance:any;
  KiloMeter:any;
  CityName:any;

  // HeadQuarter filter
  public HeadquarterFilterCtrl: FormControl = new FormControl();
  public filteredheadquarter: ReplaySubject<any> = new ReplaySubject<any>(1);

  
  private _onDestroy = new Subject<void>();


  options = [];

  // @Input() childName: string[];
  // @Output() parentFunction: EventEmitter<any> = new EventEmitter();
  matDialogRef: any;

  constructor(public _CitydetailService: CitydetailService,
    
    private formBuilder: FormBuilder,
    private accountService: AuthenticationService,
    // public notification: NotificationServiceService,
    public _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NewCityComponent>,
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
   // this._CitydetailService.citysaveForm.reset();
  }
 


  // get f() { return this._CitydetailService.citysaveForm.controls }

 
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
  




  
  dateTimeObj: any;
  getDateTime(dateTimeObj) {
    console.log('dateTimeObj ==', dateTimeObj);
    this.dateTimeObj = dateTimeObj;
  }

 


 
  getHquaterList() {
    this._CitydetailService.geHeadquaterList().subscribe(data => {
      this.HeadQList = data;
      console.log(this.HeadQList);
      this.filteredheadquarter.next(this.HeadQList.slice());
      this.HeadQList.citysaveForm.get('HeadQuarterId').setValue(this.HeadQList[0]);
    });
  }



  

  onClose() {
    this.dialogRef.close();
  }

  onSubmit(){

    // this.isLoading = 'submit';

    console.log()
  
      
        var m_data = {
        
         

         "cityInsert":{
            "CityID": 0,
            "CityName": this._CitydetailService.citysaveForm.get('CityName').value || '',
            "HeadQuarterId": this._CitydetailService.citysaveForm.get('HeadQuarterID').value.HqId || '',
            "KiloMeter": this._CitydetailService.citysaveForm.get('KiloMeter').value || 0,
            "DailyAllowance": this._CitydetailService.citysaveForm.get('DailyAllowance').value || 0,
          
            "CreatedBy": this.accountService.currentUserValue.user.id,
            "UpdatedBy":this.accountService.currentUserValue.user.id,
                  }
        }
        console.log(m_data);
        this._CitydetailService.CityInsert(m_data).subscribe(response => {
          if (response) {
            Swal.fire('Congratulations !', 'City Master  Data  save Successfully !', 'success').then((result) => {
              if (result.isConfirmed) {
                this._matDialog.closeAll();

              }
            });
          } else {
            Swal.fire('Error !', 'City Master Data  not saved', 'error');
          }

        });
            
  }


}


