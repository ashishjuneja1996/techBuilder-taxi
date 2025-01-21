import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
} from 'ng-apexcharts';
import { CommonModule } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { NgApexchartsModule, ChartComponent } from 'ng-apexcharts';

/**
 * Interface for Chart Options 
 */
interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  dataLabels: ApexDataLabels;
}

@Component({
  selector: 'app-client-overview',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    NgApexchartsModule,
  ],
  templateUrl: './client-overview.component.html',
  styleUrls: ['./client-overview.component.scss'],
})
export class ClientOverviewComponent {
  @ViewChild('chart') chart!: ChartComponent;
  private route = inject(ActivatedRoute);

  /**
   * Chart Configuration 
   */
  public chartOptions: ChartOptions = {
    series: [
      { name: 'Users', data: [100, 200, 300, 400] },
      { name: 'Captains', data: [50, 150, 250, 350] },
    ],
    chart: { type: 'bar', height: 300 },
    xaxis: { categories: ['Q1', 'Q2', 'Q3', 'Q4'] },
    dataLabels: { enabled: true },
    title: { text: 'User vs Captains' },
  };

  /**
   *  List of Service Areas
   */
  public serviceAreas: { lat: number; lng: number }[] = [
    { lat: 37.7749, lng: -122.4194 },
    { lat: 48.8566, lng: 2.3522 }, 
    { lat: 51.5074, lng: -0.1278 },
  ];

  public clientName!: string; // Client name extracted from the route

  ngOnInit(): void {
    this.clientName = this.route.snapshot.paramMap.get('clientname') || '';
    console.log(`Client Name: ${this.clientName}`);
    this.initMap();
  }

  /**
   * Initialize Google Map
   */
  private initMap(): void {
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
          fillColor: '#ffaa00',
          fillOpacity: 0.8,
          strokeWeight: 0,
        },
      });
    });
  }
}