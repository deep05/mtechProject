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
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
}) 

export class ScreenComponent implements OnInit {
  @ViewChild('f', { static: false }) form: NgForm;
  model: any = {}
  model_two: any = {}
  modelTwoArray: any = [];
  modelList = []
  screenTypeList=[]
  mysqlTableList=[]
  booleanList=[]
  basicLayoutList=[]
  mastergroupnameList =[]
  arr = []
  searchFromFilter: boolean = false;
  filters = ""
  minDate = new Date();
  message:any;
  
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
      "screenid": null, //0, number
      "screenpurpose": "", 
      "screenname": "", // 0, string($int32)
      "screentype": null, //0,  integer($int32)
      "screendate": "", //"2021-05-11T11:44:13.208Z", string ($date-time)
      "screengroup": []
    }

    this.model_two = {
      "screenid": null, // 0, 	integer($int32)
      "screengroupid": this.generateRandonId(), //0,   	integer($int32)  
      "gpurpose": "", //0,   	string           
      "db": true, //0,       boolean  ??s
      "basetable": "", //0      string  
      "detailtable": true, //boolean
      "mastergroupname": "", //String
      "mapping": true, //boolean
      "mappingtable": "",  //string
      "recordgroupcount":null,//number
      "basiclayout":null //integer
    }
    this.modelTwoArray = []
    this.modelList = []
    this.booleanList=[]
    this.basicLayoutList=[]
    this.mastergroupnameList =[]
  

    this.getModelList("")
    this.getBooleanTypeList()
    this.getScreenTypeList()
    this.getCustomerCodeList("test") //here directly we have entered name of the database of whose we need the all the table name
    this.getBasicLayoutList()
  
  }

  generateRandonId(){
    var r = Math.floor(Math.random() * 100) + 1;
    if (this.arr.indexOf(r) === -1) this.arr.push(r);
    return r
   }
   
  getModelList(type) {
    this.modelList = []
    this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_screen_list' + `${"?" + 'screenid='}` + type).subscribe(response => {
      this.modelList = response.data;
    }, (error) => {
      console.log("getRewsRoomListError=", JSON.stringify(error))
    });
  }

  searchByFilter() {
    this.getModelList(this.filters)
  }

  getBooleanTypeList() {
    this.booleanList = [
      { "code": true, "name": "true" },
      { "code": false, "name": "false" }
    ]
  }
  getScreenTypeList() {
    this.screenTypeList = [
      { "code": 1, "name": '1' },
      { "code": 2, "name": '2' }
    ]
  }

  getBasicLayoutList() {
    this.basicLayoutList = [
      { "code": 1, "name": "Tabular"},
      { "code": 2, "name": "Form"}
    ]

    this.mastergroupnameList=[
      {"code": "Null", "name": "Null"}
    ]
  }


 

  async getCustomerCodeList(name) {
    return new Promise(resolve => {
    this.mysqlTableList=[]
    this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_table_list_mysql' + `${"?" + 'name='}`+name).subscribe(response => {
      var tempArr :any =[]
      
      if(response.data){
        response.data.forEach(element => {
        tempArr.push({"code":element,"name":element})
        this.mysqlTableList=tempArr;
        });
      }
    }, (error) => {
      console.log("getRewsRoomListError=", JSON.stringify(error))
    });
     });
  }
  
  clearModelOne() {
    this.model = {
      "screenid": null, //0, number
      "screenpurpose": "", 
      "screenname": "", // 0, string($int32)
      "screentype": null, //0,  integer($int32)
      "screendate": "", //"2021-05-11T11:44:13.208Z", string ($date-time)
      "screengroup": []
    }
  }

  clearModelTwo() {
    this.model_two = {
      "screenid": null, // 0, 	integer($int32)
      "screengroupid": this.model_two.screengroupid, //0,   	integer($int32)  
      "gpurpose": "", //0,   	string           
      "db": true, //0,       boolean  ??s
      "basetable": "", //0      string  
      "detailtable": true, //boolean
      "mastergroupname": "", //String
      "mapping": true, //boolean
      "mappingtable": "",  //string
      "recordgroupcount":null,//number
      "basiclayout":null //integer
    }
  }


  addRow() {
    if (this.modelTwoArray.length !== 0) {
      if (this.configService.isNullUndefined(this.modelTwoArray[this.modelTwoArray.length - 1]['screengroupid']) === false) {
        this.notificationServices.showNotification('error', "Row already added");
        return;
      }
    }

    console.log("Check="+JSON.stringify(this.model_two));
    
    
    var json: any = {} = Object.assign({}, this.model_two);
    this.modelTwoArray.push(json);
    console.log(JSON.stringify(this.modelTwoArray));
    this.clearModelTwo()
    this.model_two.screengroupid=this.model_two.screengroupid+1;
  }

 

  async deleteRowData(data, index) {
    await this.modelTwoArray.splice(index, 1)
    this.modelTwoArray.forEach((element, index) => {
      element["index"] = index;
    });
  }


  async editRowData(datas, index) {
    this.ACTION_FLAG = "EDIT"
    let response = await this.getDatabyScreen(datas)
    response['screendate'] = new Date(response['screendate'])

    response['screenpurpose'] = response['screenpurpose'].split('_').join(' ');
    response['screenname'] = response['screenname'].split('_').join(' ');
    
    
    
    console.log("response=",JSON.stringify(response));

    for await (const [index, element] of this.screenTypeList.entries()) {
      if (response['screentype'] === await element['code']) {
        response['screentype'] = await element
      }
    }

    for await (let [index, element] of response['screengroup'].entries()) {
      
      for await (const [index, ele] of this.booleanList.entries()) {
        if (element.db === await ele['code']) {
          element.db = await ele
        }
        if (element.detailtable === await ele['code']) {
          element.detailtable= await ele
        }
        if (element.mapping === await ele['code']) {
          element.mapping = await ele
        }
      }

      for await (const [index, ele] of this.mastergroupnameList.entries()) {
        if (element.mastergroupname === await ele['code']) {
          element.mastergroupname = await ele
        }

      }
      for await (const [index, ele] of this.mysqlTableList.entries()) {
        if (element.basetable === await ele['code']) {
          element.basetable = await ele
        }
      }
      for await (const [index, ele] of this.basicLayoutList.entries()) {
        if (element.basiclayout === await ele['code']) {
          element.basiclayout = await ele
        }
      }
    }
    var tempData: any = {};
    tempData = Object.assign({}, response);
    this.model = tempData;
    this.modelTwoArray = tempData['screengroup'];

  }

  


  getDatabyScreen(datas) {
    return new Promise(resolve => {
      this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_screen/' + datas['screenid']).subscribe(response => {
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
    this.model.screenpurpose = this.model.screenpurpose.split(' ').join('_');
    this.model.screenname = this.model.screenname.split(' ').join('_');
    
    this.configService.enabledLoader();

    if (this.configService.isNullUndefined(this.model.screendate) === false) {
      this.notificationServices.showNotification('error', "Screen Date Required");
      document.getElementById("screendate").focus();
      this.configService.disableLoader();
      return;
    }
    if (this.configService.isNullUndefined(this.model.screentype) === false) {
      this.notificationServices.showNotification('error', "Screen Type Required");
      document.getElementById("screentype").focus();
      this.configService.disableLoader();
      return;
    }
    if (this.configService.isNullUndefined(this.model.screenpurpose) === false) {
      this.notificationServices.showNotification('error', "Screen Purpose  Required");
      document.getElementById("screenpurpose").focus();
      this.configService.disableLoader();
      return;
    }
    if (this.configService.isNullUndefined(this.model.screenname) === false) {
      this.notificationServices.showNotification('error', "Screen Name  Required");
      document.getElementById("screenname").focus();
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
        if (this.configService.isNullUndefined(element['screengroupid']) === false) {
          
          this.notificationServices.showNotification('error', "Select Item Code for row " + (index + 1));
          this.configService.disableLoader();
          return;
        }
        if (this.configService.isNullUndefined(element['gpurpose']) === false) {
          document.getElementById("gpurpose" + index).focus();
          this.notificationServices.showNotification('error', "Enter Item Rate for row " + (index + 1));
          this.configService.disableLoader();
          return;
        }
        if (this.configService.isNullUndefined(element['db']) === false) {
          
          this.notificationServices.showNotification('error', "Enter Quantity for row " + (index + 1));
          this.configService.disableLoader();
          return;
        }
        if (this.configService.isNullUndefined(element['basetable']) === false) {
          
          this.notificationServices.showNotification('error', "Enter Value for row " + (index + 1));
          this.configService.disableLoader();
          return;
        }
        if (this.configService.isNullUndefined(element['detailtable']) === false) {
          
          this.notificationServices.showNotification('error', "Enter Value for row " + (index + 1));
          this.configService.disableLoader();
          return;
        }
        if (this.configService.isNullUndefined(element['mastergroupname']) === false) {
          
          this.notificationServices.showNotification('error', "Add Master Group Column");
          this.configService.disableLoader();
          return;
        }
        if (this.configService.isNullUndefined(element['mapping']) === false) {
         
          this.notificationServices.showNotification('error', "Enter Value for row " + (index + 1));
          this.configService.disableLoader();
          return;
        }
        if (this.configService.isNullUndefined(element['mappingtable']) === false) {
          
          this.notificationServices.showNotification('error', "Enter Value for row " + (index + 1));
          this.configService.disableLoader();
          return;
        }
        if (this.configService.isNullUndefined(element['recordgroupcount']) === false) {
         
          this.notificationServices.showNotification('error', "Enter Value for row " + (index + 1));
          this.configService.disableLoader();
          return;
        }
        if (this.configService.isNullUndefined(element['basiclayout']) === false) {
          
          this.notificationServices.showNotification('error', "Enter Value for row " + (index + 1));
          this.configService.disableLoader();
          return;
        }
      }
    }


    var postJson: any = {};
    postJson = Object.assign({}, this.model);
    postJson['screengroup'] = this.modelTwoArray;

    await (this.configService.isNullUndefined(postJson.screendate) === true ? postJson.screendate = this.datepipe.transform(postJson.screendate, "yyyy-MM-dd HH:MM:SS") : postJson.screendate = postJson.screendate);
    await (this.configService.isNullUndefined(postJson.screentype) === true ? postJson.screentype = postJson.screentype['code'] : postJson.screentype = postJson.screentype)
    //SECOND LEVEL JSON
    for await (const [index, element] of postJson['screengroup'].entries()) {
      await (this.configService.isNullUndefined(element.db) === true ? element.db = element.db['code'] : element.db = element.db)
      await (this.configService.isNullUndefined(element.detailtable) === true ? element.detailtable = element.detailtable['code'] : element.detailtable = element.detailtable)
      await (this.configService.isNullUndefined(element.mapping) === true ? element.mapping = element.mapping['code'] : element.mapping = element.mapping)
      // await (this.configService.isNullUndefined(element.mastergroupname) === true ? element.mastergroupname = element.mastergroupname['code'] : element.mastergroupname = element.mastergroupname)
      await (this.configService.isNullUndefined(element.basiclayout) === true ? element.basiclayout = element.basiclayout['code'] : element.basiclayout = element.basiclayout)
      await (this.configService.isNullUndefined(element.basetable) === true ? element.basetable = element.basetable['code'] : element.basetable = element.basetable)
      element['index'] = undefined;
    }
    this.message=JSON.stringify(postJson.screengroup[0].basetable);
    console.log(this.message);
    this.crudService.commonActionPerformPost(credentials.INVENTORY + 'post_screen', postJson).subscribe(async (response) => {
      if (response.status === await "Success") {
        this.notificationServices.showNotification('success', response.message + " " + "Id =" + response.id);
        this.router.navigate(['/', 'download']);
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
    this.crudService.commonActionPerformDelete(credentials.INVENTORY + 'delete_screen/' + this.model.screenid).subscribe(async (response) => {
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