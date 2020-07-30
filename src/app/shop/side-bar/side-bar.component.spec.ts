import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartBarComponent } from './side-bar.component';

describe('CartBarComponent', () => {
    let component: CartBarComponent;
    let fixture: ComponentFixture<CartBarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CartBarComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CartBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
