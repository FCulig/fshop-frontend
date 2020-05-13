import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {

  @Input() imgUrls;

  activeImg;

  constructor() { }

  ngOnInit(): void {
    console.log(this.imgUrls);
    this.activeImg = this.imgUrls[0];
  }

  setActiveImage(url){
    this.activeImg = url;
  }

}
