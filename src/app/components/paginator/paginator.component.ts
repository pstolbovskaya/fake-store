import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  NgZone,
  output,
  Signal
} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  imports: [
  ],
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PaginatorComponent {

  xone = inject(NgZone);

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
