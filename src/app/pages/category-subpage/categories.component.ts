import {Component, effect, inject, output, Signal} from '@angular/core';
import {Category} from '../../models/category.model';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {CategoryService} from '../../services/category.service';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'categories',
  templateUrl: 'categories.component.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['categories.component.scss']
})

export class CategoriesComponent {
  categoryService = inject(CategoryService);
  categoryChange = output<number>();
  formGroup = new FormGroup({ hui: new FormControl(null)});
  categories: Signal<Category[]> = toSignal(this.categoryService.getCategories(), {initialValue: []});

  constructor() {
    this.formGroup.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      if(value.hui) {
        return this.categoryChange.emit(+value.hui);
      }
    });

  }
}
