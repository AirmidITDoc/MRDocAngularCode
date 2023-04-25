import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DoctordetailService {


  myFilterform: FormGroup;
  DoctoraveForm: FormGroup;


  counter = 0;


  constructor(public _httpClient: HttpClient,
    public _formBuilder: FormBuilder
  ) {
    this.myFilterform = this.filterForm();
    this.DoctoraveForm = this.DoctorsaveForm();
  }

  filterForm(): FormGroup {
    return this._formBuilder.group({
      Keyword: '',
      start: [new Date().toISOString()],
      end: [new Date().toISOString()],
    });
  }

  DoctorsaveForm(): FormGroup {
    return this._formBuilder.group({
      
      DoctorId:'' ,
      DoctorCode:'',
      DoctorName:'',
      Qualification:'',
      Specialization:'',
      Frequency:'',
      CityId:'',
      Address:'',
      MobileNo:'',
      DOB:[new Date().toISOString()],
      HqId:''
     
    });
  }


  public DoctorInsert(employee) {
    return this._httpClient.post("Master/DoctorInsert", employee);
  }
  public DoctorUpdate(employee) {
    return this._httpClient.post("Master/DoctorUpdate", employee);
  }
  populateFormpersonal(employee) {
    this.DoctoraveForm.patchValue(employee);
  }
  //Doctor  List
 

  public getDoctorDetails(Id){
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_DoctorList", Id)
  }

  public geCityList(){
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_CityList", {})
  }

  public geQualificationList(){
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_QualificationCombo", {})
  }

  public geSpecialList(){
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_SpecializationCombo", {})
  }
}
