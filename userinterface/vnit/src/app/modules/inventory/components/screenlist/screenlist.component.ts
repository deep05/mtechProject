import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CrudService } from 'src/app/common/services/crud.service';
import { ConfigService } from 'src/app/core/services/config.service';
import { NotificationServices } from 'src/app/core/services/notification-service.service';
import { credentials } from 'src/app/core/constant/credentials'
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { elementAt } from 'rxjs/operators';

@Component({
  selector: 'app-screenlist',
  templateUrl: './screenlist.component.html',
  styleUrls: ['./screenlist.component.css']
})
export class ScreenlistComponent implements OnInit {

  @ViewChild('f', { static: false }) form: NgForm;
  model: any = {}
  model_two: any = {}
  modelTwoArray: any = [];
  modelList = []
  screenTypeList=[]
  mysqlTableList=[]
  screenfieldList = []
  booleanList=[]
  basicLayoutList=[]
  screenList = []
  searchFromFilter: boolean = false;
  filters = ""
  minDate = new Date();
  ACTION_FLAG = "";

  constructor(private configService: ConfigService,
    private notificationServices: NotificationServices,
    private crudService: CrudService,
    public router: Router,
    public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.onRefresh()
  }

 

  onRefresh() {
    this.ACTION_FLAG = ""
    this.model = {
      "screenlistid": null, //0, number
      "query": "", 
      "jfunction": "", // 0, string($int32)
      "listname": "", //string
      "screenlistdtl": []
    }

    this.model_two = {
      "screenlistid": null, // 0, 	integer($int32)
      "screenid": null, //0,   	integer($int32)  
      "querycol": "", //0,   	string           
      "screenfieldid": null
    }

    this.modelTwoArray = []
    this.modelList = []
    this.booleanList=[]
    this.basicLayoutList=[]
    this.screenList = []
    this.screenfieldList = []
    this.getModelList("")
    this.getScreenList("")
  }

