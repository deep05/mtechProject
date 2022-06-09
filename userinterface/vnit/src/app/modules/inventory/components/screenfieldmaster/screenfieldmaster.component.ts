import { Component, OnInit , ViewChild  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CrudService } from 'src/app/common/services/crud.service';
import { credentials } from 'src/app/core/constant/credentials'
import { ConfigService } from 'src/app/core/services/config.service';
import { NotificationServices } from 'src/app/core/services/notification-service.service';

@Component({
  selector: 'app-screenfieldmaster',
  templateUrl: './screenfieldmaster.component.html',
  styleUrls: ['./screenfieldmaster.component.css']
})
export class ScreenfieldmasterComponent implements OnInit {
  @ViewChild('f', { static: false }) form: NgForm;
  model: any = {}
  modelOneArray: any = [];
  filters = ""
  modelList = []
  searchFromFilter: boolean = false;
  screenIdList = []
  screenGroupIdList=[]
  FieldList=[]
  booleanList=[]
  dataTypeList=[]
  inputTypeList=[]
  basetablecolumnList=[]
  
  constructor(private configService : ConfigService,
    private notificationServices: NotificationServices,
    private crudService: CrudService,) { }

  ngOnInit(): void {
    this.onRefresh()
  }

  onRefresh(){
    
    this.model = {
      "screenid":null,
      "screengroupid":null,
      "field_name":"",
      "label":"",
      "fieldtype":null,
      "tablecolumn":"",
      "required":false,
      "databasefuncname":"",
      "jfunctionname":"",
      "rangelow":null,
      "rangehigh":null,
      "dateformat":"",
      "visible":false,
      "rowno":null,
      "colno":null,
      "inputtype":"",
      "datatype":"",
      "defaultvalue":""
    }
    this.modelOneArray = []
    this.modelList = []
    this.screenIdList = []
    this.screenGroupIdList=[]
    this.FieldList=[]
    this.booleanList=[]
    this.dataTypeList=[]
    this.inputTypeList=[]
    this.basetablecolumnList=[]
   
    
    this.getScreenList("");
    // this.getScreengroupIdlist("");
    this.getModelList("")
    this.getBooleanTypeList();
    this.getFieldTypeList();
    this.getdataTypeList();
    this.getinputTypeList();
  }

  getBooleanTypeList() {
    this.booleanList = [
      { "code": true, "name": "true" },
      { "code": false, "name": "false" }
    ]
  }
  getinputTypeList() {
    this.inputTypeList = [
      { "code": "Input", "name": "Input" },
      { "code": "Java Function", "name": "Java Function" },
      { "code": "List", "name": "List" }
    ]
  }
  getdataTypeList() {
    this.dataTypeList = [
      { "code": "varchar 2", "name": "varchar 2" },
      { "code": "numeric", "name": "numeric" },
      { "code": "date", "name": "date" },
      { "code": "float", "name": "float" }
    ]
  }

  getFieldTypeList() {
    this.FieldList = [
      { "code": 1, "name": "Table" },
      { "code": 2, "name": "Display" },
      { "code": 3, "name": "Button" }
    ]
  }

