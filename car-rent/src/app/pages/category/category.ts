import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car-service';
import { Car } from '../../models/car.model';
import { CarCard } from "../../Common/components/car-card/car-card";
import { CarFilters } from '../../models/filters.model';
import { FilterSidebar } from '../../Common/components/filter-sidebar/filter-sidebar';

@Component({
  selector: 'app-category',
  standalone : true,
  imports: [FilterSidebar,CarCard],
  templateUrl: './category.html',
  styleUrl: './category.scss',
})
export class Category implements OnInit  {
  sidebarOpen = false;
  cars : Car[] =[];
  total = 0;
  page = 1;
  filters:CarFilters = {category :'', price:60 , seatsNo :null};
  constructor(private carService : CarService , private cdr:ChangeDetectorRef){}


  openSidebar() { this.sidebarOpen = true; }
  closeSidebar() { this.sidebarOpen = false; }

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars() {
    console.log('Caaaaars');
    this.carService.getAllCars(this.filters, this.page)
      .subscribe(res => {
        if (this.page === 1) this.cars = [...res.cars];
        else this.cars = [...this.cars, ...res.cars];
        this.total = res.totalCount;
        this.cdr.detectChanges();
        console.log(this.cars);
      });
  }
  onFiltersChanged(filters: any) {
    this.filters = filters;
    this.page = 1;
    this.loadCars();
  }

   showMore() {
    this.page++;
    this.loadCars();
  }
}
