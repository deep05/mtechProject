import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CrudService } from 'src/app/common/services/crud.service';
import { credentials } from 'src/app/core/constant/credentials'
import { ConfigService } from 'src/app/core/services/config.service';
import { NotificationServices } from 'src/app/core/services/notification-service.service';

@Component({
  selector: 'app-screenjoincondition',
  templateUrl: './screenjoincondition.component.html',
  styleUrls: ['./screenjoincondition.component.css']
})
export class ScreenjoinconditionComponent implements OnInit {
  @ViewChild('f', { static: false }) form: NgForm;
  model: any = {}
  modelOneArray: any = [];
  modelList = []
  searchFromFilter: boolean = false;
  filters = ""

  screenIdList=[]
  screenGroupIdList=[]
  mastergroupcolList=[]
  groupColList=[]

  constructor(private configService : ConfigService,
    private notificationServices: NotificationServices,
    private crudService: CrudService,) { }

  ngOnInit(): void {
      this.onRefresh()
    }

    onRefresh(){
      this.model = {
        "screenid": null, // 0,
        "screengroupid": null, // 0,
        "mastergroupcol": "", //0
        "groupcol": "",
        "screenjoinid":null
      }
      this.modelOneArray = []
      this.modelList = []
      this.screenIdList = []
      this.screenGroupIdList = []
      this.mastergroupcolList=[]
      this.groupColList=[]
      this.getModelList("")
      this.getScreenList("")
      // this.getItemCodeList("")
    }

    getModelList(id){
      
      this.modelList = []
      this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_screenjoincondition_list' + `${"?"+'screenjoinID='}` + id).subscribe(response => {
        this.modelList = response.data;
      }, (error) => {
        console.log("getRewsRoomListError=", JSON.stringify(error))
      });

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
          console.log(tempArr);
          this.screenIdList=tempArr;
          i++;
          });
          
        }
      }, (error) => {
        console.log("getRewsRoomListError=", JSON.stringify(error))
      });
    }

