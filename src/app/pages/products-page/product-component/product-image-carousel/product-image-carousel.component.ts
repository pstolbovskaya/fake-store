import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: "product-image-carousel",
  templateUrl: "./product-image-carousel.component.html",
  styleUrls: ["./product-image-carousel.component.scss"],
  imports: [
    NgIf,
    NgForOf
  ]
})

export class ProductImageCarouselComponent {
  @Input() images: string[] = [];
  index: number = 0;

  nextImage() : void {
    const isLast: boolean = this.images.length - 1 <= this.index;
    this.index = isLast ? this.index : this.index + 1;
  }

  prevImage() : void {
    const isFirst: boolean = this.index <= 0;
    this.index = isFirst ? this.index : this.index - 1;
  }

  goToSlide(slideIndex: number): void {
    this.index = slideIndex;
  }

}
