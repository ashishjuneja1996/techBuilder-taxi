import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { TranslateModule } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@core/authentication';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '@env/environment';
import { apiUrl } from '@core/authentication/apiUrl';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MtxButtonModule,
    TranslateModule,
    MatIconModule
  ],
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly toast = inject(ToastrService);
  protected readonly http = inject(HttpClient);
  private renderer = inject(Renderer2);
  private cdr = inject(ChangeDetectorRef);
  public readonly BASE_URL2: string;
  public readonly END_POINT: any;
  public faviconUrl:string='';

  constructor(
  ) {
    this.BASE_URL2 = environment.BASE_URL;
    this.END_POINT = apiUrl;
    const domainMatch = /:\/\/([^/]+)/.exec(window.location.href);
    // const domainMatch = /:\/\/([^/]+)/.exec('https://admin-panel.mride.co.uk/auth/login');
    const domain = domainMatch ? domainMatch[1] : '';

    // Mapping object for domains to favicon URLs
    const domainToFaviconMap: { [key: string]: string } = {
      'parisdisneytaxitransfer.com': 'images/elite_ride_logo.svg',
      'door2fly.lu': 'images/door2fly_logo.svg',
      'ujeff.app': 'images/ujeff-long.png',
      'a2blogistics.co': 'images/A2B-Logo.png',
      'super-app-admin.venustaxi.in': 'images/logo_new.png',
      'chuki-admin.venustaxi.in': 'images/logo_new.png',
      'admin-panel.vybaenterprises.com': 'images/vyba_logo.png',
      'admin-panel.mride.co.uk':'images/mride.png',
      'dashboard.sharpally.com':'images/logo-sharp.png',
      'admin-panel.taksiko.com':'images/MIATSC-Logo.png',
      'admin.venustaxi.in': 'images/logo.png',
      'admin-panel.betaximk.com': 'images/be-taxi-logo.png',
      'admin-mcarrentals.venustaxi.in': 'images/mcarrental.png',
       'admin-panel.fare1.co.uk':'images/fareone.png'
    };

    // Find the matching domain in the domainToFaviconMap or default to 'images/logo_new.png'
    const matchingDomain = Object.keys(domainToFaviconMap).find(d => domain.includes(d));
    this.faviconUrl = matchingDomain ? domainToFaviconMap[matchingDomain] : 'images/logo_new.png';
    // console.log(this.faviconUrl);
    // faviconUrl = matchingDomain ? domainToFaviconMap[matchingDomain] : 'images/playstore.png';

    // this.setFavIconAsPerDomain()
  }


  isSubmitting = false;
  showPassword: boolean = false;

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    rememberMe: [false],
  });
  // ng-matero
  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }
  get rememberMe() {
    return this.loginForm.get('rememberMe')!;
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;

  }
  login() {
    // if(this.email.value === 'demo-sales@gmail.com' && this.password.value==="Demo@123")
    //   {
    this.isSubmitting = true;

    // First login attempt

    this.auth.login2(this.email.value, this.password.value).subscribe({
      // this.auth.login2('harendra@rebuild.com', 'Harendradev@123').subscribe({
      next: (data: any) => {
        // console.log(data);
        if (data !== null) {
          // console.log(data)
          this.auth.login('ng-matero', 'ng-matero', true).subscribe({
            next: () => {
              // this.router.navigateByUrl('/');
            },
            error: (errorRes: HttpErrorResponse) => {
              this.handleLoginError(errorRes);
              this.isSubmitting = false;
            },
            complete: () => {
              // console.log(this.email.value + this.password.value)

              // Second login attempt after the first one completes
            }
          });
          this.router.navigateByUrl('/');
        }
      },
      error: (errorRes: HttpErrorResponse) => {
        this.handleLoginError(errorRes);
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });



    // }else
    // {
    //   this.toast.error("You are not authorized");
    // }
  }
  // else
  // {
  //   this.toast.error("You are not authorized");
  // }
  // }

  private handleLoginError(errorRes: HttpErrorResponse) {
    if (errorRes.status === 422) {
      const form = this.loginForm;
      const errors = errorRes.error.errors;
      Object.keys(errors).forEach(key => {
        form.get(key === 'email' ? 'username' : key)?.setErrors({
          remote: errors[key][0],
        });
      });
    }
  }
}
