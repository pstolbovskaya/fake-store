import {Component, computed, input, InputSignal, output, Signal} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  imports: [
    NgIf,
    NgForOf
  ],
  styleUrls: ['./paginator.component.scss']
})

export class PaginatorComponent {
  pageChange = output<number>()
  currentPage = input(1);
  totalItems: InputSignal<number> = input.required();
  pageSize = input(10);

  totalPages = computed(() => {
    return Math.ceil(this.totalItems() / this.pageSize());
  });

  pages:Signal<number[]> = computed(() => {
    return Array.from({length: this.totalPages() });
  })

  selectPage(currentPage: number) {
    if (currentPage >= 1 && currentPage <= this.totalPages() && currentPage <= this.currentPage()) {
      this.pageChange.emit(currentPage);
    }
  }
  pagePrev() {
    this.selectPage(this.currentPage() - 1);
  }

  pageNext() {
    this.selectPage(this.currentPage() + 1);
  }
}
