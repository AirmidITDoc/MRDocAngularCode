import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { DoctordetailService } from './doctordetail.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditDoctorsdetailComponent } from './edit-doctorsdetail/edit-doctorsdetail.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NewDoctorDetailsComponent } from './new-doctor-details/new-doctor-details.component';
import { fuseAnimations } from '@fuse/animations';
// import * as XLSX from 'xlsx';
// const jsPDF = require('jspdf');
@Component({
  selector: 'app-doctorsdetail',
  templateUrl: './doctorsdetail.component.html',
  styleUrls: ['./doctorsdetail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class DoctorsdetailComponent implements OnInit {
  sIsLoading: string = '';
  dData1:any;
  // dataArray = {};

  
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @Input() dataArray: any; 

  displayedColumns = [
   
   
    // 'DoctorId',
    // 'DoctorCode',
    'DoctorName',
    'DOB',
    'Qualification',
    'Specialization',
    'Frequency',
    'CityName',
    'Address',
    'MobileNo',
   
   'action',
  //  'buttons'
  ];
  dataSource = new MatTableDataSource<DoctorsDetail>();
  menuActions:Array<string> = [];
  
  

  
  constructor(private _fuseSidebarService: FuseSidebarService,
    public _DoctordetailService: DoctordetailService,
    public datePipe: DatePipe,
    public _matDialog: MatDialog) { }

  ngOnInit(): void {
    this.sIsLoading = 'loading-data';
    var D_data = {
      "Keyword": this._DoctordetailService.myFilterform.get("Keyword").value || 'a',
     
    }
    // console.log('itinit');
    this.dData1 = D_data;
    this._DoctordetailService.getDoctorDetails(D_data).subscribe(Visit => {
      this.dataArray = Visit;
      console.log(this.dataArray)
      this.sIsLoading = '';
    },
      error => {
        this.sIsLoading = '';
      });
  }


  getDoctorList() {
    debugger;
    this.sIsLoading = 'loading-data';
    var D_data = {
      "Keyword": this._DoctordetailService.myFilterform.get("Keyword").value || 0,
    
    }
    console.log(D_data);

    this._DoctordetailService.getDoctorDetails(D_data).subscribe(Visit => {
      this.dataArray = Visit;
      console.log(this.dataArray);
      this.sIsLoading = '';
    },
      error => {
        this.sIsLoading = '';
      });
  }

  NewDoctor() {
    const dialogRef = this._matDialog.open(NewDoctorDetailsComponent,
      {
        maxWidth: '70%',
        height: '60%', 
        width: '100%'
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this._DoctordetailService.getDoctorDetails(this.dData1).subscribe(Visit => {
        this.dataArray = Visit;
        console.log(this.dataArray)
        this.sIsLoading = '';
      },
      error => {
        this.sIsLoading = '';
      });
      // console.log('The dialog was closed - Insert Action', result);
      // this.getAdmittedPatientList();
    });
  }

  
onClear(){
  this._DoctordetailService.myFilterform.reset(
    {
      start: [],
      end: []
    }
  );
}

onClose(){}

onEdit(row){
console.log(row);
  var m_data = {
    
 

    "DoctorId":row.DoctorId,
    "DoctorCode":row.DoctorCode,
    "DoctorName":row.DoctorName,
    "Qualification":row.Qualification,
    "Specialization":row.Specialization,
    "Frequency":row.Frequency,
    "CityName":row.CityName,
    "Address":row.Address,
    "MobileNo":row.MobileNo,
    "DOB":row.DOB,
   
  }

  console.log(m_data);
  this._DoctordetailService.populateFormpersonal(m_data);
  
  const dialogRef = this._matDialog.open(EditDoctorsdetailComponent, 
    {   maxWidth: "70%",
        height: '60%',
        width: '100%',
         data : {
        registerObj : m_data,
      }
  });
  
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed - Insert Action', result);
    
  });
}


onExport(exprtType){}

// onExport(exprtType){
//   debugger;
//   let columnList=[];
//   if(this.dataSource.data.length == 0){
//     // this.toastr.error("No Data Found");
//     Swal.fire('Error !', 'No Data Found', 'error');
//   }
//   else{
//     var excelData = [];
//     var a=1;
//     for(var i=0;i<this.dataSource.data.length;i++){
//       let singleEntry = {
//         // "Sr No":a+i,
//         "Reg No" :this.dataSource.data[i]["RegNo"],
//         "Patient Name" :this.dataSource.data[i]["PatientName"] ? this.dataSource.data[i]["PatientName"]:"N/A",
//         "Date" :this.dataSource.data[i]["RegDate"] ? this.dataSource.data[i]["RegDate"] :"N/A",
//         "AgeYear" :this.dataSource.data[i]["AgeYear"] ? this.dataSource.data[i]["AgeYear"] : "N/A",
//         "GenderName" :this.dataSource.data[i]["GenderName"] ? this.dataSource.data[i]["GenderName"]:"N/A",
//         "PhoneNo" :this.dataSource.data[i]["PhoneNo"] ? this.dataSource.data[i]["PhoneNo"]:"N/A",
//         "MobileNo" :this.dataSource.data[i]["MobileNo"] ? this.dataSource.data[i]["MobileNo"]:"N/A",
//         "Address" :this.dataSource.data[i]["Address"] ? this.dataSource.data[i]["Address"]:"N/A",
       
//       };
//       excelData.push(singleEntry);
//     }
//     var fileName = "OutDoor-Patient-List " + new Date() +".xlsx";
//     if(exprtType =="Excel"){
//       const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(excelData);
//       var wscols = [];
//       if(excelData.length > 0){ 
//         var columnsIn = excelData[0]; 
//         for(var key in columnsIn){
//           let headerLength = {wch:(key.length+1)};
//           let columnLength = headerLength;
//           try{
//             columnLength = {wch: Math.max(...excelData.map(o => o[key].length), 0)+1}; 
//           }
//           catch{
//             columnLength = headerLength;
//           }
//           if(headerLength["wch"] <= columnLength["wch"]){
//             wscols.push(columnLength)
//           }
//           else{
//             wscols.push(headerLength)
//           }
//         } 
//       }
//       ws['!cols'] = wscols;
//       const wb: XLSX.WorkBook = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
//       XLSX.writeFile(wb, fileName);
//     }else{
//       let doc = new jsPDF('p','pt', 'a4');
//       doc.page = 0;
//       var col=[];
//       for (var k in excelData[0]) col.push(k);
//         console.log(col.length)
//       var rows = [];
//       excelData.forEach(obj => {
//         console.log(obj)
//         let arr = [];
//         col.forEach(col => {
//           arr.push(obj[col]);
//         });
//         rows.push(arr);
//       });
    
//       doc.autoTable(col, rows,{
//         margin:{left:5,right:5,top:5},
//         theme:"grid",
//         styles: {
//           fontSize: 3
//         }});
//       doc.setFontSize(3);
//       // doc.save("Indoor-Patient-List.pdf");
//       window.open(URL.createObjectURL(doc.output("blob")))
//     }
//   }
// }
}
// DoctorId, DoctorCode, DoctorName, Qualification, Specialization, Frequency, CityId, Address, MobileNo, DOB


export class DoctorsDetail
{
  DoctorId : Number;
  DoctorCode : any;
  DoctorName : any;
  Qualification : any;
  Specialization : any;
  Frequency : any;
  CityId : any;
  Address : any;
  MobileNo : any;
  DOB : any;
    /**
     * Constructor
     *
     * @param RegInsert
     */
     
     constructor(DoctorsDetail) {
        {
     
            this.DoctorId = DoctorsDetail.DoctorId || '';
           this.DoctorCode = DoctorsDetail.DoctorCode || '';
           this.DoctorName = DoctorsDetail.DoctorName || '';
           this.Qualification = DoctorsDetail.Qualification || '';
           this.Specialization = DoctorsDetail.Specialization || '';
           this.Frequency = DoctorsDetail.Frequency || '';
           this.CityId = DoctorsDetail.CityId || '';
           this.Address = DoctorsDetail.Address || '';
           this.MobileNo = DoctorsDetail.MobileNo || '';
           this.DOB = DoctorsDetail.DOB || '';
        }
    }
}