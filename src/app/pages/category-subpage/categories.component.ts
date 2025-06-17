import {ChangeDetectionStrategy, Component, effect, inject, output, Signal} from '@angular/core';
import {Category} from '../../models/category.model';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {CategoryService} from '../../services/category.service';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'categories',
  templateUrl: 'categories.component.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CategoriesComponent {
  categoryService = inject(CategoryService);
  categoryChange = output<number>();
  formGroup = new FormGroup({ hui: new FormControl(null)});
  route = inject(ActivatedRoute);
  router = inject(Router);
  categories: Signal<Category[]> = toSignal(this.categoryService.getCategories(), {initialValue: []});

  constructor() {
    this.route.queryParams.pipe(takeUntilDestroyed()).subscribe((queryParams) => {
      if (queryParams['category']) {
        this.formGroup.controls.hui.setValue(queryParams['category'], {emitEvent: false});
      }
    });

    this.formGroup.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      if(value.hui) {
        return this.categoryChange.emit(+value.hui);
      }
    });
  }

  clearCategories ()  {
    this.router.navigate([], {relativeTo: this.route, queryParams: {
      page: this.route.snapshot.paramMap.get('page'),
      }});
    this.formGroup.controls.hui.setValue(null, {emitEvent: false});
  }
}
