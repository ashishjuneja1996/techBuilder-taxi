import { Component } from '@angular/core';
export interface productElements {
  id: number;
  name: string;
  imageUrl: string;
}


@Component({
  selector: 'app-operators',
  standalone: true,
  imports: [],
  templateUrl: './operators.component.html',
  styleUrl: './operators.component.scss'
})

export class OperatorsComponent {
  productsArray: productElements[] = [
    {
      id: 1,
      imageUrl: 'images/A2B-Logo.png',
      name: 'A2B'
    },
    {
      id: 2,
      imageUrl: 'images/logo_new.png',
      name: 'Supper App'
    },
    {
      id: 3,
      imageUrl: 'images/vyba_logo.png',
      name: 'Vyba'
    },
    {
      id: 4,
      imageUrl: 'images/ujeff-long.png',
      name: 'Ujeff'
    },
    {
      id: 5,
      imageUrl: 'images/mride.png',
      name: 'MRide'
    },
    {
      id: 6,
      imageUrl: 'images/logo-sharp.png',
      name: 'Sharpally'
    },
    {
      id: 7,
      imageUrl: 'images/MIATSC-Logo.png',
      name: 'TaxiKo'
    },
    {
      id: 8,
      imageUrl: 'images/be-taxi-logo.png',
      name: 'Be Taxi'
    },
    {
      id: 9,
      imageUrl: 'images/mcarrental.png',
      name: 'M Car Rentel'
    },
    {
      id: 10,
      imageUrl: 'images/fareone.png',
      name: 'Fare 1'
    },
    {
      id: 11,
      imageUrl: 'images/elite_ride_logo.svg',
      name: 'Elite Ride'
    },
    {
      id: 12,
      imageUrl: 'images/door2fly_logo.svg',
      name: 'Door2fly'
    },
  ];
  goToLive(value: number): void {
    let url: string;

    switch (value) {
      case 1:
        url = 'https://admin-panel.a2blogistics.co';
        break;
      case 2:
        url = 'https://chuki-admin.venustaxi.in/auth/login';
        break;
      case 3:
        url = 'https://admin-panel.vybaenterprises.com/auth/login';
        break;
      case 4:
        url = 'https://admin.ujeff.app/';
        break;
      case 5:
        url = 'https://admin-panel.mride.co.uk/auth/login';
        break;
      case 6:
        url = 'https://dashboard.sharpally.com/auth/login';
        break;
      case 7:
        url = 'https://admin-panel.taksiko.com/';
        break;
      case 8:
        url = 'https://admin-panel.BeTaxiMK.com/auth/login';
        break;
      case 9:
        url = 'https://admin-mcarrentals.venustaxi.in/';
        break;
      case 10:
        url = 'https://admin-panel.fare1.co.uk/';
        break;
      case 11:
        url = 'https://dashboard.parisdisneytaxitransfer.com/auth/login';
        break;
      case 12:
        url = 'https://dashboard.door2fly.lu/dashboard#/app/dashboard/';
        break;
      default:
        console.error('Invalid value provided');
        return; // Exit the function if the value doesn't match any case
    }

    window.open(url, '_blank');
  }
}
