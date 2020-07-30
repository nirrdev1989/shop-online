import { TestBed } from '@angular/core/testing';

import { SidrBarService } from './side-bar.service';

describe('SidrBarService', () => {
    let service: SidrBarService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SidrBarService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
