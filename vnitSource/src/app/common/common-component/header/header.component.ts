import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(public router: Router) {}
  ngOnInit() {
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
  }

  onSelectMenu(value) {
    let val = parseInt(value)
    if (val === 1) {
      console.log("enter in one")
      this.router.navigate(["/item-master"])
    }
    if (val === 2) {
      this.router.navigate(["/download-screen"])
    }
    if (val === 3) {
      this.router.navigate(["/bill-type-master"])
    }

    if (val === 4) {
      this.router.navigate(["/bill-entry"])
    }

    if (val === 5) {
      this.router.navigate(["/bill-entry-with-bill-type"])
    }
    // if (val === 6) {
    //   this.router.navigate(["/sample-customer"])
    // }
    if (val === 6) {
      this.router.navigate(["/screen"])
    }
    if (val === 7) {
      this.router.navigate(["/screenlist"])
    }
    if (val === 8) {
      this.router.navigate(["/screenjoincondition"])
    }
    if (val === 9) {
      this.router.navigate(["/screenmappingcondition"])
    }
    // if (val === 10) {
    //   this.router.navigate(["/screenmappingquery"])
    // }
    // if (val === 11) {
    //   this.router.navigate(["/eventmaster"])
    // }
  
  if (val === 12) {
    this.router.navigate(["/screenevent"])
  }
    
  if (val === 13) {
    this.router.navigate(["/screenfieldmaster"])
  }
  
  
  }
 

  onNavigte(url) {
    this.router.navigate(["/" + url])
    window.scrollTo(0, 0);
  }

}
