import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MonthlytourService {

 
  myFilterform: FormGroup;
  productsaveForm: FormGroup;


  counter = 0;


  constructor(public _httpClient: HttpClient,
    public _formBuilder: FormBuilder
  ) {
    this.myFilterform = this.filterForm();
    this.productsaveForm = this.ProductsaveForm();
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

  ProductsaveForm(): FormGroup {
    return this._formBuilder.group({
      


      ProductId:'' ,
      ProductName:'',
      ProductManufacturer:'',
     
     
    });
  }


  public ProductInsert(employee) {
    return this._httpClient.post("InPatient/NewAdmissionSave", employee);
  }
  public ProductUpdate(employee) {
    return this._httpClient.post("InPatient/NewAdmissionUpdate", employee);
  }
  populateFormpersonal(employee) {
    this.productsaveForm.patchValue(employee);
  }
  //Doctor  List
  public getTourplaneDetails(Id) {
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_Tourplan", Id)
  }

  public geCityList(){
    return this._httpClient.post("Generic/GetByProc?procName=Retrieve_CityList", {})
  }

  public getMRCombo(){
    return this._httpClient.post("Generic/GetByProc?procName=Retrive_MRCombo", {})
  }
}
