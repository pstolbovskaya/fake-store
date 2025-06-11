import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ProductsComponent} from './pages/products-page/products.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'fake-store';
}
