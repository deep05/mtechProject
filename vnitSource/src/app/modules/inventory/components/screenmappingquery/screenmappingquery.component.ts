import { Component, OnInit , ViewChild  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CrudService } from 'src/app/common/services/crud.service';
import { credentials } from 'src/app/core/constant/credentials'
import { ConfigService } from 'src/app/core/services/config.service';
import { NotificationServices } from 'src/app/core/services/notification-service.service';

@Component({
  selector: 'app-screenmappingquery',
  templateUrl: './screenmappingquery.component.html',
  styleUrls: ['./screenmappingquery.component.css']
})

export class ScreenmappingqueryComponent implements OnInit {
  @ViewChild('f', { static: false }) form: NgForm;
  model: any = {}
  modelOneArray: any = [];
  modelList = []
  searchFromFilter: boolean = false;
  filters = ""
  screenIdList=[]
  screenGroupIdList=[]
  
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
       //0
      "querytext": "",
      "screenmappingqueryid":null
    }
    this.modelOneArray = []
    this.modelList = []
    this.screenIdList = []
    this.screenGroupIdList = []
    
    

    this.getModelList("")
    this.getScreenList("")
    // this.getItemCodeList("")
  }

  getModelList(id){

    this.modelList = []
    this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_screenmappingquery_list' + `${"?"+'screenmappingqueryID='}` + id).subscribe(response => {
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
        // console.log(tempArr);
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
      this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_screengroupid_from_screenid' + `${"?" + 'screenid='}` + screenID).subscribe(response => {
        
        this.screenGroupIdList = response.data;
        
        var tempArr :any =[]
        // console.log(response.data);
        if(response.data){
          let i=0;
          response.data.forEach(element => { 
          tempArr.push({"code":element[0],"name":element[1]})
          // console.log(tempArr);
          this.screenGroupIdList=tempArr;
          i++;
          });
          
        }
        return resolve(response.data);
      }, (error) => {
        console.log("getRewsRoomListError=", JSON.stringify(error))
      });
     
    })
   
  }

  searchByFilter(){
    this.getModelList(this.filters)
  }

  clearModelOne() {
    this.model = {
      "screenid": null, // 0,
      "screengroupid": null, // 0,//0
      "querytext": "",
      "screenmappingqueryid":null
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
    
    if (this.configService.isNullUndefined(this.model.querytext) === false) {
      this.notificationServices.showNotification('error', "Query text Required");
      document.getElementById("querytext").focus();
      return false;
    }

  //  this.model.querytext=this.model.querytext.split(' ').join('_');
    var json: any = {} = Object.assign({}, this.model);
    if (json.index || json.index === 0) {
      this.modelOneArray[json.index] = json
      console.log("old =", JSON.stringify(this.modelOneArray))
    }
    else {
      json.index = this.modelOneArray.length;
      this.modelOneArray[json.index] = json
      console.log("new =", JSON.stringify(this.modelOneArray))
    }
    this.clearModelOne()
  }

  async deleteRowData(data, index) {
    await this.modelOneArray.splice(index, 1)
    this.modelOneArray.forEach((element, index) => {
      element["index"] = index;
    });
  }

  async viewRowData(datas, index) {
    // datas.querytext=datas.querytext.split('_').join(' ');
    var tempData: any = {};
    tempData = Object.assign({}, datas);
    this.model = tempData
  }

  async editRowData(datas, index) {
    await this.getScreengroupIdlist(datas.screenid);
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
    // this.model.querytext = this.model.querytext.split(' ').join('_');
    this.configService.enabledLoader();
    if (this.modelOneArray.length === 0) {
      this.notificationServices.showNotification('error', "Some Data must be added");
      this.configService.disableLoader();
      return;
    }

    var postJson: any = [];
    console.log("postJson="+postJson);
    // postJson = Object.assign({}, this.model);
    postJson = [... this.modelOneArray];
    for await (const [index, element] of postJson.entries()) {
      await (this.configService.isNullUndefined(element.screenid) === true ? element.screenid = element.screenid['code'] : element.screenid = element.screenid)
      await (this.configService.isNullUndefined(element.screengroupid) === true ? element.screengroupid = element.screengroupid['code'] : element.screengroupid = element.screengroupid)
      await this.saveElement(element)
    }
    this.onRefresh()
    this.notificationServices.showNotification('success', "Save Successfully");
    this.configService.disableLoader();

  }
  
  async saveElement(element) {
    return new Promise(resolve => {
      // console.log(element);
      // element.querytext=element.querytext.split(' ').join('_');
      // delete element.index;
      console.log(element);
      this.crudService.commonActionPerformPost(credentials.INVENTORY + 'post_screenmappingquery', element).subscribe(async (response) => {
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
      this.crudService.commonActionPerformDelete(credentials.INVENTORY + 'delete_screenmappingquery/'+ this.model.screenmappingqueryid).subscribe(async (response) => {
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
