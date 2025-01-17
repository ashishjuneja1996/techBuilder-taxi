import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteNameService {

  // Array to hold domain-to-name mapping
  private domainArray: { [domain: string]: string } = {
    'parisdisneytaxitransfer.com': 'Paris Disney Taxi',
    'door2fly.lu': 'Door2Fly',
    'ujeff.app': 'UJeff',
    'a2blogistics.co': 'A2B Service',
    'super-app-admin.venustaxi.in': 'Taxi Service',
    'chuki-admin.venustaxi.in': 'Taxi Service',
    'admin-panel.vybaenterprises.com': 'VYBA',
    'admin-panel.mride.co.uk':'MRide',
    'dashboard.sharpally.com':'Taxi Service',
    'admin-panel.taksiko.com':'Taksiko',
    'admin.venustaxi.in': 'Venus'
  };

  // Default domain name
  private defaultDomainName: string = 'Taxi Service';

  // Routes requiring dynamic titles
  private routes: { [routeKey: string]: string } = {
    dashboardTitle: 'Dashboard',
    franchiseeTitle: 'Franchisee',
    subscriptionTitle: 'Subscription',
    analyticsTitle: 'Analytics',
    rideTitle: 'Ride',
    viewMapTitle: 'View Map',
    pushNotificationTitle: 'Push Notification',
    globalSearchDataTitle: 'Global Search Data',
    uploadDocumentsTitle: 'Upload Documents',
    rideDetailsTitle: 'Ride Details',
    franchiseeDetailTitle: 'Franchisee Details',
    addRideTitle: 'Add Ride',
    profileTitle: 'Profile',
    settingsTitle: 'Settings',
    permissionsTitle: 'Permissions',
    campaignsTitle: 'Campaigns',
    userTitle: 'Customers',
    referralProgramTitle: 'Referral Program',
    utilitiesTitle: 'Utilities',
    loginTitle: 'Login',
    registerTitle: 'Register',
    //sub components from here
    captainTitle: 'Drivers',
    customerTitle: 'Customers',
    cityWideTitle: 'City Wide',
    promoCodeTitle: 'Promo Codes',
    couponsTitle: 'Coupons',
    customerReferralTitle: 'Customer Referrals',
    driverReferralTitle: 'Driver Referrals',
    ReferralTitle: 'Referrals',
    addManagerTitle: 'Add Managers',
    managerPermissionTitle: 'Set Manager Permissions',
    citySettingsTitle: 'Global Settings',
    vehicleInformationTitle: 'Vehicle Info',
    vehicleFareSettingsTitle: 'Fare Settings',
    documentSettingsTitle: 'Document Settings',
    tollListingTitle:'Toll Listing',
    tollGeoFencing:'Toll Geofencing',
    radiusTitle: 'Set Radius',
    bannerSettingsTitle: 'Banner Settings',
    driverTicketsTitle:'Driver Tickets',
    customerTicketTitle:'Customer Tickets',
    ticketTitle: 'Ticket Title',
    myProfileTitle: 'My Profile',
  };

  // Function to get the domain name based on the current URL with partial matching
  private getDomainName(): string {
    // Extract the domain from the current URL
    const domainMatch = /:\/\/([^\/]+)/.exec(window.location.href);
    // const domainMatch = /:\/\/([^/]+)/.exec('https://admin-panel.mride.co.uk/auth/login');
    const domain = domainMatch ? domainMatch[1] : '';
    // Find the matching domain in the domainArray based on a partial match
    const matchingDomain = Object.keys(this.domainArray).find(d => domain.includes(d));
    // Return the matching domain name or the default if not found
    return matchingDomain ? this.domainArray[matchingDomain] : this.defaultDomainName;
  }

  // Function to get route data for the current domain
  getRouteDataForDomain(): { [routeKey: string]: string } {
    const domainName = this.getDomainName();
    // Bind the domain name dynamically to each route's title
    const routeData: { [routeKey: string]: string } = {};
    Object.keys(this.routes).forEach(routeKey => {
      routeData[routeKey] = `${this.routes[routeKey]} - ${domainName}`;
    });

    return routeData;
  }
}
