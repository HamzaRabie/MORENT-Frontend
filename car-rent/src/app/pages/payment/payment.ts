import { CurrencyPipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarDetails } from '../../models/CarDetails';
import { environment } from '../../../environments/environment.development';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../../services/car-service';
import { PaymentService } from '../../services/payment-service';
import { CreatePaymentDto } from '../../models/createPayment';
import { LocationService } from '../../services/location-service';
import { Location } from '../../models/Location';

@Component({
  selector: 'app-payment',
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './payment.html',
  styleUrl: './payment.scss',
})  
export class Payment implements OnInit {
  showPickup = true;
  showDropoff = false;
  car: CarDetails | null = null;
  mediaUrl = environment.mediaURLrl;
  isLoading = false;
  isUnavailable = false;
  selectedMethod = 'Credit Card';
  form: FormGroup;
  locations: Location[] = [];
  selectedPickupLocation: Location | null = null;
  selectedDropoffLocation: Location | null = null;
  errorMessage = '';
  constructor(
    private route: ActivatedRoute,private router: Router, private fb: FormBuilder, private carService: CarService,
    private locationService: LocationService, private paymentService: PaymentService , private cdr: ChangeDetectorRef,){

    this.form = this.fb.group({
      
      billing: this.fb.group({
        name:    ['', Validators.required],
        phone:   ['', Validators.required],
        address: ['', Validators.required],
        city:    ['', Validators.required],
      }),

      rental: this.fb.group({
        pickupLocation:  ['', Validators.required],
        pickupDate:      ['', Validators.required],
        pickupTime:      ['', Validators.required],
        dropoffLocation: ['', ],
        dropoffDate:     ['', ],
        dropoffTime:     ['', ],
      }),

       card: this.fb.group({
        number: [''],
        expiry: [''],
        holder: [''],
        cvc:    [''],
      }),

      confirmation: this.fb.group({
        marketing: [false],
        terms:     [false, Validators.requiredTrue],
      })
    });
  }

  togglePickup() {
  this.showPickup = !this.showPickup;
  }

  toggleDropoff() {
  this.showDropoff = !this.showDropoff;
  const rental = this.form.get('rental');

  if (this.showDropoff) {
    rental?.get('dropoffLocation')?.setValidators(Validators.required);
    rental?.get('dropoffDate')?.setValidators(Validators.required);
    rental?.get('dropoffTime')?.setValidators(Validators.required);
  } else {
    rental?.get('dropoffLocation')?.clearValidators();
    rental?.get('dropoffDate')?.clearValidators();
    rental?.get('dropoffTime')?.clearValidators();
    rental?.patchValue({ dropoffLocation: '', dropoffDate: '', dropoffTime: '' });
  }

  rental?.get('dropoffLocation')?.updateValueAndValidity();
  rental?.get('dropoffDate')?.updateValueAndValidity();
  rental?.get('dropoffTime')?.updateValueAndValidity();
  }

  ngOnInit() {
    const carId = this.route.snapshot.params['carId'];
    this.carService.getCarById(carId).subscribe(car =>{ this.car = car;this.cdr.detectChanges();});
    this.locationService.getAll().subscribe(l => this.locations = l);
  }

  onPickupLocationChange(event: any) {
  const id = event.target.value;
  this.selectedPickupLocation = this.locations.find(l => l.id === id) ?? null;
  }

  onDropoffLocationChange(event: any) {
  const id = event.target.value;
  this.selectedDropoffLocation = this.locations.find(l => l.id === id) ?? null;
  } 

  get billing() { return this.form.get('billing') as FormGroup; }
  get rental()  { return this.form.get('rental')  as FormGroup; }
  get card()    { return this.form.get('card')     as FormGroup; }
  get confirmation() { return this.form.get('confirmation') as FormGroup; }

get pricePerHour(): number {
  return (this.car?.pricePerDay ?? 0) / 24;
}

get totalHours(): number {
  const pickup      = this.form.get('rental.pickupDate')?.value;
  const dropoff     = this.form.get('rental.dropoffDate')?.value;
  const pickupTime  = this.form.get('rental.pickupTime')?.value  || '00:00';
  const dropoffTime = this.form.get('rental.dropoffTime')?.value || '00:00';

  if (!pickup || !dropoff) return 0;

  const start = new Date(`${pickup}T${pickupTime}`);
  const end   = new Date(`${dropoff}T${dropoffTime}`);
  const diff  = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  return Math.max(0, Math.round(diff * 10) / 10);
}

get subtotal(): number {
  return Math.round(this.pricePerHour * this.totalHours * 100) / 100;
}

  get stars() {
    return Array(5).fill(0).map((_, i) => i < Math.round(this.car?.rating ?? 0));
  }

  selectMethod(method: string) {
    this.selectedMethod = method;

    const card = this.form.get('card');
    if (method === 'Credit Card') {
      card?.get('number')?.setValidators(Validators.required);
      card?.get('expiry')?.setValidators(Validators.required);
      card?.get('holder')?.setValidators(Validators.required);
      card?.get('cvc')?.setValidators([Validators.required, Validators.minLength(3)]);
    } else {
      card?.get('number')?.clearValidators();
      card?.get('expiry')?.clearValidators();
      card?.get('holder')?.clearValidators();
      card?.get('cvc')?.clearValidators();
    }
    card?.updateValueAndValidity();
  }

  isInvalid(group: string, field: string): boolean {
    const control = this.form.get(`${group}.${field}`);
    return !!(control?.invalid && control?.touched);
  }

  onRentNow() {
    this.form.markAllAsTouched();
    if (this.form.invalid || !this.car) return;

    this.isLoading = true;
    this.isUnavailable = false;

    const r = this.rental.value;
    const b = this.billing.value;

    const dto: CreatePaymentDto = {
    carId: this.car.id,
    pickupLocation: this.selectedPickupLocation?.city ?? '',
    pickupLat: this.selectedPickupLocation?.lat ?? 0,
    pickupLng: this.selectedPickupLocation?.lng ?? 0,
    pickupDate: new Date(`${r.pickupDate}T${r.pickupTime}`).toISOString(),
    dropoffLocation: this.selectedDropoffLocation?.city ?? '',
    dropoffLat: this.selectedDropoffLocation?.lat ?? 0,
    dropoffLng: this.selectedDropoffLocation?.lng ?? 0,
    dropoffDate: new Date(`${r.dropoffDate}T${r.dropoffTime}`).toISOString(),
    paymentMethod: this.selectedMethod,
    name: b.name,
    phone: b.phone,
    address: b.address,
    city: b.city
  };

    this.paymentService.createPayment(dto).subscribe({
    next: () => {
      this.isLoading = false;
      this.router.navigate(['/dashboard']);
    },
    error: (err) => {
    this.isLoading = false;

  console.log(err);

  if (err.status === 409) {
    this.isUnavailable = true;
    this.errorMessage =
      err.error ?? 'Car is not available for selected dates.';
  }
  else if (err.status === 404) {
    this.errorMessage =
      err.error ?? 'Car not found. Please go back and try again.';
  }
  else if (err.status === 400) {
    this.errorMessage =
      err.error ?? 'Invalid request. Please check your details.';
  }
  else {
    this.errorMessage =
      err.error ?? 'Something went wrong. Please try again.';
  }
   this.cdr.detectChanges();
}
  });
  }

}