  getModelList(id){
    this.modelList = []
    this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_screenfieldmaster_list' + `${"?"+'screenfieldid='}` + id).subscribe(response => {     
      this.modelList = response.data;
      this.modelList.forEach(async element=>{
        for  (const [index, ele] of this.screenIdList.entries()) {
          if(ele['code'] ===  element.screenid){
            Object.assign(element,{"screenname":ele['name']})
          }
        }
        
        await this.getScreengroupIdlist(element.screenid);

        for  (const [index, ele] of this.screenGroupIdList.entries()) {
          if(ele['code'] ===  element.screengroupid){
            Object.assign(element,{"screengroupname":ele['name']})
          }
        }
      })

    }, (error) => {
      console.log("getRewsRoomListError=", JSON.stringify(error))
    });
  }


  getScreenList(name) {
    this.screenIdList = []
    this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_screenlist_to_id' + `${"?" + 'name='}` + name).subscribe(response => {
      
      this.screenIdList = response.data;
      
      var tempArr :any =[]
      if(response.data){
        let i=0;
        response.data.forEach(element => { 
        tempArr.push({"code":element[0],"name":element[1]});
        this.screenIdList=tempArr;
        i++;
        });
        
      }
    }, (error) => {
      console.log("getRewsRoomListError=", JSON.stringify(error))
    });
  }

  //groupid

  async getScreengroupIdlist(screenID)
  {
    return new Promise(resolve => {
    this.screenGroupIdList = []
   
    var tempArr :any =[]
    
    this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_screengroupid_from_screenid' + `${"?" + 'screenid='}` + screenID).subscribe(response => {      
      if(response.data){
        response.data.forEach(element => { 
        tempArr.push({"code":element[0],"name":element[1]})
        this.screenGroupIdList=tempArr; 
        // console.log(this.screenGroupIdList);
      });   
      }
      return resolve(response);
    }, (error) => {
      console.log("getRewsRoomListError=", JSON.stringify(error))
    });
  });

  }

  

  getBasetablecolumn(screengroupID){
    return new Promise(resolve => {
    this.basetablecolumnList=[]
    var tempArr :any =[]
    this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_basetablecolumn' + `${"?" + 'screengroupid='}` + screengroupID).subscribe(response => {   
      if(response.data){
        response.data.forEach(element => { 
          this.crudService.commonActionPerformGet(credentials.INVENTORY + 'get_column_list' + `${"?" + 'name='}` + element).subscribe(response => {
            response.data.forEach(element => {
              tempArr.push({"code":element,"name":element})
              this.basetablecolumnList=tempArr;
              // console.log(this.basetablecolumnList);
              
              });
          });
      });
      }
      return resolve(response);
    }, (error) => {
      console.log("getRewsRoomListError=", JSON.stringify(error))
    });

    })

  }


  async twoFunction(screenID,screengroupID){
    await this.getScreengroupIdlist(screenID);
    await this.getBasetablecolumn(screengroupID);
  }


  

  searchByFilter(){
    this.getModelList(this.filters)
  }

  clearModelOne() {
    
      this.model = {
        "screenid":null,
        "screengroupid":null,
        "field_name":"",
        "label":"",
        "fieldtype":null,
        "tablecolumn":"",
        "required":false,
        "databasefuncname":"",
        "jfunctionname":"",
        "rangelow":null,
        "rangehigh":null,
        "dateformat":"",
        "visible":false,
        "rowno":null,
        "colno":null,
        "inputtype":"",
        "datatype":"",
        "defaultvalue":""
      }
    
    
  }


  addModelOneArray() {
    // if (this.configService.isNullUndefined(this.model.screenid) === false) {
    //   this.notificationServices.showNotification('error', "Screen ID Required");
    //   document.getElementById("screenid").focus();
    //   return false;
    // }
    // if (this.configService.isNullUndefined(this.model.screengroupid) === false) {
    //   this.notificationServices.showNotification('error', "Screen Group ID Required");
    //   document.getElementById("screengroupid").focus();
    //   return false;
    // }
    
    // if (this.configService.isNullUndefined(this.model.label) === false) {
    //   this.notificationServices.showNotification('error', "Label Required");
    //   document.getElementById("label").focus();
    //   return false;
    // }
    // if (this.configService.isNullUndefined(this.model.field_name) === false) {
    //   this.notificationServices.showNotification('error', "Field name Required");
    //   document.getElementById("field_name").focus();
    //   return false;
    // }
    // if (this.configService.isNullUndefined(this.model.fieldtype) === false) {
    //   this.notificationServices.showNotification('error', "Field Type Required");
    //   document.getElementById("fieldtype").focus();
    //   return false;
    // }
    if (this.configService.isNullUndefined(this.model.tablecolumn) === false) {
      this.notificationServices.showNotification('error', "Base Table Column Required");
      document.getElementById("tablecolumn").focus();
      return false;
    }
    // if (this.configService.isNullUndefined(this.model.required) === false) {
    //   this.notificationServices.showNotification('error', "Required Required");
    //   document.getElementById("required").focus();
    //   return false;
    // }
    // if (this.configService.isNullUndefined(this.model.databasefuncname) === false) {
    //   this.notificationServices.showNotification('error', "Database Function Required");
    //   document.getElementById("databasefuncname").focus();
    //   return false;
    // }
    // // if (this.configService.isNullUndefined(this.model.jfunctionname) === false) {
    // //   this.notificationServices.showNotification('error', "Java Function Required");
    // //   document.getElementById("jfunctionname").focus();
    // //   return false;
    // // }
    // // if (this.configService.isNullUndefined(this.model.rangelow) === false) {
    // //   this.notificationServices.showNotification('error', "Range Low Required");
    // //   document.getElementById("rangelow").focus();
    // //   return false;
    // // }
    // // if (this.configService.isNullUndefined(this.model.rangehigh) === false) {
    // //   this.notificationServices.showNotification('error', "Range High Required");
    // //   document.getElementById("rangehigh").focus();
    // //   return false;
    // // }
    // // if (this.configService.isNullUndefined(this.model.dateformat) === false) {
    // //   this.notificationServices.showNotification('error', "Date Format Required");
    // //   document.getElementById("dateformat").focus();
    // //   return false;
    // // }
    // // if (this.configService.isNullUndefined(this.model.visible) === false) {
    // //   this.notificationServices.showNotification('error', "Visible Required");
    // //   document.getElementById("visible").focus();
    // //   return false;
    // // }
    // // if (this.configService.isNullUndefined(this.model.colno) === false) {
    // //   this.notificationServices.showNotification('error', "Column Number Required");
    // //   document.getElementById("colno").focus();
    // //   return false;
    // // }
    // // if (this.configService.isNullUndefined(this.model.rowno) === false) {
    // //   this.notificationServices.showNotification('error', "Row Number Required");
    // //   document.getElementById("rowno").focus();
    // //   return false;
    // // }
    // // if (this.configService.isNullUndefined(this.model.datatype) === false) {
    // //   this.notificationServices.showNotification('error', "Data Type Required");
    // //   document.getElementById("datatype").focus();
    // //   return false;
    // // }
    // if (this.configService.isNullUndefined(this.model.inputtype) === false) {
    //   this.notificationServices.showNotification('error', "Input Type Required");
    //   document.getElementById("inputtype").focus();
    //   return false;
    // }
    // // if (this.configService.isNullUndefined(this.model.defaultvalue) === false) {
    // //   this.notificationServices.showNotification('error', "Default Value Required");
    // //   document.getElementById("defaultvalue").focus();
    // //   return false;
    // // }
    


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
    var tempData: any = {};
    tempData = Object.assign({}, datas);
    this.model = tempData
  }

  async editRowData(datas, index) {
    console.log("data="+JSON.stringify(datas));
    datas['dateformat']=new Date(datas['dateformat']);

    await this.twoFunction(datas.screenid,datas.screengroupid);
    await this.getBasetablecolumn(datas.screengroupid);

    
    for await (const [index, element] of this.screenIdList.entries()) {
      if(element['code'] === await datas['screenid']){
        datas['screenid'] = await element
      }
    }

    for await (const [index, element] of this.booleanList.entries()) {
      if(element['code'] === await datas['visible']){
        datas['visible'] = await element
      }
      if(element['code'] === await datas['required']){
        datas['required'] = await element
      } 
    }

    for await (const [index, element] of this.FieldList.entries()) {
      if(element['code'] === await datas['fieldtype']){
        datas['fieldtype'] = await element
      }
    }

    for await (const [index, element] of this.dataTypeList.entries()) {
      if(element['code'] === await datas['datatype']){
        datas['datatype'] = await element
      }
    }

    for await (const [index, element] of this.inputTypeList.entries()) {
      if(element['code'] === await datas['inputtype']){
        datas['inputtype'] = await element
      }
    }

    for await (const [index, element] of this.screenGroupIdList.entries()) {
      if(element['code'] === await datas['screengroupid']){
        datas['screengroupid'] = await element
      } 
    }

    
    
    console.log(this.basetablecolumnList);
    
    for await (const [index, element] of this.basetablecolumnList.entries()) {
      if(element['code'] === await datas['tablecolumn']){
        datas['tablecolumn'] = await element
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
    console.log("postJson="+postJson);
    // postJson = Object.assign({}, this.model);
    postJson = [... this.modelOneArray];
    for await (const [index, element] of postJson.entries()) {
      await (this.configService.isNullUndefined(element.screenid) === true ? element.screenid = element.screenid['code'] : element.screenid = element.screenid)
      await (this.configService.isNullUndefined(element.screengroupid) === true ? element.screengroupid = element.screengroupid['code'] : element.screengroupid = element.screengroupid)
      await (this.configService.isNullUndefined(element.fieldtype) === true ? element.fieldtype = element.fieldtype['code'] : element.fieldtype = element.fieldtype)
      await (this.configService.isNullUndefined(element.tablecolumn) === true ? element.tablecolumn = element.tablecolumn['code'] : element.tablecolumn = element.tablecolumn)
      await (this.configService.isNullUndefined(element.inputtype) === true ? element.inputtype = element.inputtype['code'] : element.inputtype = element.inputtype)
      await (this.configService.isNullUndefined(element.datatype) === true ? element.datatype = element.datatype['code'] : element.datatype = element.datatype)
      await (this.configService.isNullUndefined(element.required) === true ? element.required = element.required['code'] : element.required = element.required)
      await (this.configService.isNullUndefined(element.visible) === true ? element.visible = element.visible['code'] : element.visible = element.visible)
      await this.saveElement(element)
    }
    this.onRefresh()
    this.notificationServices.showNotification('success', "Save Successfully");
    this.configService.disableLoader();

  }
  
  async saveElement(element) {
    return new Promise(resolve => {
      console.log(element);
      this.crudService.commonActionPerformPost(credentials.INVENTORY + 'post_screenfieldmaster', element).subscribe(async (response) => {
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
      this.crudService.commonActionPerformDelete(credentials.INVENTORY + 'delete_screenfieldmaster/'+ this.model.screenfieldid).subscribe(async (response) => {
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
