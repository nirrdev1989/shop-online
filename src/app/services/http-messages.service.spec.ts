import { TestBed } from '@angular/core/testing';

import { HttpMessagesService } from './http-messages.service';

describe('HttpMessagesService', () => {
  let service: HttpMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
