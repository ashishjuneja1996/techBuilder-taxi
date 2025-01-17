// app.component.ts
import { Component, OnInit, AfterViewInit, inject, Renderer2, ChangeDetectorRef } from '@angular/core';
import { PreloaderService, SettingsService } from '@core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { TitleServiceService } from './core/authentication/title-service.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { switchMap } from 'rxjs';
import { AuthService } from './core/authentication/auth.service';
import { ApiService } from '@core/authentication/api-service';
import { EncryptDecryptService } from '@core/authentication/encrypt-decrypt.service';
@Component({
  selector: 'app-root',
  template: `<router-outlet />`,
  standalone: true,
  imports: [RouterOutlet, MatProgressSpinnerModule],
})
export class AppComponent implements OnInit, AfterViewInit {
  protected readonly EncryptDecryptService= inject(EncryptDecryptService);
  private readonly preloader = inject(PreloaderService);
  private readonly settings = inject(SettingsService);
  private readonly tittle = inject(TitleServiceService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef,
    private SERVER: ApiService) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.preloader.hide();
  }






}
