import { Component, Input, OnChanges, SimpleChanges, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';


Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'app-top-cars',
  imports: [],
  templateUrl: './top-cars.html',
  styleUrl: './top-cars.scss',
})
export class TopCars implements OnChanges {
  
  colors = ['#1a3c8f', '#3563E9', '#54A6FF', '#B9D9FF', '#e0ecff'];
  private viewReady = false;
  @Input() data: any[] = [];
  @ViewChild('donutCanvas') donutCanvas!: ElementRef;
  private chart: Chart | null = null;

  ngAfterViewInit() {
  this.viewReady = true;

  if (this.data?.length) {
    this.buildChart();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
   
    if (changes['data'] && this.data.length > 0) {
      setTimeout(() => this.buildChart(), 0);
    }
  }

  private buildChart() {
    if (this.chart) this.chart.destroy();

    this.chart = new Chart(this.donutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.data.map(d => d.category),
        datasets: [{
          data: this.data.map(d => d.count),
          backgroundColor: ['#1a3c8f', '#3563E9', '#54A6FF', '#B9D9FF', '#e0ecff'],
          borderWidth: 0
        }]
      },
      options: {
        cutout: '70%',
        plugins: { legend: { display: false } }
      }
    });
  }

  get total() {
    return this.data.reduce((sum, d) => sum + d.count, 0).toLocaleString();
  }
}
