import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Booking } from '../../services/booking';
import { DetailsRental } from "./components/details-rental/details-rental";
import { RecentTransactions } from "./components/recent-transactions/recent-transactions";
import { TopCars } from "./components/top-cars/top-cars";

@Component({
  selector: 'app-dashboard',
  imports: [DetailsRental, RecentTransactions, TopCars],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard  implements OnInit  {
  activeBooking: any = null;
  recentBookings: any[] = [];
  topCategories: any[] = [];
  currentUser = { name: 'Alex Johnson', avatar: 'assets/avatar.jpg' };

  constructor(
  private bookingService: Booking,
  private cdr: ChangeDetectorRef
) {}
  
    ngOnInit(): void {
      this.getData();
  }

  getData() : void{
        this.bookingService.getTopCategories().subscribe(b => {this.topCategories = b;this.cdr.detectChanges()}); 
        this.bookingService.getRecentBookings().subscribe(b => {this.recentBookings = b;this.cdr.detectChanges();}); 
        this.bookingService.getActiveBooking().subscribe(b => {this.activeBooking = b;this.cdr.detectChanges();}); 
  }
  
}
