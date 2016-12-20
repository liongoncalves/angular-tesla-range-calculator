/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { TeslaClimateComponent } from './tesla-climate.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
fdescribe('TeslaClimateComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TeslaClimateComponent
            ],
            imports: [ReactiveFormsModule],
        });
        TestBed.compileComponents();
    });

    it('should create the app', async(() => {
        let fixture = TestBed.createComponent(TeslaClimateComponent);
        let app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    describe('onFocus', () => {
        it('should work', () => {
            let fixture = TestBed.createComponent(TeslaClimateComponent);
            let app = fixture.debugElement.componentInstance;
            let onTouchSpy = jasmine.createSpy('onTouchSpy');
            fixture.detectChanges();
            app.registerOnTouched(onTouchSpy);
            app.onFocus(true);
            expect(onTouchSpy).toHaveBeenCalled();
            expect(app.focused).toBeTruthy();
        });

        fit('Should ', () => {
            let fixture = TestBed.createComponent(TeslaClimateComponent);

            let app = fixture.debugElement.componentInstance;
            let input = fixture.debugElement.query(By.css('input'));
            let label = fixture.debugElement.query(By.css('label'));
            
            let onTouchSpy = jasmine.createSpy('onTouchSpy');
            
            fixture.detectChanges();
            app.registerOnChange(onTouchSpy);
            input.nativeElement.value  = true
            fixture.detectChanges();
            //expect(onTouchSpy).toHaveBeenCalled();
            console.log(label.classes)
            console.log(app.focused);
            console.log(label.classes)
        });
    });

});
