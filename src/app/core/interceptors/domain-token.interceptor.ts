// import { HttpInterceptorFn } from '@angular/common/http';

// export const domainTokenInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };
import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export const domainTokenInterceptor: HttpInterceptorFn = (req, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  // Define the token
  const token = '12345677987665433';

  // Clone the request and add the Authorization header with the token
  const tokenizedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  // Pass the cloned request to the next handler
  return next(tokenizedReq);
};


