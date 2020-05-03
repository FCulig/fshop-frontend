import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  isFirstFalse = true;

  constructor(private loaderService: LoaderService, private ngxService: NgxUiLoaderService) {
    this.loaderService.isLoading.subscribe((v) => {
      if (v === false) {
        if (!this.isFirstFalse) {
          ngxService.stop();
        } else {
          this.isFirstFalse = false;
        }
      } else {
        ngxService.start();
      }
    });
  }

  ngOnInit() {
  }

}
