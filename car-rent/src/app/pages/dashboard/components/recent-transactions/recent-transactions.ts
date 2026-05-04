import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recent-transactions',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './recent-transactions.html',
  styleUrl: './recent-transactions.scss',
})
export class RecentTransactions {
  @Input() transactions: any[] = [];
}
