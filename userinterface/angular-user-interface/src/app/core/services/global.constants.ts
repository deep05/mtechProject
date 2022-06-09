import { Injectable, OnInit } from "@angular/core";

@Injectable()
export class GLOBAL_CONSTANTS implements OnInit {
    FOOTER_FLAG: boolean = false;
    CUSTOM_FOOTER_FLAG: boolean = false;
    BREADCRUM: any;
    BREADCRUM_TITLE: any;
    TRANSITION_STATE: any;
    LOADER_FLAG: boolean = false;
    REFRESH_MENU_FLAG: boolean = false;
    SESSION_COUNT_DOWN: any;
    ACTION_ARRAY: Array<any[]> = [];
    ACCESS_BOTTOM_ARRAY: Array<any[]> = [];
    BACK_BUTTON_FLAG: boolean = false;
    ENABLE_CLEAR_BUTTON: boolean = false;
    ENABLE_EXIT_BUTTON: boolean = false;
    RESULT_PROCESS_ENABLE: boolean = false;
    BACK_BUTTON_CACHE_FLAG: boolean = false;
    COMMONBUTTON: any;
    HOMEMENU:any;
    HELPMENU:any;
    PREFERENCESLABEL:any;
    COMMONTABLELABEL:any;

    ngOnInit() {
        this.FOOTER_FLAG = false;
        this.CUSTOM_FOOTER_FLAG = false;
        this.BREADCRUM = null;
        this.BREADCRUM_TITLE = null;
        this.TRANSITION_STATE = null;
        this.LOADER_FLAG = false;
        this.REFRESH_MENU_FLAG = false;
        this.BACK_BUTTON_CACHE_FLAG = false;
        this.SESSION_COUNT_DOWN = null;
        this.ACTION_ARRAY = [];
        this.ENABLE_CLEAR_BUTTON = true;
        this.ENABLE_EXIT_BUTTON = true;
        this.COMMONBUTTON= null;
        this.HOMEMENU= null;
        this.HELPMENU= null;
        this.PREFERENCESLABEL= null;
        this.COMMONTABLELABEL= null;
    }
}