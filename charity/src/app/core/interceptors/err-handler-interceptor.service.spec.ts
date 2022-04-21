import { TestBed } from '@angular/core/testing';

import { ErrHandlerInterceptorService } from './err-handler-interceptor.service';

describe('ErrHandlerInterceptorService', () => {
  let service: ErrHandlerInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrHandlerInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
