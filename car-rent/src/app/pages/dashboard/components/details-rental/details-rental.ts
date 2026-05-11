import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import * as L from 'leaflet';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-details-rental',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './details-rental.html',
  styleUrl: './details-rental.scss',
})
export class DetailsRental {
  @Input() booking: any = null;
  private map: L.Map | null = null;
  mediaUrl = environment.mediaURLrl;

   ngOnChanges(changes: SimpleChanges) {
    if (changes['booking'] && this.booking) {
      setTimeout(() => this.initMap(), 100);
    }
  }

  private initMap() {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }

    this.map = L.map('rental-map', { zoomControl: false })
      .setView([this.booking.pickupLat, this.booking.pickupLng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    const iconDefault = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });

    // pickup marker
    L.marker([this.booking.pickupLat, this.booking.pickupLng], { icon: iconDefault })
      .addTo(this.map)
      .bindPopup(`<b>Pick-Up</b><br>${this.booking.pickupLocation}`)
      .openPopup();

    // dropoff marker
    L.marker([this.booking.dropoffLat, this.booking.dropoffLng], { icon: iconDefault })
      .addTo(this.map)
      .bindPopup(`<b>Drop-Off</b><br>${this.booking.dropoffLocation}`);

    // draw line between the two points
    L.polyline([
      [this.booking.pickupLat, this.booking.pickupLng],
      [this.booking.dropoffLat, this.booking.dropoffLng]
    ], { color: '#3563E9', weight: 3, dashArray: '6 6' }).addTo(this.map);
  }

}
