import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-client-overview',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  ],
  templateUrl: './client-overview.component.html',
  styleUrl: './client-overview.component.scss'
})
export class ClientOverviewComponent {
  serviceAreas = [
    { lat: 37.7749, lng: -122.4194 }, // San Francisco
    { lat: 48.8566, lng: 2.3522 },   // Paris
    { lat: 51.5074, lng: -0.1278 },  // London
  ];

  ngOnInit() {
    this.initMap();
    this.initGraph();
  }

  // Initialize Google Map
  initMap() {
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      zoom: 2,
      center: { lat: 20, lng: 0 },
      styles: [
        { elementType: 'geometry', stylers: [{ color: '#f5f5f5' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f5f5' }] },
      ],
    });

    this.serviceAreas.forEach((area) => {
      new google.maps.Marker({
        position: area,
        map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#FF0000',
          fillOpacity: 0.8,
          strokeWeight: 0,
        },
      });
    });
  }

  // Initialize ApexCharts Graph
  initGraph() {
    const options = {
      series: [
        {
          name: 'Users',
          data: [100, 200, 300, 400],
        },
        {
          name: 'Captains',
          data: [50, 150, 250, 350],
        },
      ],
      chart: {
        type: 'bar',
        height: 300,
      },
      xaxis: {
        categories: ['Q1', 'Q2', 'Q3', 'Q4'],
      },
      colors: ['#4CAF50', '#FFC107'],
    };

    const chart = new ApexCharts(document.querySelector('#usersGraph'), options);
    chart.render();
  }
}
