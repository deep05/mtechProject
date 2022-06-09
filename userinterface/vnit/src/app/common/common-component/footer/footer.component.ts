import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ConfigService } from 'src/app/core/services/config.service';
import { EventDetaPassingService } from 'src/app/common/services/event-data-passing.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  constructor() { }
  ngOnInit() {
    // this.getCommonresBundleList();
  }
}
