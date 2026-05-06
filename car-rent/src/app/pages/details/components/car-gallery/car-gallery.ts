import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-car-gallery',
  imports: [],
  templateUrl: './car-gallery.html',
  styleUrl: './car-gallery.scss',
})
export class CarGallery implements OnChanges {
  @Input() mainImage: string = '';
  @Input() images: string[] = [];

  selectedImage = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['mainImage'] && this.mainImage) {
      this.selectedImage = this.mainImage;
    }
  }

  selectImage(img: string) {
    this.selectedImage = img;
  }
}