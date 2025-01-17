import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TitleServiceService {
  constructor(private titleService: Title, private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const route = this.router.routerState.root;
      this.updateTitle(route);
    });
  }

  private updateTitle(route: any) {
    if (route.firstChild) {
      this.updateTitle(route.firstChild);
    } else {
      const title = route.snapshot.data['title'];
      if (title) {
        this.titleService.setTitle(title);
      }
    }
  }
}
