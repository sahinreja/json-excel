import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'exit';
  student:any;
  fileName = 'StudentExcel.xlsx'
  constructor(private http:HttpClient){
    this.getStudentData();
  }

  getStudentData(){
    this.http.get<any>('../assets/student.json').subscribe((res)=>{
      console.log(res);
      this.student = res;
    },
    (err)=>{
      console.log(err);
    })
  }

  export(){
    let el = document.getElementById('table')
    const worksheet: XLSX.WorkSheet =XLSX.utils.table_to_sheet(el);

    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    XLSX.writeFile(workbook, this.fileName);
  }

}
