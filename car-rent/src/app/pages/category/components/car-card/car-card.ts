import { Component, Input, input, OnInit } from '@angular/core';
import { Car } from '../../../../models/car.model';
import { CurrencyPipe } from '@angular/common';
import { environment } from '../../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-car-card',
  imports: [CurrencyPipe],
  standalone :true,
  templateUrl: './car-card.html',
  styleUrl: './car-card.scss',
})
export class CarCard implements OnInit{
  @Input() car!: Car;
  mediaUrl = environment.mediaURLrl;
  isFavorite = false;

  constructor(private cookies:CookieService){}
  ngOnInit(): void {
      const saved = this.cookies.get('favorites');
      const favorites: string[] = saved ? JSON.parse(saved) : [];
      this.isFavorite = favorites.includes(this.car.id);
  }

  toggleFavorite() {
    const saved = this.cookies.get('favorites');
    let favorites: string[] = saved ? JSON.parse(saved) : [];

    if (this.isFavorite) {
      favorites = favorites.filter(id => id !== this.car.id);
    } else {
      favorites.push(this.car.id);
    }

    this.cookies.set('favorites', JSON.stringify(favorites), 30); // 30 days
    this.isFavorite = !this.isFavorite;
  }
}