  getModelList(type) {
    this.modelList = []
    this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_complete_screenlist' + `${"?" + 'screenlistid='}` + name).subscribe(response => {
      this.modelList = response.data;
    }, (error) => {
      console.log("getRewsRoomListError=", JSON.stringify(error))
    });
  }

   getScreenList(name) {
    this.screenList = []
    this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_screenlist_to_id' + `${"?" + 'name='}` + name).subscribe(response => {
      this.screenList = response.data;
      var tempArr :any =[]
      if(response.data){
        let i=0;
        response.data.forEach(element => { 
        tempArr.push({"code":element[0],"name":element[1]})
        // console.log(tempArr);
        this.screenList=tempArr;
        i++;
        });
      }
    }, (error) => {
      console.log("getRewsRoomListError=", JSON.stringify(error))
    });
 
  }
  
  async getScreenfieldList(screenId) {
    
    return new Promise(resolve => {
    this.screenfieldList = []
    this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_screenfieldlist' + `${"?" + 'screenID='}` + screenId).subscribe(response => {            
      var tempArr :any =[]
      if(response.data){
        response.data.forEach(element => { 
        tempArr.push({"code":element[0],"name":element[1]})
        this.screenfieldList=tempArr;
        });
      }
      return resolve(response.data); 
    }, (error) => {
      console.log("getRewsRoomListError=", JSON.stringify(error))
    });
  });
  
  }

  searchByFilter() {
    this.getModelList(this.filters)
  }
  
 

 


  clearModelOne() {
    this.model = {
      "screenlistid": null, //0, number
      "query": "", 
      "jfunction": "", // 0, string($int32)
      "listname": "", //string
      "screenlistdtl": []
    }
  }

  clearModelTwo() {
    this.model_two = {
      "screenlistid": null, // 0, 	integer($int32)
      "screenid": null, //0,   	integer($int32)  
      "querycol": "", //0,   	string           
      "screenfieldid": null
    }
  }


  addRow() {
    if (this.modelTwoArray.length !== 0) {
      if (this.configService.isNullUndefined(this.modelTwoArray[this.modelTwoArray.length - 1]['screenfieldid']) === false) {
        this.notificationServices.showNotification('error', "Row already added");
        return;
      }
    }
    var json: any = {} = Object.assign({}, this.model_two);
    this.modelTwoArray.push(json)
    this.clearModelTwo()
  }

 

  async deleteRowData(data, index) {
    await this.modelTwoArray.splice(index, 1)
    this.modelTwoArray.forEach((element, index) => {
      element["index"] = index;
    });
  }


  async editRowData(datas, index) {
    this.ACTION_FLAG = "EDIT"
    console.log(JSON.stringify(datas));
    
    let response = await this.getDatabyScreen(datas);
    response['query'] = response['query'].split('_').join(' ');
    response['jfunction'] = response['jfunction'].split('_').join(' ');
    response['listname'] = response['listname'].split('_').join(' ');

    console.log("response=",JSON.stringify(response));
    console.log("datas="+JSON.stringify(datas));

    for await (let [index, element] of response['screenlistdtl'].entries()) {
      for await (const [index, ele] of this.screenList.entries()) {
        if(element.screenid === await ele['code']){
          element.screenid = await ele
          
        }
        await this.getScreenfieldList(ele['code']);
      
      }
      console.log(this.screenfieldList);
      console.log(element.screenfieldid);
      for await (const [index, ele] of this.screenfieldList.entries()) {
        if(element.screenfieldid === await ele['code']){
          element.screenfieldid = await ele
        }
      }
    }
    var tempData: any = {};
    tempData = Object.assign({}, response);
    this.model = tempData
    this.modelTwoArray = tempData['screenlistdtl']
  }

  



  getDatabyScreen(datas) {
    return new Promise(resolve => {
      this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_screenlist/' + datas['screenlistid']).subscribe(response => {
        return resolve(response)
      }, (error) => {
        console.log("getRewsRoomListError=", JSON.stringify(error))
      });
    })
  }

  onCancel() {
    if (this.searchFromFilter === false) {
      this.searchFromFilter = true;
    }
    else {
      this.searchFromFilter = false
    }
    this.onRefresh()
  }

  async onSave() {
    this.model.query = this.model.query.split(' ').join('_');
    this.model.jfunction = this.model.jfunction.split(' ').join('_');
    this.model.listname = this.model.listname.split(' ').join('_');

    this.configService.enabledLoader();
    
    if (this.configService.isNullUndefined(this.model.query) === false) {
      this.notificationServices.showNotification('error', "Query Required");
      document.getElementById("query").focus();
      this.configService.disableLoader();
      return;
    }
    if (this.configService.isNullUndefined(this.model.jfunction) === false) {
      this.notificationServices.showNotification('error', "Jfunction  Required");
      document.getElementById("jfunction").focus();
      this.configService.disableLoader();
      return;
    }
    if (this.configService.isNullUndefined(this.model.listname) === false) {
      this.notificationServices.showNotification('error', "Screen List Name  Required");
      document.getElementById("listname").focus();
      this.configService.disableLoader();
      return;
    }

    if (this.modelTwoArray.length === 0) {
      this.notificationServices.showNotification('error', "One Entry detail must be added");
      this.configService.disableLoader();
      return;
    }

    if (this.modelTwoArray.length !== 0) {
      
      for await (const [index, element] of this.modelTwoArray.entries()) {
        if (this.configService.isNullUndefined(element['screenid']) === false) { 
          this.notificationServices.showNotification('error', "Enter Screen Id ");
          this.configService.disableLoader();
          return;
        }
        if (this.configService.isNullUndefined(element['querycol']) === false) {
          this.notificationServices.showNotification('error', "Enter Query Col ");
          this.configService.disableLoader();
          return;
        }
        if (this.configService.isNullUndefined(element['screenfieldid']) === false) {
          this.notificationServices.showNotification('error', "Enter Screen Field");
          this.configService.disableLoader();
          return;
        } 
      }
    }


    var postJson: any = {};
    postJson = Object.assign({}, this.model);
    postJson['screenlistdtl'] = this.modelTwoArray;
    //SECOND LEVEL JSON
    for await (const [index, element] of postJson['screenlistdtl'].entries()) {
      await (this.configService.isNullUndefined(element.screenid) === true ? element.screenid = element.screenid['code'] : element.screenid = element.screenid)
      await (this.configService.isNullUndefined(element.screenfieldid) === true ? element.screenfieldid = element.screenfieldid['code'] : element.screenfieldid = element.screenfieldid)
      element['index'] = undefined;
    }
    console.log("postJson=",JSON.stringify(postJson));
    this.crudService.commonActionPerformPost(credentials.INVENTORY + 'post_screenlist', postJson).subscribe(async (response) => {
      if (response.status === await "Success") {
        this.notificationServices.showNotification('success', response.message + " " + "Id =" + response.id);
        this.onRefresh()
        this.configService.disableLoader();
      }
      else {
        this.notificationServices.showNotification('error', response.message);
        this.configService.disableLoader();
      }
    }, (error) => {
      console.log("getModelListError=", JSON.stringify(error))
      this.notificationServices.showNotification('error', error);
      this.configService.disableLoader();
    });
  }

  onDelete(modelTwoArray, i) {
    console.log("onDelete =", modelTwoArray)
    this.model = modelTwoArray
  }

  confirmDelete() {
    this.configService.enabledLoader()
    this.crudService.commonActionPerformDelete(credentials.INVENTORY + 'delete_screenlist/' + this.model.screenlistid).subscribe(async (response) => {
      if (response.status === await "Success") {
        this.notificationServices.showNotification('error', response.message);
        this.onRefresh()
        this.configService.disableLoader()
      }
      else {
        this.notificationServices.showNotification('error', response.message);
        this.onRefresh()
        this.configService.disableLoader();
      }
    }, (error) => {
      console.log("getModelListError=", JSON.stringify(error))
      this.notificationServices.showNotification('error', error);
      this.configService.disableLoader();
    });
  }
}
