import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-shipment-stats',
  templateUrl: './shipment-stats.page.html',
  styleUrls: ['./shipment-stats.page.scss'],
})
export class ShipmentStatsPage implements OnInit {
  @ViewChild('barChart') barChart!: ElementRef;
  @ViewChild('lineChart') lineChart!: ElementRef;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.createBarChart();
    this.createLineChart();
  }

  createBarChart() {
    const ctx = this.barChart.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['1', '2'],
        datasets: [{
          label: 'Envios',
          data: [65, 90],
          backgroundColor: '#4FC3F7',
          borderColor: '#4FC3F7',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

  createLineChart() {
    const ctx = this.lineChart.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['1', '2', '3', '4', '5'],
        datasets: [{
          label: 'Z',
          data: [12, 19, 3, 5, 2],
          borderColor: '#4FC3F7',
          tension: 0.1
        },
        {
          label: 'X',
          data: [7, 11, 5, 8, 3],
          borderColor: '#FF9800',
          tension: 0.1
        },
        {
          label: 'Y',
          data: [3, 7, 9, 4, 6],
          borderColor: '#4CAF50',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }
}