async getScreengroupIdlist(screenID)
  {
    return new Promise(resolve => {
    this.screenGroupIdList = []
    this.mastergroupcolList=[]
    var tempArr :any =[]
    var tempArr1 :any =[]
    this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_screengroupid_from_screenid' + `${"?" + 'screenid='}` + screenID).subscribe(response => {
      this.screenGroupIdList = response.data;
      
      if(response.data){
        let i=0;
        response.data.forEach(element => { 
        tempArr.push({"code":element[0],"name":element[1]})
        this.screenGroupIdList=tempArr; 
        this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_column_list' + `${"?" + 'name='}` + element[2]).subscribe(response => {
          response.data.forEach(element => {
            tempArr1.push({"code":element,"name":element})
            this.mastergroupcolList=tempArr1;
            });
        });
      });   
      }
      return resolve(response.data);
    }, (error) => {
      console.log("getRewsRoomListError=", JSON.stringify(error))
    });
  });
  }

  
  async getgroupCol(screenID_1){
    return new Promise(resolve => {
      this.groupColList = []
      this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_screenfieldlist' + `${"?" + 'screenID='}` + screenID_1).subscribe(response => {       
        this.groupColList = response.data;
        var tempArr :any =[]
        if(response.data){
          let i=0;
          response.data.forEach(element => { 
          tempArr.push({"code":element[1],"name":element[1]})
          this.groupColList=tempArr;
          i++;
          });
        }
        return resolve(response.data);
      }, (error) => {
        console.log("getRewsRoomListError=", JSON.stringify(error))
      });
    });
  }

  async twoFunction(screenID,screenID_1){
    await this.getScreengroupIdlist(screenID);
    await this.getgroupCol(screenID_1);
  }

    searchByFilter(){
      this.getModelList(this.filters)
    }

    clearModelOne() {
      this.model = {
        "screenid": null, // 0,
        "screengroupid": null, // 0,
        "mastergroupcol": "", //0
        "groupcol": "",
        "screenjoinid":null
      }
    }

    addModelOneArray() {
      if (this.configService.isNullUndefined(this.model.screenid) === false) {
        this.notificationServices.showNotification('error', "Screen ID Required");
        document.getElementById("screenid").focus();
        return false;
      }
      if (this.configService.isNullUndefined(this.model.screengroupid) === false) {
        this.notificationServices.showNotification('error', "Screen Group ID Required");
        document.getElementById("screengroupid").focus();
        return false;
      }
      if (this.configService.isNullUndefined(this.model.mastergroupcol) === false) {
        this.notificationServices.showNotification('error', "Master Group Name Required");
        document.getElementById("mastergroupcol").focus();
        return false;
      }
      if (this.configService.isNullUndefined(this.model.groupcol) === false) {
        this.notificationServices.showNotification('error', "Group Column Required");
        document.getElementById("groupcol").focus();
        return false;
      }
  
      var json: any = {} = Object.assign({}, this.model);
      if (json.index || json.index === 0) {
        this.modelOneArray[json.index] = json
        console.log("old")
      }
      else {
        json.index = this.modelOneArray.length;
        this.modelOneArray[json.index] = json
        console.log("new")
      }
      this.clearModelOne()
    }


    async deleteRowData(data, index) {
      await this.modelOneArray.splice(index, 1)
      this.modelOneArray.forEach((element, index) => {
        element["index"] = index;
      });
    }
  
  
    viewRowData(datas, index) {
      var tempData: any = {};
      tempData = Object.assign({}, datas);
      this.model = tempData
    }

    async editRowData(datas, index) {

      await this.twoFunction(datas.screenid,datas.screenid);
      
      for await (const [index, element] of this.screenIdList.entries()) {
        if(element['code'] === await datas['screenid']){
          datas['screenid'] = await element
        }
      }
  
      for await (const [index, element] of this.screenGroupIdList.entries()) {
        if(element['code'] === await datas['screengroupid']){
          datas['screengroupid'] = await element
        }
      }
      for await (const [index, element] of this.mastergroupcolList.entries()) {
        if(element['code'] === await datas['mastergroupcol']){
          datas['mastergroupcol'] = await element
        }
      }
      for await (const [index, element] of this.groupColList.entries()) {
        if(element['code'] === await datas['groupcol']){
          datas['groupcol'] = await element
        }
      }
  
      var tempData: any = {};
      tempData = Object.assign({}, datas);
      this.model = tempData
    }

    onCancel(){
      if(this.searchFromFilter === false){
        this.searchFromFilter = true;
      }
      else{
        this.searchFromFilter = false
      }
      this.onRefresh()
    }

    async onSave() {
      this.configService.enabledLoader();
      if (this.modelOneArray.length === 0) {
        this.notificationServices.showNotification('error', "Some Data must be added");
        this.configService.disableLoader();
        return;
      }
  
      var postJson: any = [];
      // postJson = Object.assign({}, this.model);
      postJson = [... this.modelOneArray];
      console.log(postJson);
      
      for await (const [index, element] of postJson.entries()) {
        await (this.configService.isNullUndefined(element.screenid) === true ? element.screenid = element.screenid['code'] : element.screenid = element.screenid)
        await (this.configService.isNullUndefined(element.screengroupid) === true ? element.screengroupid = element.screengroupid['code'] : element.screengroupid = element.screengroupid)
        await (this.configService.isNullUndefined(element.mastergroupcol) === true ? element.mastergroupcol = element.mastergroupcol['code'] : element.mastergroupcol = element.mastergroupcol)
        await (this.configService.isNullUndefined(element.groupcol) === true ? element.groupcol = element.groupcol['code'] : element.groupcol = element.groupcol)
        await this.saveElement(element)
      }
      this.onRefresh()
      this.notificationServices.showNotification('success', "Save Successfully");
      this.configService.disableLoader();
  
    }

    async saveElement(element) {
      return new Promise(resolve => {
        this.crudService.commonActionPerformPost(credentials.INVENTORY + 'post_screenjoincondition', element).subscribe(async (response) => {
          if (response.status === await "Success") {
            return resolve(response);
          }
          else {
            this.notificationServices.showNotification('error', response.message);
            this.configService.disableLoader();
            return resolve(response);
          }
        }, (error) => {
          console.log("getModelListError=", JSON.stringify(error))
          this.notificationServices.showNotification('error', error);
          this.configService.disableLoader();
        });
      })
    }

    onDelete(modelOneArray,i){
      this.model = modelOneArray
    }

    confirmDelete(){
      this.configService.enabledLoader()
        this.crudService.commonActionPerformDelete(credentials.INVENTORY + 'delete_screenjoincondition/'+ this.model.screenjoinid).subscribe(async (response) => {
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
