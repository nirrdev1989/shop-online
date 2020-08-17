import { TestBed } from '@angular/core/testing';

import { HttpEventsService } from './http-events.service';

describe('HttpEventsService', () => {
  let service: HttpEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
