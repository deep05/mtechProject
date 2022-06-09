import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit , ViewChild  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CrudService } from 'src/app/common/services/crud.service';
import { credentials } from 'src/app/core/constant/credentials'
import { ConfigService } from 'src/app/core/services/config.service';
import { NotificationServices } from 'src/app/core/services/notification-service.service';

@Component({
  selector: 'app-screenevent',
  templateUrl: './screenevent.component.html',
  styleUrls: ['./screenevent.component.css']
})
export class ScreeneventComponent implements OnInit {
  @ViewChild('f', { static: false }) form: NgForm;
  model: any = {}
  modelOneArray: any = [];
  modelList = []
  searchFromFilter: boolean = false;
  filters = ""
  eventnametoIDList=[]
  screenIdList = []
  componentList=[]
  componentNameList=[]
  constructor(private configService : ConfigService,
    private notificationServices: NotificationServices,
    private crudService: CrudService,) { }

    ngOnInit(): void {
      this.onRefresh()
    }
    onRefresh(){
    
      this.model = {
        "screeneventid": null, // 0,
        "screencomponentid": null, // 0,
        "screencomponent": "",
        "eventtype":null,
        "screenid":null
      }

      this.modelOneArray = []
      this.modelList = []
      this.eventnametoIDList=[]
      this.screenIdList = []
      this.componentList=[]
      this.componentNameList=[]
  
      this.getModelList("");
      this.getEventnametoIDList("");
      this.getScreenList("");
      this.getComponentListID("");
    }

    getEventnametoIDList(name) {

      this.eventnametoIDList=[]
      this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_eventmaster_name_id_list' + `${"?" + 'name='}` + name).subscribe(response => {
        var tempArr :any =[]
        if(response.data){
          let i=0;
          response.data.forEach(element => { 
            tempArr.push({"code":element[0],"name":element[1]})
           
            this.eventnametoIDList=tempArr;
            i++;
          });
          
        }
      }, (error) => {
        console.log("getRewsRoomListError=", JSON.stringify(error))
      });
     
    }

    getScreenList(name) {
      this.screenIdList = []
      this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_screenlist_to_id' + `${"?" + 'name='}` + name).subscribe(response => {
       
        var tempArr :any =[]
        if(response.data){
          let i=0;
          response.data.forEach(element => { 
            tempArr.push({"code":element[0],"name":element[1]})
           
            this.screenIdList=tempArr;
            i++;
          });
          
        }
      }, (error) => {
        console.log("getRewsRoomListError=", JSON.stringify(error))
      });
    }

    getModelList(id){

      this.modelList = []
      this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_screenevent_list' + `${"?"+'screenevent='}` + id).subscribe(response => {
        this.modelList = response.data;
      }, (error) => {
        console.log("getRewsRoomListError=", JSON.stringify(error))
      });
    }

    getComponentListID(id){
      this.componentList = []
      this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_component_list' + `${"?"+'component='}` + id).subscribe(response => {
        
        if(response.data){
          let i=0;
          var tempArr :any =[]
          response.data.forEach(element => { 
            tempArr.push({"code":element[0],"name":element[1]})
           
            this.componentList=tempArr;
            i++;
          });
          
        }
      }, (error) => {
        console.log("getRewsRoomListError=", JSON.stringify(error))
      });
    }

    getComponentList(id){
      return new Promise(resolve => {
      this.componentNameList= []
      this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_component_name_list' + `${"?"+'id='}` + id).subscribe(response => {
        
        if(response.data){
          let i=0;
          var tempArr :any =[]
          response.data.forEach(element => { 
            tempArr.push({"code":element,"name":element})
            // console.log(tempArr);
            this.componentNameList=tempArr;
            i++;
          });
        }
        return resolve(response.data);
      }, (error) => {
        console.log("getRewsRoomListError=", JSON.stringify(error))
      });
    });
    }



    searchByFilter(){
      this.getModelList(this.filters)
    }

    clearModelOne() {
      this.model = {
        "screeneventid": null, // 0,
        "screencomponentid": null, // 0,
        "screencomponent": "",
        "eventtype":null,
        "screenid":null
      }
      
    }

    addModelOneArray() {
      if (this.configService.isNullUndefined(this.model.screenid) === false) {
        this.notificationServices.showNotification('error', "Screen ID  Required");
        document.getElementById("screenid").focus();
        return false;
      }
      
      if (this.configService.isNullUndefined(this.model.screencomponent) === false) {
        this.notificationServices.showNotification('error', "Screen Component  Required");
        document.getElementById("screencomponent").focus();
        return false;
      }
      if (this.configService.isNullUndefined(this.model.screencomponentid) === false) {
        this.notificationServices.showNotification('error', "Screen Component ID Required");
        document.getElementById("screencomponentid").focus();
        return false;
      }
      if (this.configService.isNullUndefined(this.model.eventtype) === false) {
        this.notificationServices.showNotification('error', "Event Type  Required");
        document.getElementById("eventtype").focus();
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
    // this.model = {
    //   "screeneventid": null, // 0,
    //   "screencomponentid": null, // 0,
    //   "screencomponent": "",
    //   "eventtype":true,
    //   "screenid":null
    // }
    await this.getComponentList(datas.screencomponentid);
    for await (const [index, element] of this.screenIdList.entries()) {
      
      if(element['code'] === await datas['screenid']){
        datas['screenid'] = await element
      }
    }
    for await (const [index, element] of this.componentList.entries()) {
      
      if(element['code'] === await datas['screencomponentid']){
        datas['screencomponentid'] = await element
      }
    }
    for await (const [index, element] of this.componentNameList.entries()) {
      
      if(element['code'] === await datas['screencomponent']){
        datas['screencomponent'] = await element
      }
    }
    for await (const [index, element] of this.eventnametoIDList.entries()) {
      
      if(element['code'] === await datas['eventtype']){
        datas['eventtype'] = await element
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
      await (this.configService.isNullUndefined(element.screencomponent) === true ? element.screencomponent = element.screencomponent['code'] : element.screencomponent = element.screencomponent)
      await (this.configService.isNullUndefined(element.screencomponentid) === true ? element.screencomponentid = element.screencomponentid['code'] : element.screencomponentid = element.screencomponentid)
      await (this.configService.isNullUndefined(element.eventtype) === true ? element.eventtype = element.eventtype['code'] : element.eventtype = element.eventtype)
      await this.saveElement(element)
    }

    this.onRefresh()
    this.notificationServices.showNotification('success', "Save Successfully");
    this.configService.disableLoader();

  }

  async saveElement(element) {
    return new Promise(resolve => {
      console.log(element);
      this.crudService.commonActionPerformPost(credentials.INVENTORY + 'post_screenevent', element).subscribe(async (response) => {
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
      this.crudService.commonActionPerformDelete(credentials.INVENTORY + 'delete_screenevent/'+ this.model.screeneventid).subscribe(async (response) => {
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
