import { Component, Input, OnInit } from '@angular/core';
import { CrudService } from 'src/app/common/services/crud.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {
  // @Input() Message: string;

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    console.log("download in progress")
  }
  doDownload():any{
    console.log("download button clicked")
    this.crudService.download().subscribe(
      response=>{
        console.log('response'); 
        
      },
     
    )
  }

}
