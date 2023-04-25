import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class StdTourplanService {

  myFilterform: FormGroup;
  toursaveForm: FormGroup;


  counter = 0;


  constructor(public _httpClient: HttpClient,
    public _formBuilder: FormBuilder
  ) {
    this.myFilterform = this.filterForm();
    this.toursaveForm = this.ToursaveForm();
  }

  filterForm(): FormGroup {
    return this._formBuilder.group({
      Keyword: '',
      MrId:'',
      PlaneYear:'',
      PlaneMonth:'',
      start: [new Date().toISOString()],
      end: [new Date().toISOString()],
    });
  }

  ToursaveForm(): FormGroup {
    return this._formBuilder.group({
      
      MRId:'',
      CityId:'',
      DoctorId:'',
      tourPlanId:'',
      mrId:'',
      planYear:'',
      planMonth:'',
      planDate:'',
      workingWith:'',
      activity:'',
      PastHistory:'',
      cityContoller:'',
      doctorContoller:'',
      PlaneDay:''
    });
  }


  public StdTourInsert(employee) {
    return this._httpClient.post("Master/MonthlyTourInsert", employee);
  }
  public StdTourUpdate(employee) {
    return this._httpClient.post("Master/MonthlyTourUpdate", employee);
  }
  populateFormpersonal(employee) {
    this.toursaveForm.patchValue(employee);
  }
  //Doctor  List
  public getTourplaneDetails(Id) {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_Tourplan", Id)
  }

  public geCityList1(){
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_CityList", {})
  }

  public getMRCombo(){
    return this._httpClient.post("Generic/GetByProc?procName=Retrive_MRCombo", {})
  }

  

  public getDoctorCombo(e){
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_DoctorbyCity", e)
  }

  public Docdata(){
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_DoctorbyCity1", {})
  }
}
