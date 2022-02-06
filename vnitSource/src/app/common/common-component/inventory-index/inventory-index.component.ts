import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetLocalStorageService } from 'src/app/core/services/get-local-storage.service';

@Component({
  selector: 'app-inventory-index',
  templateUrl: './inventory-index.component.html',
  styleUrls: ['./inventory-index.component.css']
})
export class InventoryIndexComponent implements OnInit {
  user_name:any;

  constructor(private router: Router,
              private getLocalStorageService : GetLocalStorageService) { }

  ngOnInit(): void {
    // this.user_name = this.getLocalStorageService.getSession['username'];
  }

  redirectToSubAppModule(subAppPath) {
    console.log("path=", subAppPath)
    this.router.navigate([subAppPath])
  }

}
