import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CitydetailService {


  myFilterform: FormGroup;
 citysaveForm: FormGroup;


  counter = 0;


  constructor(public _httpClient: HttpClient,
    public _formBuilder: FormBuilder
  ) {
    this.myFilterform = this.filterForm();
    this.citysaveForm = this.CitysaveForm();
  }

  filterForm(): FormGroup {
    return this._formBuilder.group({
      Keyword: '',
      start: [new Date().toISOString()],
      end: [new Date().toISOString()],
    });
  }

  CitysaveForm(): FormGroup {
    return this._formBuilder.group({
     
      

      CityId:'' ,
      CityName:'',
      HeadQuarterID:'',
      DailyAllowance:'',
      HqId:'',
      KiloMeter:''
    });
  }


  public CityInsert(employee) {
    return this._httpClient.post("Master/CityInsert", employee);
  }
  public CityUpdate(employee) {
    return this._httpClient.post("Master/CityUpdate", employee);
  }
  populateFormpersonal(employee) {
    this.citysaveForm.patchValue(employee);
  }
  //Doctor  List
  public getCityDetails(Id) {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_CityList", Id)
  }

  public geHeadquaterList(){
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_HeadquaterCombo", {})
  }
}
