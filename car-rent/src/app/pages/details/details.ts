import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FilterSidebar } from '../../Common/components/filter-sidebar/filter-sidebar';
import { CarCard } from '../../Common/components/car-card/car-card';
import { CarGallery } from './components/car-gallery/car-gallery';
import { CarSpecs } from './components/car-specs/car-specs';
import { ReviewList } from './components/review-list/review-list';
import { CurrencyPipe } from '@angular/common';
import { CarDetails } from '../../models/CarDetails';
import { Car } from '../../models/car.model';
import { CarFilters } from '../../models/filters.model';
import { environment } from '../../../environments/environment.development';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../../services/car-service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-details',
  imports: [FilterSidebar, CarCard, CarGallery, CarSpecs, ReviewList, CurrencyPipe],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details implements OnInit {
  selectedCar: CarDetails | null = null;
  recentCars: Car[] = [];
  recommendedCars: Car[] = [];
  filters: CarFilters = { category: '', seatsNo: null, price: 100 };
  mediaUrl = environment.mediaURLrl;
  isFavorite = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService,
    private cdr: ChangeDetectorRef,
    private cookies:CookieService
  ) {}


  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loadCar(id);
    });
  }


   loadCar(id: string) {
    this.carService.getCarById(id).subscribe(car => {
      this.selectedCar = car;
      this.loadRecentCars(id);
      this.loadRecommendedCars(id);
      this.cdr.detectChanges();
      const saved = this.cookies.get('favorites');
      const favorites: string[] = saved ? JSON.parse(saved) : [];
      this.isFavorite = favorites.includes(this.selectedCar!.id);
    });
  }

  loadRecentCars(excludeId: string) {
  this.carService.getAllCars(this.filters, 1)
    .subscribe(res => {
      this.recentCars = res.cars
        .filter((c: Car) => c.id !== excludeId)
        .slice(0, 3);
        this.cdr.detectChanges();
    });
}

  loadRecommendedCars(excludeId: string) {
    this.carService.getAllCars({ category: '', seatsNo: null, price: 200 }, 1)
      .subscribe(res => {
        this.recommendedCars = res.cars
          .filter((c: Car) => c.id !== excludeId)
          .slice(0, 3);
          this.cdr.detectChanges();
      });
  }

  onFiltersChanged(filters: CarFilters) {
    this.filters = filters;
    if (this.selectedCar) {
      this.loadRecentCars(this.selectedCar.id);
    }
  }

  onCarClicked(carId: string) {
    this.router.navigate(['/cars', carId]);
  }

  toggleFavorite() {
    const saved = this.cookies.get('favorites');
    let favorites: string[] = saved ? JSON.parse(saved) : [];

    if (this.isFavorite) {
      favorites = favorites.filter(id => id !== this.selectedCar!.id);
    } else {
      favorites.push(this.selectedCar!.id);
    }

    this.cookies.set('favorites', JSON.stringify(favorites), 30); // 30 days
    this.isFavorite = !this.isFavorite;
  }

  rentNow() {
    if (this.selectedCar) {
      this.router.navigate(['/payment', this.selectedCar.id]);
    }
  }


  get galleryImages(): string[] {
  return this.selectedCar?.images?.map(img => this.mediaUrl + img) ?? [];
  }

  get stars() {
    return Array(5).fill(0).map((_, i) => i < Math.round(this.selectedCar?.rating ?? 0));
  }
}
