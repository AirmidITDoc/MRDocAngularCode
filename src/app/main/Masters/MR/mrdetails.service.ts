import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MRDetailsService {

 
  myFilterform: FormGroup;
  mrsaveForm: FormGroup;


  counter = 0;


  constructor(public _httpClient: HttpClient,
    public _formBuilder: FormBuilder
  ) {
    this.myFilterform = this.filterForm();
    this.mrsaveForm = this.MRsaveForm();
  }

  filterForm(): FormGroup {
    return this._formBuilder.group({
      Keyword: '',
      start: [new Date().toISOString()],
      end: [new Date().toISOString()],
    });
  }

  MRsaveForm(): FormGroup {
    return this._formBuilder.group({
     

      MrId:'' ,
      MrName:'',
      Address:'',
      EmailId:'',
      HqId:'',
      UserName:'',
      IdentityNo:'',
      MobileNo:'',
      FuelRate:'',
      Password:'',
      DailyAllowance:'',
      CityId:''
    });
  }


  public MRInsert(employee) {
    return this._httpClient.post("Master/MRInsert", employee);
  }
  public MRUpdate(employee) {
    return this._httpClient.post("Master/MRUpdate", employee);
  }
  populateFormpersonal(employee) {
    this.mrsaveForm.patchValue(employee);
  }
  //Doctor  List
  public getMRDetails(Id) {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_MRList", Id)
  }

  public geCityList(){
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_CityList", {})
  }
}
