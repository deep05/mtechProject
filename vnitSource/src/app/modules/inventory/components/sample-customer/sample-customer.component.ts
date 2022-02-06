import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CrudService } from 'src/app/common/services/crud.service';
import { ConfigService } from 'src/app/core/services/config.service';
import { NotificationServices } from 'src/app/core/services/notification-service.service';
import { credentials } from 'src/app/core/constant/credentials';

@Component({
  selector: 'app-sample-customer',
  templateUrl: './sample-customer.component.html',
  styleUrls: ['./sample-customer.component.css']
})
export class SampleCustomerComponent implements OnInit {
  @ViewChild('f', { static: false }) form: NgForm;
  model: any = {}
  modelOneArray: any = [];
  modelList = []
  searchFromFilter: boolean = false;
  filters = ""

  constructor(private configService : ConfigService,
    private notificationServices: NotificationServices,
    private crudService: CrudService,) { }

  ngOnInit(): void {
    this.onRefresh()
  }

  onRefresh(){
    this.model = {
      "scode": null,  //1,
      "sname": "",  //"customer A"
    }
    this.modelOneArray = []

    this.modelList = []

    this.getModelList("")
  }

  getModelList(name){
    this.modelList = []
    // let param = { "param1": param1, "param10": "", "param2": param2, "param3": "", "param4": "", "param5": "", "param6": "", "param7": "", "param8": "", "param9": "" }
    // let filter = [{ "property": "hcmCountryName", "operator": "like", "value": `${countryName.toString()}` }]
    // let encodedParamter = "filter=" + `${encodeURI(JSON.stringify(filter))}` + "&limit=" + `${encodeURI("25")}` + "&sort=" + `${encodeURI("[]")}` + "&start=" + `${encodeURI("0")}`
    this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_scustomer_list' + `${"?"+'name='}`+name).subscribe(response => {
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
      "scode": null,  //1,
      "sname": "",  //"customer A"
    }
    document.getElementById("sname").focus();
  }

  addModelOneArray() {
    if (this.configService.isNullUndefined(this.model.sname) === false) {
      this.notificationServices.showNotification('error', "Customer Name Required");
      document.getElementById("sname").focus();
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
      this.notificationServices.showNotification('error', "One customer detail must be added");
      this.configService.disableLoader();
      return;
    }

    var postJson: any = [];
    // postJson = Object.assign({}, this.model);
    postJson = [... this.modelOneArray];

    for await (const [index, element] of postJson.entries()) {
      await this.saveElement(element)
    }
    this.onRefresh()
    this.notificationServices.showNotification('success', "Save Successfully");
    this.configService.disableLoader();

  }

  async saveElement(element) {
    return new Promise(resolve => {
      this.crudService.commonActionPerformPost(credentials.INVENTORY + 'post_scustomer', element).subscribe(async (response) => {
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
      this.crudService.commonActionPerformDelete(credentials.INVENTORY + 'delete_scustomer/'+ this.model.scode).subscribe(async (response) => {
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