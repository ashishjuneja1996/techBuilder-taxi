import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncryptDecryptService } from '@core/authentication/encrypt-decrypt.service';
@Component({
  selector: 'app-branding',
  template: `
    <a class="branding">
    <img src="images/logo.png" class="branding-logo-long" alt="logo" />
    </a>
  `,

  //   <img *ngIf="operatorId !== 149155 && operatorId !== 149163" src="images/logo.png" class="branding-logo" alt="logo" />
  styles: `
    .branding {
      display: flex;
      align-items: center;
      margin: 0 0.5rem;
      text-decoration: none;
      white-space: nowrap;
      color: inherit;
      border-radius: 50rem;
    }

    .branding-logo {
      // width: 2rem;
      // height: 2rem;
      // border-radius: 50rem;
      width: 100%;
    height: auto;
    max-width: 65px;
    border-radius: 0rem;
    }
    .branding-logo-long {
      // width: 2rem;
      // height: 2rem;
      // border-radius: 50rem;
      width: 100%;
    height: auto;
    max-width: 200px;
    border-radius: 0rem;
    }

    .branding-name {
      margin: 0 0.5rem;
      font-size: 1rem;
      font-weight: 500;
    }

    .ujeff-logo-long {
      width: 175px;
      height: 63px;
      max-width: 200px;
  }
  `,
  standalone: true,
  imports: [CommonModule]
})
export class BrandingComponent {
  operatorId: number | undefined;
  protected readonly EncryptDecryptService= inject(EncryptDecryptService);
  constructor() {
    const userJson = this.EncryptDecryptService.decryptDataLocalWithStorage('currentUser');

    if (userJson) {
      this.operatorId = userJson.operator_id;
    }
  }
  @Input() showName = true;

}
