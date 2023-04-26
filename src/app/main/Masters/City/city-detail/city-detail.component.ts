import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { CitydetailService } from './citydetail.service';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { NewCityComponent } from './new-city/new-city.component';
import { EditCityComponent } from './edit-city/edit-city.component';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CityDetailComponent implements OnInit {

  sIsLoading: string = '';
  dData1:any;
  // dataArray = {};

  
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @Input() dataArray: any; 

  displayedColumns = [
    
    // 'CityId',
    
    'HeadQuarterID',
    'CityName',
    'KiloMeter',
    'DailyAllowance',
   'action',
  //  'buttons'
  ];
  dataSource = new MatTableDataSource<CityDetails>();
  menuActions:Array<string> = [];
  
  

  
  constructor(private _fuseSidebarService: FuseSidebarService,
    public _CitydetailService: CitydetailService,
    public datePipe: DatePipe,
    public _matDialog: MatDialog) { }

  ngOnInit(): void {
    this.sIsLoading = 'loading-data';
    var D_data = {
      "Keyword": this._CitydetailService.myFilterform.get("Keyword").value || "0",
     
    }
    console.log('itinit');
    this.dData1 = D_data;
    this._CitydetailService.getCityDetails(D_data).subscribe(Visit => {
      this.dataArray = Visit;
      console.log(this.dataArray)
      this.sIsLoading = '';
    },
      error => {
        this.sIsLoading = '';
      });


  }


  getCityList() {
    debugger;
    this.sIsLoading = 'loading-data';
    var D_data = {
      "Keyword": this._CitydetailService.myFilterform.get("Keyword").value || "0",
    
    }
    console.log(D_data);

    this._CitydetailService.getCityDetails(D_data).subscribe(Visit => {
      this.dataArray = Visit;
      console.log(this.dataArray);
      this.sIsLoading = '';
    },
      error => {
        this.sIsLoading = '';
      });
  }

  NewCity() {
    const dialogRef = this._matDialog.open(NewCityComponent,
      {
        maxWidth: '60%',
        height: '40%', 
        width: '100%'
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this._CitydetailService.getCityDetails(this.dData1).subscribe(Visit => {
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
  this._CitydetailService.myFilterform.reset(
    {
      start: [],
      end: []
    }
  );
}



onEdit(row){
console.log(row);
  var m_data = {
   

    
    "CityName":row.CityName,
    "HeadQuarterID":row.HeadQuarterID,
    "KiloMeter":row.KiloMeter,
    "DailyAllowance":row.DailyAllowance,
   
   
  }

  console.log(m_data);
  this._CitydetailService.populateFormpersonal(m_data);
  
  const dialogRef = this._matDialog.open(EditCityComponent, 
    {   maxWidth: "60%",
        height: '40%',
        width: '100%',
         data : {
        registerObj : m_data,
      }
  });
  
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed - Insert Action', result);
    this.getCityList();
  });
}

onClose(){}

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


export class CityDetails
{
  

  CityId : Number;
  CityName : any;
  HeadQuarterID : any;
  KiloMeter : any;
  DailyAllowance : any;
 
    /**
     * Constructor
     *
     * @param RegInsert
     */
     
     constructor(CityDetails) {
        {
     
            this.CityId = CityDetails.CityId || '';
           this.CityName = CityDetails.CityName || '';
           this.HeadQuarterID = CityDetails.HeadQuarterID || '';
           this.KiloMeter = CityDetails.KiloMeter || '';
           this.DailyAllowance = CityDetails.DailyAllowance || '';
        
        }
    }
}