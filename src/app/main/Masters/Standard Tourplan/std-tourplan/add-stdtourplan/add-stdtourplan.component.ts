import { Component, Directive, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { StdTourplanService } from '../std-tourplan.service';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { concatAll, map, startWith, takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { COMMA, ENTER, I } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { debug } from 'console';
import { yearsPerPage } from '@angular/material/datepicker';



export interface TouplanTable {

  days1: any;
  CityId: any;
  DoctorId: any;

  isLocallyAdded: boolean


}


@Component({
  selector: 'app-add-stdtourplan',
  templateUrl: './add-stdtourplan.component.html',
  styleUrls: ['./add-stdtourplan.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class AddStdtourplanComponent implements OnInit {



  isRowAdded: boolean = false;
  CityList: any = [];
  Dignosflist: any = [];

  MrName: any;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  Cityflist: any = [];
  //  Seldoctorflist: any = [];
  public Seldoctorflist = [];

  allCity: CityClass[] = [];
  citySelected: any[] = [];
  citySelected1: any[] = [];
  filteredCity: Observable<CityClass[]>;
  CityId: any;
  doctorSelected: any[] = [];
  doctorSelected1: any[] = [];
  filteredDoctor: Observable<DoctorClass[]>;
  allDoctor: DoctorClass[] = [];

  TourplantableData: TouplanTable[] = [];
  selectable = true;
  // selectable1 = true;
  removable = true;
  Today: any;
  Days: number = 1;
  Doctorselect1: any;
  y = 0;
  y1 = 0;
  externalPartiesForm: FormGroup;
  displayColumns: string[] = [
    'days1',
    'CityId',
    'DoctorId',


    'action'
  ];

  dataSource = new MatTableDataSource<TouplanTable>();

  @ViewChild('cityInput') cityInput: ElementRef<HTMLInputElement>;
  @ViewChild('doctornput') doctornput: ElementRef<HTMLInputElement>;
  @ViewChildren(MatTable) _matTables;

  options = []; z


  matDialogRef: any;

  constructor(public _StdTourplanService: StdTourplanService,
    private fb: FormBuilder,

    private formBuilder: FormBuilder,
    private accountService: AuthenticationService,
    public _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddStdtourplanComponent>,
    private _snackBar: MatSnackBar,
    public datePipe: DatePipe,
    private router: Router) {

  }


  ngOnInit(): void {
    this.doctorSelected1 = [];
    this.Today = new Date().toISOString();
    this.citySelected1 = [];
    if (this.data) {
      this.MrName = this.data.registerObj.MRId;


    }


    this.addEmptyRow();
    this.getCityList();
    // this.getDoctorList();


    this.filteredCity = this._StdTourplanService.toursaveForm.get('cityContoller').valueChanges.pipe(
      startWith(''), map((ele: any | null) => ele ? this._filterCity(ele) : this.allCity.slice()));


    // this.filteredDoctor = this._StdTourplanService.toursaveForm.get('doctorContoller').valueChanges.pipe(
    //   startWith(''),
    //   map((ele: any | null) => ele ? this._filterDiagnosis(ele) : this.allDoctor.slice()));

  }





  addChips(event: any, itemList, controller): void {

    const value = (event.value || '').trim();
    if (value) {
      itemList.push(value);
    }
    // event.chipInput!.clear();
    this._StdTourplanService.toursaveForm.get(controller).setValue(null);
  }



  remove(item: any, itemList): void {


    const index = itemList.indexOf(item);

    if (index >= 0) {
      itemList.splice(index, 1);
    }

    this.citySelected = itemList;

    let l = this.citySelected.length
    this.doctorSelected.length = 0;
    debugger;


    for (let i = 0; i < l; i++) {
      if (this.allCity[i].CityName == this.citySelected[i]) {

        this.citySelected1[this.y1] = this.allCity[i].CityId;
        this.y1 = +1;
        console.log(this.allCity[i].CityId);
        this.CityId = this.allCity[i].CityId;
        console.log(this.citySelected1);
      }
    }



  }



  removeD(item: any, itemList): void {

    this.doctorSelected1 = [];
    console.log(itemList);
    const index = itemList.indexOf(item);

    if (index >= 0) {
      itemList.splice(index, 1);
    }

    this.doctorSelected = itemList;
    console.log(this.doctorSelected);

    let l = this.doctorSelected.length

    if (l > 0) {
      for (let p = 0; p < l; p++) {
        // this.doctorSelected.push(this.allDoctor[p].DoctorName);
        if (this.allDoctor[p].DoctorName == this.doctorSelected[p])
          this.doctorSelected1.push(this.allDoctor[p].DoctorId);
      }

    }
    console.log(this.doctorSelected1);

  }

  selected(event: MatAutocompleteSelectedEvent, itemList, controller, inputItem): void {
    this.Cityflist = [];
    console.log(itemList);
    console.log(event.option.value);

    if (itemList.length == 0) {
      itemList.push(event.option.value);
    }
    else {

      // console.log(itemList);
      // console.log(this.Cityflist);
      // this.Cityflist = itemList;
      // console.log(this.Cityflist);

      let k = itemList.length;

      for (let d = 0; d < k; d++) {
      
        if (itemList[d] != event.option.value)
          itemList.push(event.option.value);

        break;
      }

      console.log(itemList);
      this.Cityflist = itemList;
    


      let l = this.Cityflist.length - 1
      let l1 = this.allCity.length - 1
      let CityName = this.Cityflist[l]
      console.log(CityName);


      debugger;
      this.citySelected1[this.y]=itemList[0].CityId;
      this.y=+1;


      for (let i = 0; i < l1; i++) {
        if (this.allCity[i].CityName == CityName) {
          debugger
          this.citySelected1[this.y] = this.allCity[i].CityId;
          this.y = +1;
          this.CityId = this.allCity[i].CityId;

        }
      }


      console.log(this.citySelected1);
    }
    this.getDoctorList();


    this._StdTourplanService.toursaveForm.get(controller).setValue(null);

  }

  selectedD(event: MatAutocompleteSelectedEvent, itemList, controller, inputItem): void {

    console.log(event);
    debugger

    // if (itemList.length == 0) {
    //   itemList.push(event.option.value);
    // }
    // else {
    // this.allDoctor.forEach(element => {
    //   if (element != event.option.value) {
    //     itemList.push(event.option.value);

    //     this.Dignosflist = itemList;
    //     console.log(this.Dignosflist);
    //   }
    // });

    let l = this.allDoctor.length

    for (let j = 0; j < l; j++) {
      itemList.push(this.allDoctor[j].DoctorName)
      console.log(this.allDoctor[j].DoctorName);
      // }
      console.log(itemList);
    }




    if (inputItem == 'doctornput') {
      this.doctornput.nativeElement.value = '';
    }

    this._StdTourplanService.toursaveForm.get(controller).setValue(null);
  }





  casePaperData: CityClass = new CityClass({}); cityStringsArr
  CityClass() {
    this._StdTourplanService.Docdata().subscribe((data: CityClass) => {
      this.casePaperData = data[0];
      console.log(this.casePaperData);
    });
  }



  getCityList() {

    this._StdTourplanService.geCityList1().subscribe((data: any) => {
      this.allCity = data;
      this.casePaperData = data[0];
      debugger;
      console.log(this.casePaperData);
      console.log(this.allCity);


      let cityStringsArr = this.casePaperData.CityName.split(',');
      // let cityStringsArr=[];

      console.log(cityStringsArr);
      this.allCity.forEach((elementHist, index) => {
        cityStringsArr.forEach(elementRetrieve => {
          if (elementHist.CityName == elementRetrieve) {
            this.citySelected.push(elementHist.CityName);
            this.citySelected1.push(elementHist.CityId);
          }
        });
      });
    });
    console.log(this.citySelected);
    console.log(this.citySelected1);
  }

  // casePaperData1: DoctorClass = new DoctorClass({});

  getDoctorList() {
    debugger;
    this.doctorSelected = this._StdTourplanService.toursaveForm.get('DoctorId').value;
    console.log(this.doctorSelected);


    // let a = this.allDoctor.length;
    // if (a > 0) {
    //   for (let m = 0; m < a; m++) {
    //     this.doctorSelected = this.allDoctor[m].DoctorName;
    //   }
    // }


    var m = {
      "CityId": this.CityId
    }
    this._StdTourplanService.getDoctorCombo(m).subscribe((data: any) => {
      this.allDoctor = data;
      console.log(this.allDoctor);

      let l = this.allDoctor.length;

      if (this.allDoctor.length > 0) {
        for (let p = 0; p < l; p++) {
          this.doctorSelected.push(this.allDoctor[p].DoctorName);
          this.doctorSelected1.push(this.allDoctor[p].DoctorId);
        }


        console.log(this.doctorSelected);
        console.log(this.doctorSelected1);
      }


      this._StdTourplanService.toursaveForm.get('DoctorId').setValue(this.doctorSelected);

      // this._StdTourplanService.toursaveForm.patchValue(this.Seldoctorflist);

      // });
      // this.Doctorselect1.patchValue(this.Seldoctorflist);

      // debugger;
      // let dignosStringsArr = this.casePaperData.DoctorName.split(',');
      // this.allDoctor.forEach((elementDionos, index) => {
      //   dignosStringsArr.forEach(elementRetrieve => {
      //     if (elementDionos.DoctorName == elementRetrieve) {
      //       this.doctorSelected.push(elementDionos.DoctorName);
      //     }
      //   });
      // });
    });


  }




  private _filterCity(value: any) {
    debugger
    const filterValue = (value && value.CityName) ? value.CityName.toLowerCase() : value.toLowerCase();
    // console.log(this.allCity.filter(ele => ele.CityName.toLowerCase().includes(filterValue)));
    return this.allCity.filter(ele => ele.CityName.toLowerCase().includes(filterValue));

  }




  addEmptyRow(element?: TouplanTable) {


    // for (let i = 0; i < 25; i++) {
    console.log(element);


    if (element) {
      this.isRowAdded = true;
      this.TourplantableData && this.TourplantableData.length > 0 ? this.TourplantableData.splice(this.TourplantableData.indexOf(element), 1) : '';

    }

    let addingRow1 = {
      days1: element && element.days1 ? element.days1 : '',
      CityId: element && element.CityId ? element.CityId : '',
      DoctorId: element && element.DoctorId ? element.DoctorId : '',

      isLocallyAdded: element ? true : false
    }
    this.TourplantableData.push(addingRow1);
    this.dataSource.data = this.TourplantableData;

    element ? this.addRow() : '';

    // }


    // Swal.fire(this.citySelected.join(','))
  }

  addRow() {
    // debugger;
    let addingRow1 = {
      days1: '',
      CityId: '',
      DoctorId: '',

      isLocallyAdded: false
    }

    this.TourplantableData.push(addingRow1);
    this.dataSource.data = this.TourplantableData;

    // this.addEmptyRow();
  }

  onDelete(element) {
    let index = this.TourplantableData.indexOf(element);
    if (index !== -1) {
      this.TourplantableData.splice(index, 1);
    }
    this.dataSource.data = this.TourplantableData;
  }



  closeDialog() {
    console.log("closed")
    this.dialogRef.close();
    // this._StdTourplanService.toursaveForm.reset();
  }





  dateTimeObj: any;
  getDateTime(dateTimeObj) {
    console.log('dateTimeObj ==', dateTimeObj);
    this.dateTimeObj = dateTimeObj;
  }





  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {

    // this.isLoading = 'submit';

    console.log()


    var m_data = {


      "tourDetailInsert": {
        "tourPlanId": 0,
        "mrId": this._StdTourplanService.toursaveForm.get('MRId').value || '',
        "planYear": this._StdTourplanService.toursaveForm.get('planYear').value || '',
        "planMonth": this._StdTourplanService.toursaveForm.get('planMonth').value || '',
        "planDate": this._StdTourplanService.toursaveForm.get('PlaneDay').value || 0,
        "workingWith": this._StdTourplanService.toursaveForm.get('workingWith').value || '',
        "activity": this._StdTourplanService.toursaveForm.get('activity').value || '',
        "CreatedBy": this.accountService.currentUserValue.user.id,
        "UpdatedBy": this.accountService.currentUserValue.user.id,
      }
    }
    console.log(m_data);
    this._StdTourplanService.StdTourInsert(m_data).subscribe(response => {
      if (response) {
        Swal.fire('Congratulations !', 'Tour Plan  Data  save Successfully !', 'success').then((result) => {
          if (result.isConfirmed) {
            this._matDialog.closeAll();

          }
        });
      } else {
        Swal.fire('Error !', 'Tour Plan Master Data  not saved', 'error');
      }

    });

  }


  onSave() {

    if (this.TourplantableData.length == 0) {
      Swal.fire('Error !', 'Please add before save', 'error');
    }

    // debugger;
    let tourDetailInsert = {};
    tourDetailInsert['tourPlanId'] = 0;
    tourDetailInsert['mrId'] = this._StdTourplanService.toursaveForm.get('MRId').value || 0;
    tourDetailInsert['planYear'] = '';
    tourDetailInsert['planMonth'] = "";
    tourDetailInsert['planDate'] = this._StdTourplanService.toursaveForm.get('PlaneDay').value || '01/01/1900';

    // tourDetailInsert['workingWith'] = this.historySelected.join(',');
    tourDetailInsert['workingWith'] = this._StdTourplanService.toursaveForm.get('workingWith').value || '';

    tourDetailInsert['CreatedBy'] = this.accountService.currentUserValue.user.id;
    tourDetailInsert['UpdatedBy'] = this.accountService.currentUserValue.user.id;

    let tourCityDoctorDetails = [];
    // this.prescriptionData.length > 1 ? 
    debugger;
    this.TourplantableData.splice(this.TourplantableData.length - 1, 0);

    // this.diagnosisSelected.join(',');

    this.TourplantableData.forEach((element: any, index) => {
      let obj = {};
      obj['tourCityDocId'] = 0;
      obj['tourPlanId'] = 0;
      obj['cityId'] = this.citySelected1.join(',');
      obj['doctorId'] = this.doctorSelected1.join(',');//this._StdTourplanService.toursaveForm.get('DoctorId').value;//this.doctorSelected.join('');
      obj['createdBy'] = this.accountService.currentUserValue.user.id;
      obj['updatedBy'] = this.accountService.currentUserValue.user.id;


      tourCityDoctorDetails.push(obj);
    });

    console.log(tourCityDoctorDetails);
    let casePaperSaveObj = {};
    casePaperSaveObj['tourDetailInsert'] = tourDetailInsert;
    casePaperSaveObj['tourCityDoctorDetails'] = tourCityDoctorDetails;

    console.log(casePaperSaveObj);

    this._StdTourplanService.StdTourInsert(casePaperSaveObj).subscribe(response => {
      if (response) {
        Swal.fire('Congratulations !', 'Tour Plan  Data  save Successfully !', 'success').then((result) => {
          if (result.isConfirmed) {
            this._matDialog.closeAll();

          }
        });
      } else {
        Swal.fire('Error !', 'Tour Plan Master Data  not saved', 'error');
      }

    });



  }
}


export class CityClass {
  CityName: any;
  DoctorName: any;
  CityId: any;

  constructor(CityClass) {
    this.CityName = CityClass.CityName || '';
    this.DoctorName = CityClass.DoctorName || '';
    this.CityId = CityClass.CityId || '';
  }
}

export class DoctorClass {
  DoctorName: any;
  DoctorId: any;

  constructor(DoctorClass) {
    this.DoctorName = DoctorClass.DoctorName || '';
    this.DoctorId = DoctorClass.DoctorId || '';
  }
}

