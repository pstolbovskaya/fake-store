import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ProductsComponent} from './pages/products-page/products.component';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'fake-store';
}
