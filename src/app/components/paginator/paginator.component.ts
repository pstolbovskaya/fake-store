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
  currentPageIdx = input(0);
  currentPage = computed(() => this.currentPageIdx() + 1);
  totalItems: InputSignal<number> = input.required();
  pageSize = input(10);

  totalPages = computed(() => {
    if(!this.totalItems() || !this.pageSize()) return 0
    return Math.ceil(this.totalItems() / this.pageSize() - 1);
  });

  pages:Signal<number[]> = computed(() => {
    console.log(this.totalPages());
    if(!this.totalPages()) return [];
    return Array.from({length: this.totalPages() }, (_, i) => i+1);
  })

  selectPage(currentPage: number) {
    if (currentPage >= 0 && currentPage < this.totalPages()) {
      this.pageChange.emit(currentPage);
    }
  }
  pagePrev() {
    this.selectPage(this.currentPageIdx() - 1);
  }

  pageNext() {
    this.selectPage(this.currentPageIdx() + 1);
  }
}
