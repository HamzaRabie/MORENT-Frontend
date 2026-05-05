import { Component, EventEmitter, Output } from '@angular/core';
import { CarFilters } from '../../../../models/filters.model';

@Component({
  selector: 'app-filter-sidebar',
  imports: [],
  templateUrl: './filter-sidebar.html',
  styleUrl: './filter-sidebar.scss',
})
export class FilterSidebar {
  @Output() filtersChanged = new EventEmitter<CarFilters>();

  //to do => get from API
  categories = ['Sport Car', 'Luxury', 'Super Car'];
  capacities = [2, 4, 6, 8];

  selectedCategory = '';
  selectedSeats: number | null = null;
  maxPrice = 60;

  selectCategory(cat: string) {
    this.selectedCategory = this.selectedCategory === cat ? '' : cat;
    this.emit();
  }

  selectCapacity(cap: number) {
    this.selectedSeats = this.selectedSeats === cap ? null : cap;
    this.emit();
  }

  onPriceChange(event: any) {
    this.maxPrice = +event.target.value;
    this.emit();
  }

  emit() {
    this.filtersChanged.emit({
      category: this.selectedCategory,
      seatsNo: this.selectedSeats,
      price: this.maxPrice
    });
  }

}
