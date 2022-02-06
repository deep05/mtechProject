import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CrudService } from 'src/app/common/services/crud.service';
import { credentials } from 'src/app/core/constant/credentials'
import { ConfigService } from 'src/app/core/services/config.service';
import { NotificationServices } from 'src/app/core/services/notification-service.service';

@Component({
  selector: 'app-bill-type-master',
  templateUrl: './bill-type-master.component.html',
  styleUrls: ['./bill-type-master.component.css']
})
export class BillTypeMasterComponent implements OnInit {
  @ViewChild('f', { static: false }) form: NgForm;
  model: any = {}
  modelOneArray: any = [];
  modelList = []
  searchFromFilter: boolean = false;
  filters = ""

  billTypeList=[]
  itemCodeList=[]

  constructor(private configService : ConfigService,
    private notificationServices: NotificationServices,
    private crudService: CrudService,) { }

  ngOnInit(): void {
    this.onRefresh()
  }

  onRefresh(){
    this.model = {
      "billid": null, // 0,
      "billtp": null, // 0,
      "itcode": null, //0
    }
    this.modelOneArray = []

    this.modelList = []
    this.billTypeList = []
    this.itemCodeList = []
    this.getModelList("")
    this.getBillTypeList()
    this.getItemCodeList("")
  }

  getModelList(type){
    this.modelList = []
    // let param = { "param1": param1, "param10": "", "param2": param2, "param3": "", "param4": "", "param5": "", "param6": "", "param7": "", "param8": "", "param9": "" }
    // let filter = [{ "property": "hcmCountryName", "operator": "like", "value": `${countryName.toString()}` }]
    // let encodedParamter = "filter=" + `${encodeURI(JSON.stringify(filter))}` + "&limit=" + `${encodeURI("25")}` + "&sort=" + `${encodeURI("[]")}` + "&start=" + `${encodeURI("0")}`
    this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_bill_type_list' + `${"?"+'type='}` + type).subscribe(response => {
      this.modelList = response.data;
    }, (error) => {
      console.log("getRewsRoomListError=", JSON.stringify(error))
    });
  }

  getBillTypeList(){
   this.billTypeList = [
     {"code": 1 , "name": 1},
     {"code": 2 , "name": 2}
   ]
  }

  getItemCodeList(name){
    this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_item_list' + `${"?"+'name='}` + name).subscribe(response => {
      this.itemCodeList = response.data;
    }, (error) => {
      console.log("getRewsRoomListError=", JSON.stringify(error))
    });
  }
  

  searchByFilter(){
    this.getModelList(this.filters)
  }

  clearModelOne() {
    this.model = {
      "billid": null, // 0,
      "billtp": null, // 0,
      "itcode": null, //0
    }
    document.getElementById("billtp").focus();
  }


  addModelOneArray() {
    if (this.configService.isNullUndefined(this.model.billtp) === false) {
      this.notificationServices.showNotification('error', "Bill Type Required");
      document.getElementById("billtp").focus();
      return false;
    }
    if (this.configService.isNullUndefined(this.model.itcode) === false) {
      this.notificationServices.showNotification('error', "Item Code Required");
      document.getElementById("itcode").focus();
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
    for await (const [index, element] of this.billTypeList.entries()) {
      if(element['code'] === await datas['billtp']){
        datas['billtp'] = await element
      }
    }

    for await (const [index, element] of this.itemCodeList.entries()) {
      if(element['itcode'] === await datas['itcode']){
        datas['itcode'] = await element
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
      this.notificationServices.showNotification('error', "One Bill type detail must be added");
      this.configService.disableLoader();
      return;
    }

    var postJson: any = [];
    // postJson = Object.assign({}, this.model);
    postJson = [... this.modelOneArray];

    for await (const [index, element] of postJson.entries()) {
      await (this.configService.isNullUndefined(element.billtp) === true ? element.billtp = element.billtp['code'] : element.billtp = element.billtp)
      await (this.configService.isNullUndefined(element.itcode) === true ? element.itcode = element.itcode['itcode'] : element.itcode = element.itcode)
      
      await this.saveElement(element)
    }
    this.onRefresh()
    this.notificationServices.showNotification('success', "Save Successfully");
    this.configService.disableLoader();

  }

  async saveElement(element) {
    console.log(element);
    return new Promise(resolve => {
      this.crudService.commonActionPerformPost(credentials.INVENTORY + 'post_bill_type', element).subscribe(async (response) => {
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
      this.crudService.commonActionPerformDelete(credentials.INVENTORY + 'delete_bill_type/'+ this.model.billid).subscribe(async (response) => {
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
