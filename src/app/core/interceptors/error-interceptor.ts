import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export enum STATUS {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private readonly router = inject(Router);
  private readonly toast = inject(ToastrService);

  private readonly errorPages = [STATUS.FORBIDDEN, STATUS.NOT_FOUND, STATUS.INTERNAL_SERVER_ERROR];

  private getMessage = (error: HttpErrorResponse) => {
    // console.log('ashish----------------',error);
    if (error.error?.message) {
      return error.error.message;
    }

    if (error.error?.msg) {
      return error.error.msg;
    }

    if (error.error?.log) {
      return error.error.log;
    }

    return `${error.status} ${error.error.error}`;
  };

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    return next
      .handle(request)
      .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('ERROR--------------------------------------------', error);
    if (this.errorPages.includes(error.status)) {
      console.error('ERROR--------------------------------------------', error);
      this.router.navigateByUrl(`/${error.status}`, {
        skipLocationChange: true,
      });
    } else {
      console.error('ERROR--------------------------------------------', error);
      this.toast.error(this.getMessage(error));
      if (error.status === STATUS.UNAUTHORIZED) {
        this.router.navigateByUrl('/auth/login');
      }
    }

    return throwError(() => error);
  }
}
