import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CrudService } from 'src/app/common/services/crud.service';
import { ConfigService } from 'src/app/core/services/config.service';
import { NotificationServices } from 'src/app/core/services/notification-service.service';
import { credentials } from 'src/app/core/constant/credentials';
import { HttpResponse } from '@angular/common/http';
import * as saveAs from 'file-saver';


@Component({
  selector: 'app-download-screen',
  templateUrl: './download-screen.component.html',
  styleUrls: ['./download-screen.component.css']
})
export class DownloadScreenComponent implements OnInit {
  @ViewChild('f', { static: false }) form: NgForm;
  model: any = {}
  modelOneArray: any = [];
  screenIdList = []
  searchFromFilter: boolean = false;
  filters = ""
  name="Shaunak"
  myFileUploadService: any;

  constructor(private configService : ConfigService,
    private notificationServices: NotificationServices,
    private crudService: CrudService,) { }

  ngOnInit(): void {
    this.onRefresh()
  }

  onRefresh(){
    // this.model = {
    //   "ccode": null,  //1,
    //   "cname": "",  //"customer A"
    // }
    

    this.screenIdList = []
    this.getScreenList('');
  }

  getScreenList(name) {
    this.screenIdList = []
    this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_screenlist_to_id' + `${"?" + 'name='}` + name).subscribe(response => {
      
      this.screenIdList = response.data;
      
      var tempArr :any =[]
      // console.log(response.data);
      if(response.data){
        let i=0;
        response.data.forEach(element => { 
        tempArr.push({"code":element[0],"name":element[1]})
        // console.log(tempArr);
        this.screenIdList=tempArr;
        i++;
        });
        
      }
    }, (error) => {
      console.log("getRewsRoomListError=", JSON.stringify(error))
    });
  }
 
  // getData(name) {
  //   this.screenIdList = []
  //   this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_entity_file' + `${"?" + 'screenname='}` + name).subscribe(response => {
  //     console.log(response.data);
  //     let blob = new Blob([response.data], {
  //       type: "application/pdf"
  //   });
  //     saveAs(blob, name+'Entity.java');
  //     console.log('done');
     
  //   }, (error) => {
  //     console.log("getRewsRoomListError=", JSON.stringify(error))
  //   });

  //   this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_ts_file' + `${"?" + 'screenname='}` + name).subscribe(response => {
  //     console.log(response.data);
  //     let blob = new Blob([response.data], {
  //       type: "application/pdf"
  //   });
  //     saveAs(blob, name+'TS.ts');
  //     console.log('done');
     
  //   }, (error) => {
  //     console.log("getRewsRoomListError=", JSON.stringify(error))
  //   });

  

  //   this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_controller_file' + `${"?" + 'screenname='}` + name).subscribe(response => {
  //     console.log(response.data);
  //     let blob = new Blob([response.data], {
  //       type: "application/pdf"
  //   });
  //     saveAs(blob, name+'Controller.java');
  //     console.log('done');
     
  //   }, (error) => {
  //     console.log("getRewsRoomListError=", JSON.stringify(error))
  //   });

  //   this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_repo_file' + `${"?" + 'screenname='}` + name).subscribe(response => {
  //     console.log(response.data);
  //     let blob = new Blob([response.data], {
  //       type: "application/pdf"
  //   });
  //     saveAs(blob, name+'Repo.java');
  //     console.log('done');
     
  //   }, (error) => {
  //     console.log("getRewsRoomListError=", JSON.stringify(error))
  //   });

  //   this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_html_file' + `${"?" + 'screenname='}` + name).subscribe(response => {
  //     console.log(response.data);
  //     let blob = new Blob([response.data], {
  //       type: "application/pdf"
  //   });
  //     saveAs(blob, name+'HTML.html');
  //     console.log('done');
     
  //   }, (error) => {
  //     console.log("getRewsRoomListError=", JSON.stringify(error))
  //   });
  // }
   
   declare(name){
    this.name=name;
    console.log(this.name);
  }
 
  getData() {
    console.log(this.name);
    this.screenIdList = []
    this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_entity_file' + `${"?" + 'screenname='}` + this.name).subscribe(response => {
      console.log(response.data);
      let blob = new Blob([response.data], {
        type: "application/pdf"
    });
      saveAs(blob, this.name+'Entity.java');
      console.log('done');
     
    }, (error) => {
      console.log("getRewsRoomListError=", JSON.stringify(error))
    });

    this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_ts_file' + `${"?" + 'screenname='}` + this.name).subscribe(response => {
      console.log(response.data);
      let blob = new Blob([response.data], {
        type: "application/pdf"
    });
      saveAs(blob, this.name+'TS.ts');
      console.log('done');
     
    }, (error) => {
      console.log("getRewsRoomListError=", JSON.stringify(error))
    });

  

    this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_controller_file' + `${"?" + 'screenname='}` + this.name).subscribe(response => {
      console.log(response.data);
      let blob = new Blob([response.data], {
        type: "application/pdf"
    });
      saveAs(blob, this.name+'Controller.java');
      console.log('done');
     
    }, (error) => {
      console.log("getRewsRoomListError=", JSON.stringify(error))
    });

    this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_repo_file' + `${"?" + 'screenname='}` + this.name).subscribe(response => {
      console.log(response.data);
      let blob = new Blob([response.data], {
        type: "application/pdf"
    });
      saveAs(blob, this.name+'Repo.java');
      console.log('done');
     
    }, (error) => {
      console.log("getRewsRoomListError=", JSON.stringify(error))
    });

    this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_html_file' + `${"?" + 'screenname='}` + this.name).subscribe(response => {
      console.log(response.data);
      let blob = new Blob([response.data], {
        type: "application/pdf"
    });
      saveAs(blob, this.name+'HTML.html');
      console.log('done');
     
    }, (error) => {
      console.log("getRewsRoomListError=", JSON.stringify(error))
    });
  } 
}




