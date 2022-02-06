import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit , ViewChild  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CrudService } from 'src/app/common/services/crud.service';
import { credentials } from 'src/app/core/constant/credentials'
import { ConfigService } from 'src/app/core/services/config.service';
import { NotificationServices } from 'src/app/core/services/notification-service.service';

@Component({
  selector: 'app-eventmaster',
  templateUrl: './eventmaster.component.html',
  styleUrls: ['./eventmaster.component.css']
})
export class EventmasterComponent implements OnInit {
  @ViewChild('f', { static: false }) form: NgForm;
  model: any = {}
  modelOneArray: any = [];
  modelList = []
  searchFromFilter: boolean = false;
  filters = ""
  booleanList=[]
  

  constructor(private configService : ConfigService,
    private notificationServices: NotificationServices,
    private crudService: CrudService,) { }

    ngOnInit(): void {
      this.onRefresh()
    }
    onRefresh(){
    
      this.model = {
        "eventid": null, // 0,
        "eventname": "", // 0,
        "eventpurpose": "",
        "screenevent":true,
        "screengroupevent":true,
        "screenrecordevent":true,
        "screenfieldevent":true
      }
      this.modelOneArray = []
      this.modelList = []
      this.booleanList=[]
      this.getModelList("");
      this.getBooleanTypeList();
    }
    getBooleanTypeList() {
      this.booleanList = [
        { "code": true, "name": "true" },
        { "code": false, "name": "false" }
      ]
    }
    getModelList(id){

      this.modelList = []
      this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_eventmaster_list' + `${"?"+'name='}` + id).subscribe(response => {
        this.modelList = response.data;
      }, (error) => {
        console.log("getRewsRoomListError=", JSON.stringify(error))
      });
    }

    searchByFilter(){
      this.getModelList(this.filters)
    }

    clearModelOne() {
      this.model = {
        "eventid": null, // 0,
        "eventname": "", // 0,
        "eventpurpose": "",
        "screenevent":true,
        "screengroupevent":true,
        "screenrecordevent":true,
        "screenfieldevent":true
      }
      
    }

    addModelOneArray() {
      // if (this.configService.isNullUndefined(this.model.eventid) === false) {
      //   this.notificationServices.showNotification('error', "Event ID Required");
      //   document.getElementById("eventid").focus();
      //   return false;
      // }
      if (this.configService.isNullUndefined(this.model.eventname) === false) {
        this.notificationServices.showNotification('error', "Event Name Required");
        document.getElementById("eventname").focus();
        return false;
      }
      
      if (this.configService.isNullUndefined(this.model.eventpurpose) === false) {
        this.notificationServices.showNotification('error', "Event Purpose Required");
        document.getElementById("eventpurpose").focus();
        return false;
      }
      if (this.configService.isNullUndefined(this.model.screenevent) === false) {
        this.notificationServices.showNotification('error', "Screen Event Required");
        document.getElementById("screenevent").focus();
        return false;
      }
      if (this.configService.isNullUndefined(this.model.screengroupevent) === false) {
        this.notificationServices.showNotification('error', "Screen Group Event text Required");
        document.getElementById("screengroupevent").focus();
        return false;
      }
      if (this.configService.isNullUndefined(this.model.screenrecordevent) === false) {
        this.notificationServices.showNotification('error', "Screen Record Event text Required");
        document.getElementById("screenrecordevent").focus();
        return false;
      }
      if (this.configService.isNullUndefined(this.model.screenfieldevent) === false) {
        this.notificationServices.showNotification('error', "Screen Field Event text Required");
        document.getElementById("screenfieldevent").focus();
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

    for await (const [index, element] of this.booleanList.entries()) {
      if(element['code'] === await datas['screenevent']){
        datas['screenevent'] = await element
      }
      if(element['code'] === await datas['screengroupevent']){
        datas['screengroupevent'] = await element
      }
      if(element['code'] === await datas['screenrecordevent']){
        datas['screenrecordevent'] = await element
      }
      if(element['code'] === await datas['screenfieldevent']){
        datas['screenfieldevent'] = await element
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
      await (this.configService.isNullUndefined(element.screenevent) === true ? element.screenevent = element.screenevent['code'] : element.screenevent = element.screenevent)
      await (this.configService.isNullUndefined(element.screengroupevent) === true ? element.screengroupevent = element.screengroupevent['code'] : element.screengroupevent = element.screengroupevent)
      await (this.configService.isNullUndefined(element.screenrecordevent) === true ? element.screenrecordevent = element.screenrecordevent['code'] : element.screenrecordevent = element.screenrecordevent)
      await (this.configService.isNullUndefined(element.screenfieldevent) === true ? element.screenfieldevent = element.screenfieldevent['code'] : element.screenfieldevent = element.screenfieldevent)
      await this.saveElement(element)
    }

    this.onRefresh()
    this.notificationServices.showNotification('success', "Save Successfully");
    this.configService.disableLoader();

  }

  async saveElement(element) {
    return new Promise(resolve => {
      console.log(element);
      this.crudService.commonActionPerformPost(credentials.INVENTORY + 'post_eventmaster', element).subscribe(async (response) => {
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
      this.crudService.commonActionPerformDelete(credentials.INVENTORY + 'delete_eventmaster/'+ this.model.eventid).subscribe(async (response) => {
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
