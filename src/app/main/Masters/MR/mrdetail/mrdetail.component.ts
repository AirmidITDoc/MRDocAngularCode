import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { DatePipe } from '@angular/common';
import { MRDetailsService } from '../mrdetails.service';
import { NewMRdetailsComponent } from './new-mrdetails/new-mrdetails.component';
import { EditMRdetailsComponent } from './edit-mrdetails/edit-mrdetails.component';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-mrdetail',
  templateUrl: './mrdetail.component.html',
  styleUrls: ['./mrdetail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class MRDetailComponent implements OnInit {

  sIsLoading: string = '';
  dData1:any;
  // dataArray = {};

  
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @Input() dataArray: any; 

  displayedColumns = [
   
    'MrId',
    'MrName',
    'MobileNo',
    'HqName',
    'IdentityNo',
    'DailyAllowance',
    'FuelRate',
   
   'action',
  //  'buttons'
  ];
  dataSource = new MatTableDataSource<MRDetail>();
  menuActions:Array<string> = [];
  
  

  
  constructor(private _fuseSidebarService: FuseSidebarService,
    public _MRDetailsService: MRDetailsService,
    public datePipe: DatePipe,
    public _matDialog: MatDialog) { }

  ngOnInit(): void {
    this.sIsLoading = 'loading-data';
    var D_data = {
      "Keyword": this._MRDetailsService.myFilterform.get("Keyword").value || 1,
     
    }
    // console.log('itinit');
    this.dData1 = D_data;
    this._MRDetailsService.getMRDetails(D_data).subscribe(Visit => {
      this.dataArray = Visit;
      console.log(this.dataArray)
      this.sIsLoading = '';
    },
      error => {
        this.sIsLoading = '';
      });
  }


  getMRList() {
    debugger;
    this.sIsLoading = 'loading-data';
    var D_data = {
      "Keyword": this._MRDetailsService.myFilterform.get("Keyword").value || "0",
    
    }
    console.log(D_data);

    this._MRDetailsService.getMRDetails(D_data).subscribe(Visit => {
      this.dataArray = Visit;
      console.log(this.dataArray);
      this.sIsLoading = '';
    },
      error => {
        this.sIsLoading = '';
      });
  }

  NewMR() {
    const dialogRef = this._matDialog.open(NewMRdetailsComponent,
      {
        maxWidth: '50%',
        height: '60%', 
        width: '100%'
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this._MRDetailsService.getMRDetails(this.dData1).subscribe(Visit => {
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
  this._MRDetailsService.myFilterform.reset(
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
 


    "MrId":row.MrId,
    "MrName":row.MrName,
    "MobileNo":row.MobileNo,
    "HqName":row.HqName,
    "IdentityNo":row.IdentityNo,
     "DailyAllowance":row.DailyAllowance,
    "FuelRate":row.FuelRate,
    "Password":row.Password,
  "UserName":row.UserName,
   
  }

  console.log(m_data);
  this._MRDetailsService.populateFormpersonal(m_data);
  
  const dialogRef = this._matDialog.open(EditMRdetailsComponent, 
    {   maxWidth: "50%",
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

// MrId, MrCode, MrName, Address, MobileNo, EmailId, HqId, UserName, IdentityNo, DailyAllowance, FuelRate


export class MRDetail
{
  MrId : Number;
  MrName : any;
  Address : any;
  MobileNo : any;
  EmailId : any;
  HqName : any;
  UserName : any;
  IdentityNo : any;
  DailyAllowance : any;
  FuelRate : any;
    /**
     * Constructor
     *
     * @param RegInsert
     */
     
     constructor(MRDetail) {
        {
     
            this.MrId = MRDetail.MrId || '';
           this.MrName = MRDetail.MrName || '';
           this.Address = MRDetail.Address || '';
           this.MobileNo = MRDetail.MobileNo || '';
           this.EmailId = MRDetail.EmailId || '';
           this.HqName = MRDetail.HqName || '';
           this.UserName = MRDetail.UserName || '';
           this.IdentityNo = MRDetail.IdentityNo || '';
           this.DailyAllowance = MRDetail.DailyAllowance || '';
           this.FuelRate = MRDetail.FuelRate || '';
        }
    }
}