import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
  styles: [
  ]
})
export class GalleryComponent implements OnInit {

  selectedImageUrl = "http://newvisionholding.eu/wp-content/uploads/2020/11/our-products-300x203.jpg";

  @Input() images!: string[]

  constructor() { }

  ngOnInit(): void {
    if (this.hasImages){
    this.selectedImageUrl = this.images[0];
   }
  }


  changeSelectedImage(imageUrl:string) {
    this.selectedImageUrl = imageUrl;
  }

  get hasImages(){
    return this.images?.length > 0;
  }


}
