import { TestBed } from '@angular/core/testing';

import { RequestMessagesInterceptor } from './request-messages.interceptor';

describe('RequestMessagesInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RequestMessagesInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RequestMessagesInterceptor = TestBed.inject(RequestMessagesInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
