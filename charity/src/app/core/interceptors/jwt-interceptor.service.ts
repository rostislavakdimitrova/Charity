import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(public toastr: ToastrService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    
    if (currentUser && currentUser.token) {
      req = req.clone({
        setHeaders: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`
        }
      });

    }
    return next.handle(req).pipe(tap((res: HttpEvent<any>) => {

      if (res instanceof HttpResponse && res.body.token) {
        this.saveToken(res.body);
        this.router.navigate(['/']);
      }

      if (res instanceof HttpResponse && res.body.success && req.url.endsWith('signup')) {
        this.router.navigate(['/authentication/signin']);
      }

      if (res instanceof HttpResponse && res.body.success) {
        this.toastr.success(res.body.message);
      }
    }));
  };

  private saveToken(data: { user: { fullname: any; isAdmin: boolean; }; token: any }) {
    localStorage.setItem('currentUser', JSON.stringify({
      "fullname": data.user.fullname,
      "token": data.token,
      "isAdmin": data.user.isAdmin,
    }));
  }
}




